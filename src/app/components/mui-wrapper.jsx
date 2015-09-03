let React = require('react');
let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();

// def: higher-order function to wrap shared MUI functions
function wrapper(Component) {
  return React.createClass({
    
    childContextTypes: {
      muiTheme: React.PropTypes.object,
    },

    getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme(),
      };
    },

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  });
}

module.exports = wrapper;
