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
  DatePicker,
  TimePicker
} = mui;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

let ClientList = React.createClass({

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

    let addClientActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._createClient, ref: 'clientSubmit' }
    ];

    let addSessionActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._createSession, ref: 'sessionSubmit' }
    ];

    return (

      <div className="center-block" style={containerStyle}>

        <Dialog
          title="Add Client"
          actions={addClientActions}
          actionFocus="clientSubmit"
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

        <Dialog
          title="Add Session"
          actions={addSessionActions}
          actionFocus="sessionSubmit"
          autoScrollBodyContent={true}
          ref="addSessionDialog">
          <DatePicker hintText="Select Date" ref="sessionDate" />
          <br />
          <TimePicker
            format="ampm"
            ref="sessionTime"
            hintText="Select Time" />
          <br />
          <TextField
            hintText="Notes"
            ref="sessionNotes"
            multiLine={true} />
        </Dialog>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              hintText="Search Client List"
              className="pull-left"
              underlineFocusStyle={{borderColor: Colors.blue900}} />
            <div className="pull-right">
              <RaisedButton label="Add Client" primary={true} onTouchTap={this._addClient} labelStyle={buttonLabelStyle} >
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
                <FlatButton label="+ Add Session" secondary={true} 
                  onTouchTap={this._addSession} />
              </CardActions>
            </Card>
          )
        }.bind(this))}
        
      </div>
    );
  },

  _addClient() {
    this.refs.addClientDialog.show();
  },

  _addSession() {
    this.refs.addSessionDialog.show();
  },

  _createClient() {
    console.log('client')
    this.props.onAddClient(
      { id: +(new Date), 
        name: this.refs.clientName.getValue(),
        email: this.refs.clientEmail.getValue(),
        phone: this.refs.clientPhone.getValue(),
      });
    this.refs.addClientDialog.dismiss();
  },

  _createSession() {
    console.log('session')
    this.props.onAddSession(
      { id: +(new Date), 
        name: this.refs.clientName.getValue(),
        email: this.refs.clientEmail.getValue(),
        phone: this.refs.clientPhone.getValue(),
      });
    this.refs.addSessionDialog.dismiss();
  }
});

module.exports = ClientList;
