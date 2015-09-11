(function () {
  let React = require('react/addons');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let ClientList = require('./components/client-list');
  let SessionList = require('./components/session-list');
  let Sidebar = require('./components/sidebar');
  let ClientProfile = require('./components/client-profile');
  let mockData = require('./mock-data');
  let mui = require('material-ui');
  let {
    AppBar,
    FontIcon
  } = mui;

  let ThemeManager = new mui.Styles.ThemeManager();
  let Colors = mui.Styles.Colors;

  // Routing
  let Router = require('react-router');
  let { Route, State, DefaultRoute, RouteHandler, Link } = Router;

  let store = require('./store');

  //Needed for React Developer Tools
  window.React = React;

  // TODO: replace mockdata with api
  window.ft = {
    defaultTitle: 'FitnessTrainer',
    mockData: mockData,
    conf: {
      time: {
        formats: {
          dow: 'ddd, M/D, h:mm a'
        }
      }
    }
  };

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  let App = React.createClass({
    mixins: [State],

    getInitialState() {
      return {
        title: window.ft.defaultTitle
      };
    },

    childContextTypes: {
      muiTheme: React.PropTypes.object
    },

    getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    },

    componentWillMount () {
      this._setTitle();
      ThemeManager.setPalette({
        accent1Color: Colors.blueA400,
      });
      ThemeManager.setTheme(ThemeManager.types.DARK);
    },

    componentWillReceiveProps() {
      this._setTitle();
    },

    _setTitle() {
      let router = this.context.router,
        clientId = router.getCurrentParams().id,
        isClientPath = /client/.test(router.getCurrentPath()),
        title = window.ft.defaultTitle;

      if (clientId && isClientPath) {
        store.client.first({id: +clientId}, (err, client) => {
          title = client.name;
          this.setState({title: title});
        });
      } else {
        this.setState({title: title});
      }
    },

    render() {

      let backLink = <FontIcon onTouchTap={this.context.router.goBack}
        className="material-icons"
        style={{fontSize: 30}}>navigate_before</FontIcon>;

      return (
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="hidden-xs hidden-sm col-md-4">
                <Sidebar />
              </div>
              <div className="col-sm-12 col-md-8" style={{padding: 0}} >
                <AppBar title={this.state.title}
                    style={{backgroundColor: '#151515', textAlign: 'center'}}
                    showMenuIconButton={false} />
                <RouteHandler/>
              </div>
            </div>
          </div>
        </div>
      )
    }
  });

  // declare our routes and their hierarchy
  let routes = (
    <Route path="/" handler={App}>
      <DefaultRoute handler={ClientList}/>
      <Route name="clients" path="clients" handler={ClientList}/>
      <Route name="clientSessions" path="clients/:id/sessions" handler={SessionList}/>
      <Route name="clientProfile" path="clients/:id" handler={ClientProfile}/>
    </Route>
  );

  Router.run(routes, Router.HashLocation, (Handler) => {
    React.render(<Handler/>, document.body);
  });
})();
