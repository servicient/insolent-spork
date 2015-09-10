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
      fontSize: '25px',
      fontWeight: '300',
    };


    return (

      <div>
        <AppBar title="FitnessTrainer!"
          style={{backgroundColor: '#151515'}}
          showMenuIconButton={false} />
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
                    onTouchTap={this._nav("clientProfile", {id: client.id})}
                  />
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
