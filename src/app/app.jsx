(function () {
  let React = require('react/addons');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let ClientList = require('./components/client-list');
  let SessionList = require('./components/session-list');
  let Header = require('./components/header');
  let Sidebar = require('./components/sidebar');

  let mui = require('material-ui');
  let ThemeManager = new mui.Styles.ThemeManager();
  
  // Routing
  let Router = require('react-router');
  let { Route, DefaultRoute, RouteHandler, Link } = Router;

  //Needed for React Developer Tools
  window.React = React;

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

    render () {
      return (
        <div className="container">
          <div className="row">
            <Header />
            <br />
            <div className="hidden-xs hidden-sm col-md-4">
              <Sidebar />
            </div>
            <div className="col-sm-12 col-md-8">
              <RouteHandler/>
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
    </Route>
  );

  Router.run(routes, Router.HashLocation, (Handler) => {
    React.render(<Handler/>, document.body);
  });
})();
