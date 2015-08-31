let React = require('react');

let Header = React.createClass({

  render() {
    return (
      <div className="container">
        <img src={require('../images/logo.png')} />
      </div>
    );
  },

});

module.exports = Header;
