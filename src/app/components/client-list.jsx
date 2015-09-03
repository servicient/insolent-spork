let React = require('react');
let mui = require('material-ui');
let Dialog = mui.Dialog;
let Link = require('react-router').Link;

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
let Colors = mui.Styles.Colors;

let ClientList = React.createClass({

  getInitialState() {
    return {
      clients: [
        {
          id: 1,
          name: 'Andrew Marcus',
          email: 'am@test.com',
          phone: '111-111-1111'
        },
        {
          id: 2,
          name: 'Jesse Silkoff',
          email: 'js@test.com',
          phone: '222-222-2222'
        },
        {
          id: 3,
          name: 'John Hayes',
          email: 'jh@test.com',
          phone: '333-333-3333'
        }
      ]
    };
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
          <FontIcon className="material-icons">face</FontIcon>
          <br />
          <TextField
            hintText="Email"
            ref="clientEmail"
            floatingLabelText="Client's Email" />
          <FontIcon className="material-icons">email</FontIcon>
          <br />
          <TextField
            hintText="Phone"
            ref="clientPhone"
            floatingLabelText="Client's Phone" />
          <FontIcon className="material-icons">phone</FontIcon>
        </Dialog>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              hintText="Search Client List"
              className="pull-left"
              underlineFocusStyle={{borderColor: Colors.blue900}} />
            <div className="pull-right">
              <RaisedButton label="Add Client" primary={true} onTouchTap={this._newClient} labelStyle={buttonLabelStyle} >
                <FontIcon className="glyphicon glyphicon-plus pull-left" style={{color:"white", padding: "8px 0 8px 8px", fontSize: '18px'}} />
              </RaisedButton>
            </div>
          </div>
        </div>

        {this.state.clients.map(function(client) {
          return (
            <Card initiallyExpanded={false} key={client.id}>
              <CardHeader
                title={client.name}
                subtitle="Next Session: 9/4, 8:00am"
                avatar={"http://lorempixel.com/100/100/people/" + client.id}
                showExpandableButton={true}>
              </CardHeader>
              <CardActions expandable={true}>
                <FlatButton label={client.email} primary={true}/>
                <FlatButton label={client.phone} secondary={true}/>
                <Link to="clientSessions" params={{id: client.id}}>+ Add Session</Link>
              </CardActions>
            </Card>
          )
        }.bind(this))}
        
      </div>
    );
  },

  _newClient() {
    this.refs.addClientDialog.show();
  },

  _createClient() {
    let clientObj = { 
      id: +(new Date), 
      name: this.refs.clientName.getValue(),
      email: this.refs.clientEmail.getValue(),
      phone: this.refs.clientPhone.getValue(),
    };
    this.setState(function(previousState, currentProps) {
      previousState.clients.push(clientObj);
    });
    this.refs.addClientDialog.dismiss();
  }

});

module.exports = ClientList;
