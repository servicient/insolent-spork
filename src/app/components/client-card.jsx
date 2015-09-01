let React = require('react');
let mui = require('material-ui');
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
} = mui;

let ClientCard = React.createClass({

  render() {
    return (
      <div>
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
});

module.exports = ClientCard;
