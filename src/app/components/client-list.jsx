let React = require('react');
let mui = require('material-ui');
let Dialog = mui.Dialog;
let Common = require("./common");
let _ = require('lodash');
let store = require('../store');

let {
  Avatar,
  AppBar,
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
  mixins: [Common],

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
      fontSize: 25,
      fontWeight: '300',
    };

    let iconStyle = {
      paddingRight: 5,
      verticalAlign: 'middle',
    }

    return (

      <div>
        <div className="text-center well-sm">
          <RaisedButton label="Add Client" primary={true} onTouchTap={this._newClient} labelStyle={buttonLabelStyle} >
            <FontIcon className="glyphicon glyphicon-plus pull-left" style={{color:"white", padding: "8px 0 8px 8px", fontSize: '18px'}} />
          </RaisedButton>
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
                  avatar={client.avatar}
                  showExpandableButton={true}>
                </CardHeader>
                <CardActions expandable={true}>
                  <FlatButton label={client.email} primary={true}/>
                  <FlatButton label={client.phone} secondary={true}/>
                  <RaisedButton label="View Profile" primary={true} 
                    onTouchTap={this._nav("clientProfile", {id: client.id})} />
                </CardActions>
              </Card>
            )
          } else {
            return (
              <Card initiallyExpanded={true} key={0}>
                <CardText>
                  <div>
                    <FontIcon className="material-icons" style={iconStyle}>person</FontIcon>
                    <TextField
                      ref="clientName"
                      hintText="Client's Name" />
                  </div>
                  <div>
                    <FontIcon className="material-icons" style={iconStyle}>email</FontIcon>
                    <TextField
                      ref="clientEmail"
                      type="email"
                      hintText="Client's Email" />
                  </div>
                  <div>
                    <FontIcon className="material-icons" style={iconStyle}>phone</FontIcon>
                    <TextField
                      ref="clientPhone"
                      type="tel"
                      hintText="Client's Phone" />
                  </div>
                </CardText>
                <CardActions expandable={true} style={{textAlign: 'center'}} >
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
