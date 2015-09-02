let React = require('react');
let mui = require('material-ui');
let Link = require('react-router').Link;

let {
  AppBar,
  IconButton,
  NavigationClose,
  FlatButton
} = mui;
let ThemeManager = new mui.Styles.ThemeManager();

let Header = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  },

  render() {
    return (
      <AppBar
        title="FitnessTrainer" showMenuIconButton={false} />
    );
  },
});

module.exports = Header;
