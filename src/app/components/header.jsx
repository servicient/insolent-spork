let React = require('react');
let mui = require('material-ui');
let Link = require('react-router').Link;

let {
  AppBar,
  LeftNav,
  MenuItem,
} = mui;

let Header = React.createClass({

  render() {
    return (
      <div>
        <h5><Link to="clients">clients</Link></h5>
        <h5><Link to="sessions">sessions</Link></h5>
      </div>
    );
  },
});

module.exports = Header;
