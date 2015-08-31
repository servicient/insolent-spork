/** In this file, we create a React component which incorporates components provided by material-ui */

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




let Main = React.createClass({

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
    };

    let containerStyle = {
      textAlign: 'center',
      maxWidth: '500px',
    };

    let standardActions = [
      { text: 'Add' },
    ];

    return (

      <div className="center-block" style={containerStyle}>

        <Dialog
          title="Add Client"
          actions={standardActions}
          autoScrollBodyContent={true}
          ref="addClientDialog">
          <TextField
            hintText="Client's Name"
            floatingLabelText="Client's Name" />
          <br />
          <TextField
            hintText="Email"
            floatingLabelText="Client's Email" />
          <br />
          <TextField
            hintText="Phone"
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

        <Card initiallyExpanded={false}>
          <CardHeader
            title="Andrew Marcus"
            subtitle="Next Session: 9/4, 8:00am"
            avatar={<Avatar className="pull-left">A</Avatar>}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
            Something about something yeah
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1" primary={true}/>
          </CardActions>
          <CardText expandable={true}>
            More Something about something
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action2" secondary={true}/>
          </CardActions>
        </Card>


        <Card initiallyExpanded={false}>
          <CardHeader
            title="Andrew Marcus"
            subtitle="Next Session: 9/4, 8:00am"
            avatar={<Avatar className="pull-left">A</Avatar>}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
            Something about something yeah
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1" primary={true}/>
          </CardActions>
          <CardText expandable={true}>
            More Something about something
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action2" secondary={true}/>
          </CardActions>
        </Card>


        <Card initiallyExpanded={false}>
          <CardHeader
            title="Andrew Marcus"
            subtitle="Next Session: 9/4, 8:00am"
            avatar={<Avatar className="pull-left">A</Avatar>}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
            Something about something yeah
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action1" primary={true}/>
          </CardActions>
          <CardText expandable={true}>
            More Something about something
          </CardText>
          <CardActions expandable={true}>
            <FlatButton label="Action2" secondary={true}/>
          </CardActions>
        </Card>
      </div>
    );
  },

  _handleTouchTap() {
    this.refs.addClientDialog.show();
  },

});

module.exports = Main;
