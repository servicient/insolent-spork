let React = require('react');
let mui = require('material-ui');
let Dialog = mui.Dialog;
let Link = require('react-router').Link;
let _ = require('lodash');
let store = require('../store');

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
      clients: []
    };
  },

  componentDidMount() {
    this._refresh(); 
  },

  _refresh() {
    store.client.where({}, (err, clients) => {
      if (this.isMounted()) {
        this.setState({clients: clients});
      }
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

    return (

      <div className="center-block" style={containerStyle}>
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

        {this.state.clients.map(client => {
          if (client.id) {
            return (
              <Card initiallyExpanded={false} key={client.id}>
                <CardHeader
                  style={{fontWeight: 200}}
                  titleColor="white"
                  subtitleColor="white"
                  title={client.name}
                  subtitle="Next Session: 9/4, 8:00am"
                  avatar={"http://lorempixel.com/100/100/people/" + client.id}
                  showExpandableButton={true}>
                </CardHeader>
                <CardActions expandable={true}>
                  <FlatButton label={client.email} primary={true}/>
                  <FlatButton label={client.phone} secondary={true}/>
                  <Link to="clientSessions" params={{id: client.id}}>+ Add Session</Link>
                  <Link to="clientProfile" params={{id: client.id}}>View Profile</Link>
                </CardActions>
              </Card>
            )
          } else {
            return (
              <Card initiallyExpanded={true} key={0}>
                <CardHeader
                  title="NEW CLIENT"
                  titleColor="white"
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
                  <FlatButton label="Cancel" secondary={true} onTouchTap={this._cancelCreate} />
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
    this.setState((previousState, currentProps) => {
      let newList = [clientObj].concat(previousState.clients);
      return {clients: newList};
    });
  },

  _createClient() {
    let newClient = {
      name: this.refs.clientName.getValue(),
      email: this.refs.clientEmail.getValue(),
      phone: this.refs.clientPhone.getValue(),
    };
    store.client.create(newClient, () => { this._refresh(); });
  },

  _cancelCreate() {
    this._refresh();
  },

  _updateClient() {
    let client = {
      name: this.refs.clientName.getValue(),
      email: this.refs.clientEmail.getValue(),
      phone: this.refs.clientPhone.getValue(),
    };
    store.client.update(client, () => { this._refresh(); });
  }
});

module.exports = ClientList;
