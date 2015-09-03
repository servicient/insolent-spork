let React = require('react');
let mui = require('material-ui');
let { Link, Navigation } = require('react-router');
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
