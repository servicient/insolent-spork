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

let ClientProfile = React.createClass({

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
        <h1>Client View</h1>
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

module.exports = ClientProfile;
