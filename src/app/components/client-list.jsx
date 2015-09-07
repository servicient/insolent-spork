let React = require('react');
let mui = require('material-ui');
let Dialog = mui.Dialog;
let Link = require('react-router').Link;
let _ = require('lodash');

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
            ref="clientName"
            floatingLabelText="Client's Name" />
          <FontIcon className="material-icons">face</FontIcon>
          <br />
          <TextField
            ref="clientEmail"
            floatingLabelText="Client's Email" />
          <FontIcon className="material-icons">email</FontIcon>
          <br />
          <TextField
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

        {this.state.clients.map((client) => {
          if (client.id) {
            return (
              <Card initiallyExpanded={false} key={client.id}>
                <CardHeader
                  style={{fontWeight: '200'}}
                  titleColor={'white'}
                  subtitleColor={'white'}
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
          } else {
            return (
              <Card initiallyExpanded={true} key={0}>
                <CardHeader
                  title="NEW CLIENT"
                  showExpandableButton={false}
                  avatar={<Avatar>A</Avatar>}>
                </CardHeader>
                <CardText>
                  <TextField
                    ref="clientName"
                    floatingLabelText="Client's Name" />
                  <FontIcon className="material-icons">face</FontIcon>
                  <br />
                  <TextField
                    ref="clientEmail"
                    floatingLabelText="Client's Email" />
                  <FontIcon className="material-icons">email</FontIcon>
                  <br />
                  <TextField
                    ref="clientPhone"
                    floatingLabelText="Client's Phone" />
                  <FontIcon className="material-icons">phone</FontIcon>
                </CardText>
                <CardActions expandable={true}>
                  <FlatButton label="Save" primary={true} onTouchTap={this._createClient} />
                  <FlatButton label="Cancel" secondary={true}/>
                </CardActions>
              </Card>
            )
          }
        })}
        
      </div>
    );
  },

  _newClient() {
    let clientObj = {};
    this.setState(function(previousState, currentProps) {
      let newList = [clientObj].concat(previousState.clients);
      return {clients: newList};
    });
    // this.refs.addClientDialog.show();
  },

  _createClient() {
    let clientObj = { 
      id: +(new Date), 
      name: this.refs.clientName.getValue(),
      email: this.refs.clientEmail.getValue(),
      phone: this.refs.clientPhone.getValue(),
    };
    this.setState((previousState, currentProps) => {
      let newList = [clientObj].concat(previousState.clients);
      let nonEmpty = newList.map(function(client) {
        if (client.id) return client;
      });
      return {clients: _.compact(nonEmpty)};
    });
    // this.refs.addClientDialog.dismiss();
  }
});

module.exports = ClientList;
