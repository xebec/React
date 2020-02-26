import * as React from 'react';
import { Route, Switch } from 'react-router-dom'
import { NotFoundControl } from './controls/NotFoundControl';
import ContentIndex from './contentpages';
import HomePage from './pages/HomePage';
import ContactusPage from './pages/ContactusPage';
import { FooterControl } from './components/FooterControl';
import { HeaderControl } from './components/HeaderControl';
import CreateAccountPage from './pages/CreateAccountPage';
import DashboardPage from './pages/DashboardPage';
import { AcceptanceCookieControl } from './components/AcceptanceCookieControl';
import { GAOptions } from './models/GAOptions';
import { GAController } from './controllers/GAController';
import * as ReactGA from 'react-ga';




interface LayoutProps {
}

interface LayoutState {
    gaOptions: GAOptions
}

class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props: LayoutProps) {
        super(props);

        this.state = {
            gaOptions: null,
        }
    }

    componentDidMount() {

        let gaController = new GAController();
        gaController.getId(null, gaOptions => {
            this.setState({
                gaOptions
            }, () => { this.invokeGA() })
        });
    }

    invokeGA() {
        if (this.state.gaOptions) {
            ReactGA.initialize(this.state.gaOptions.id);
            ReactGA.pageview(window.location.pathname);
            console.log(this.state.gaOptions.id);
            console.log(window.location.pathname);
        }
    }
    


    render() {

        if (!this.state.gaOptions) {
            return <>
                    <div>Loading...</div>
                </>;
        }
        return <div className="holder">
            <div className="wrapper">
                <AcceptanceCookieControl />

                <HeaderControl logoText="Find export" logoTextSecondary="markets" betaVisible hotjarSurveyHref="https://surveys.hotjar.com/s?siteId=1265824&surveyId=151844" />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/contactus" component={ContactusPage} />
                    <Route exact path="/createaccount" component={CreateAccountPage} />
                    <Route exact path="/dashboard" component={DashboardPage} />
                    <Route path="/activity" component={ContentIndex} />
                    <Route component={() => <NotFoundControl />} />
                </Switch>
                <FooterControl/>
            </div>
           
        </div>
    }
}

export default Layout;
