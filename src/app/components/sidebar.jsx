let React = require('react');
let Link = require('react-router').Link;

let Sidebar = React.createClass({

  render() {
    return (
      <div>
        <h3><Link to="clients">My Clients</Link></h3>
      </div>
    );
  },
});

module.exports = Sidebar;
