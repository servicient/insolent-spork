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
let Colors = mui.Styles.Colors;

let SessionList = React.createClass({

  getInitialState () {
    return {
      sessions: []  
    };
  },

  componentDidMount() {
    let clientId = this.props.params.clientId;
    this.fetchSessions(clientId, function(err, sessions) {
      console.log(sessions)
      this.setState({ sessions: sessions });
    }.bind(this));
  },

  fetchSessions: function(clientId, cb) {
    cb(null, [
      {
        clientId: 1,
        clientName: 'Andrew Marcus',
        time: '2015-09-10 18:00:00',
        duration: 60
      }]
    );
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

    let addSessionActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._createSession, ref: 'sessionSubmit' }
    ];

    return (

      <div className="center-block" style={containerStyle}>

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
            <div className="pull-right">
              <RaisedButton label="Add Session" primary={true} onTouchTap={this._newSession} labelStyle={buttonLabelStyle} >
                <FontIcon className="glyphicon glyphicon-plus pull-left" style={{color:"white", padding: "8px 0 8px 8px", fontSize: '18px'}} />
              </RaisedButton>
            </div>
          </div>
        </div>
        
        {this.state.sessions.map(function(session) {
          return (
            <Card initiallyExpanded={false} key={session.id}>
              <CardTitle
                title={session.clientName + ' @ ' + session.time}
                subtitle={session.duration + ' min'}
                showExpandableButton={true}>
              </CardTitle>
              <CardActions expandable={true}>
                <FlatButton label="Reschedule" primary={true}/>
                <FlatButton label="Cancel" secondary={true}/>
              </CardActions>
            </Card>
          )
        }.bind(this))}

      </div>
    );
  },

  _newSession() {
    this.refs.addSessionDialog.show();
  },

  _createSession() {
    console.log('session')
    this.props.onAddSession(
      
    );
    this.refs.addSessionDialog.dismiss();
  }
});

module.exports = SessionList;
