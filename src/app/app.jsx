(function () {
  let React = require('react/addons');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let ClientList = require('./components/client-list');
  let SessionList = require('./components/session-list');
  let Header = require('./components/header');
  let Sidebar = require('./components/sidebar');
  let ClientProfile = require('./components/client-profile');

  let mui = require('material-ui');
  let ThemeManager = new mui.Styles.ThemeManager();
  
  // Routing
  let Router = require('react-router');
  let { Route, DefaultRoute, RouteHandler, Link } = Router;

  //Needed for React Developer Tools
  window.React = React;

  // TODO: replace with api
  window.CLIENTS = [
    {
      id: 1,
      name: 'Andrew Marcus',
      email: 'am@test.com',
      phone: '111-111-1111',
      avatar: 'http://lorempixel.com/100/100/people/1'
    },
    {
      id: 2,
      name: 'Jesse Silkoff',
      email: 'js@test.com',
      phone: '222-222-2222',
      avatar: 'http://lorempixel.com/100/100/people/2'
    },
    {
      id: 3,
      name: 'John Hayes',
      email: 'jh@test.com',
      phone: '333-333-3333',
      avatar: 'http://lorempixel.com/100/100/people/3'
    }
  ];

  window.SESSIONS = [
    {
      id: 10,
      clientId: 1,
      clientName: 'Andrew Marcus',
      time: '2015-09-10 18:00:00',
      state: 'scheduled',
      amount: '50.00',
      duration: 60
    },
    {
      id: 11,
      clientId: 1,
      clientName: 'Andrew Marcus',
      time: '2015-09-01 18:00:00',
      state: 'paid',
      amount: '50.00',
      duration: 60
    },
    {
      id: 12,
      clientId: 1,
      clientName: 'Andrew Marcus',
      time: '2015-09-11 18:00:00',
      state: 'scheduled',
      amount: '50.00',
      duration: 60
    },
    {
      id: 13,
      clientId: 2,
      clientName: 'Jesse Silkoff',
      time: '2015-09-12 18:00:00',
      state: 'scheduled',
      amount: '50.00',
      duration: 60
    }
  ];

  window.ft = {
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

    render () {
      return (
        <div className="main">
          <Header />
          <div className="container">
            <div className="row">
              <div className="hidden-xs hidden-sm col-md-4">
                <Sidebar />
              </div>
              <div className="col-sm-12 col-md-8">
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
