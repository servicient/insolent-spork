/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let ClientInputs = require('./client-inputs')
let ClientCard = require('./client-card')
let Dialog = mui.Dialog;
let {
  Avatar,
  Card,
  CardActions,
  CardExpandable,
  CardHeader,
  CardMedia,
  CardText,
  CardTitle,
  FlatButton,
  RaisedButton,
  TextField,
  IconButton,
  FontIcon,
} = mui;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;


let Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  },

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.blue900,
    });
  },

  render() {

    let buttonLabelStyle = {
      padding: '0 16px 0 8px',
      fontSize: '25px',
      fontWeight: '300',
    };

    let containerStyle = {
      textAlign: 'center',
      paddingBottom: '70px',
    };

    let standardActions = [
      { text: 'Add' },
    ];

    return (

      <div className="center-block" style={containerStyle}>

        <Dialog
          title="Add Client"
          actions={standardActions}
          autoScrollBodyContent={true}
          ref="addClientDialog">
          <ClientInputs />
        </Dialog>
        <div className="row">
          <div className="col-xs-12">
            <TextField
              hintText="Search Client List"
              underlineFocusStyle={{borderColor: Colors.blue900}} />
          </div>
        </div>

        <ClientCard />
        <div className="text-center" style={{position: "fixed", left: "0", bottom: "0", right: "0"}} >
          <RaisedButton label="+ Add Client" primary={true} 
          onTouchTap={this._handleTouchTap} 
          labelStyle={buttonLabelStyle} 
          style={{width: "100%", height: "60px"}} >
          </RaisedButton>
        </div>

        
      </div>
    );
  },

  _handleTouchTap() {
    this.refs.addClientDialog.show();
  },

});

module.exports = Main;
