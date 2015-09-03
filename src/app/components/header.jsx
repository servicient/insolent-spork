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
        title="FitnessTrainer" showMenuIconButton={false} />
    );
  },
});

module.exports = Header;
