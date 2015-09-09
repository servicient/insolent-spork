let React = require('react');
let mui = require('material-ui');
let Dialog = mui.Dialog;
let _ = require('lodash');
let store = require('../store');
let moment = require('moment');
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

let SessionList = React.createClass({

  getInitialState () {
    return {
      sessions: []  
    };
  },

  componentDidMount() {
    this._refresh(); 
  },

  _refresh() {
    let clientId = +this.props.client.id;
    store.session.where({clientId: clientId}, (err, sessions) => {
      if (this.isMounted()) {
        this.setState({sessions: sessions});
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
            <div className="pull-right">
              <RaisedButton label="Add Session" primary={true} onTouchTap={this._newSession} labelStyle={buttonLabelStyle} >
                <FontIcon className="glyphicon glyphicon-plus pull-left" style={{color:"white", padding: "8px 0 8px 8px", fontSize: '18px'}} />
              </RaisedButton>
            </div>
          </div>
        </div>
        
        {this.state.sessions.map(session => {
          if (session.id) {
            return (
              <Card initiallyExpanded={false} key={session.id}>
                <CardTitle
                  title={moment(session.time).format(window.ft.conf.time.formats.dow)}
                  subtitle={session.duration + ' min'}
                  showExpandableButton={true}>
                </CardTitle>
                <CardActions expandable={true}>
                  <FlatButton label="Reschedule" primary={true} />
                  <FlatButton label="Cancel" secondary={true} onTouchTap={this._cancelCreate} />
                </CardActions>
              </Card>
            )
          } else {
            return (
              <Card initiallyExpanded={true} key={0}>
                <CardHeader
                  title="NEW SESSION"
                  titleColor="white"
                  showExpandableButton={false}
                  avatar={<Avatar>A</Avatar>}>
                </CardHeader>
                <CardText>
                  <DatePicker 
                    floatingLabelText="Select Date" 
                    ref="sessionDate"
                    autoOk={true} />
                  <FontIcon className="material-icons">event</FontIcon>
                  <br />
                  <TimePicker
                    format="ampm"
                    ref="sessionTime"
                    floatingLabelText="Select Time" />
                  <FontIcon className="material-icons">schedule</FontIcon>
                  <br />
                  <TextField
                    floatingLabelText="Amount ($)"
                    ref="sessionAmount" />
                  <br />
                  <TextField
                    floatingLabelText="Duration (min.)"
                    ref="sessionDuration" />
                  <br />
                  <TextField
                    floatingLabelText="Notes"
                    ref="sessionNotes"
                    multiLine={true} />
                </CardText>
                <CardActions expandable={true}>
                  <FlatButton label="Save" primary={true} onTouchTap={this._createSession} />
                  <FlatButton label="Cancel" secondary={true} onTouchTap={this._cancelCreate} />
                </CardActions>
              </Card>
            )  
          }
        })}

      </div>
    );
  },

  _newSession() {
    let sessionObj = {};
    this.setState((previousState, currentProps) => {
      let newList = [sessionObj].concat(previousState.sessions);
      return {sessions: newList};
    });
  },

  _createSession() {
    let newSession = {
      clientId: +this.props.client.id,
      time: this._concatTime(),
      duration: this.refs.sessionDuration.getValue(),
      notes: this.refs.sessionNotes.getValue(),
      amount: this.refs.sessionAmount.getValue()
    };
    store.session.create(newSession, () => { this._refresh(); });
  },

  _cancelCreate() {
    this._refresh();
  },

  _concatTime() {
    //TODO
    return this.refs.sessionTime.getTime();
  }
});

module.exports = SessionList;
