let React = require('react');
let injectTapEventPlugin = require('react-tap-event-plugin');
let mui = require('material-ui');
let { Link, Navigation } = require('react-router');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let {
  List,
  ListItem,
  ContentInbox
} = mui;

let Sidebar = React.createClass({
  mixins: [Navigation],

  render() {
    return (
      <List subheader="Menu">
        <ListItem primaryText="My Clients" onTouchTap={this._touchTap} />
      </List>
    );
  },

  _touchTap: function(e) {
    this.transitionTo('clients');
  }
});

module.exports = Sidebar;
