let React = require('react');
let mui = require('material-ui');
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

let ClientTable = React.createClass({

  getDefaultProps() {
    return {
      
    };
  },

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

    let dialogActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'dialogSubmit' }
    ];

    return (

      <div className="center-block" style={containerStyle}>

        <Dialog
          title="Add Client"
          actions={dialogActions}
          actionFocus="dialogSubmit"
          autoScrollBodyContent={true}
          ref="addClientDialog">
          <TextField
            hintText="Client's Name"
            ref="clientName"
            floatingLabelText="Client's Name" />
          <br />
          <TextField
            hintText="Email"
            ref="clientEmail"
            floatingLabelText="Client's Email" />
          <br />
          <TextField
            hintText="Phone"
            ref="clientPhone"
            floatingLabelText="Client's Phone" />
        </Dialog>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              hintText="Search Client List"
              className="pull-left"
              underlineFocusStyle={{borderColor: Colors.blue900}} />
            <div className="pull-right">
              <RaisedButton label="Add Client" primary={true} onTouchTap={this._handleTouchTap} labelStyle={buttonLabelStyle} >
                <FontIcon className="glyphicon glyphicon-plus pull-left" style={{color:"white", padding: "8px 0 8px 8px", fontSize: '18px'}} />
              </RaisedButton>
            </div>
          </div>
        </div>

        {this.props.clients.map(function(client) {
          return (
            <Card initiallyExpanded={false} key={client.id}>
              <CardHeader
                title={client.name}
                subtitle="Next Session: 9/4, 8:00am"
                avatar={<Avatar className="pull-left">A</Avatar>}
                showExpandableButton={true}>
              </CardHeader>
              <CardActions expandable={true}>
                <FlatButton label={client.email} primary={true}/>
                <FlatButton label={client.phone} secondary={true}/>
              </CardActions>
            </Card>
          )
        })}
        
      </div>
    );
  },

  _handleTouchTap() {
    this.refs.addClientDialog.show();
  },

  _onDialogSubmit() {
    console.log('submit')
    this.props.onAdd(
      { id: +(new Date), 
        name: this.refs.clientName.getValue(),
        email: this.refs.clientEmail.getValue(),
        phone: this.refs.clientPhone.getValue(),
      });
    this.refs.addClientDialog.dismiss();
  }
});

module.exports = ClientTable;
