let React = require('react');
let mui = require('material-ui');
let Link = require('react-router').Link;

let {
  AppBar,
  IconButton,
  NavigationClose,
  FlatButton
} = mui;

let Header = React.createClass({
  render() {
    return (
      <AppBar
        style={{background: '#424242', marginBottom: '15px'}}
        title="FitnessTrainer" 
        showMenuIconButton={false} />
    );
  },
});

module.exports = Header;
