(function () {
  let React = require('react/addons');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let ClientList = require('./components/client-list');
  let SessionList = require('./components/session-list');
  let Header = require('./components/header');
  let Sidebar = require('./components/sidebar');
  let ClientProfile = require('./components/client-profile');
  let mockData = require('./mock-data');
  let mui = require('material-ui');
  let {
    AppBar,
  } = mui;

  let ThemeManager = new mui.Styles.ThemeManager();
  
  // Routing
  let Router = require('react-router');
  let { Route, State, DefaultRoute, RouteHandler, Link } = Router;

  //Needed for React Developer Tools
  window.React = React;

  // TODO: replace mockdata with api
  window.ft = {
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
    childContextTypes: {
      muiTheme: React.PropTypes.object
    },

    getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    },

    componentWillMount () {
      ThemeManager.setTheme(ThemeManager.types.DARK);
    },

    mixins: [State],

    render () {

      let title =
        this.context.router.isActive('clients') ? 'Main' :
        this.context.router.isActive('clientSessions') ? '' :
        this.context.router.isActive('clientProfile') ? 'Client Name' : '';

      return (
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="hidden-xs hidden-sm col-md-4">
                <Sidebar />
              </div>
              <div className="col-sm-12 col-md-8" style={{padding: 0}} >
                <AppBar title={title}
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
