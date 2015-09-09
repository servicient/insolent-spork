let React = require("react");
let mui = require("material-ui");
let Link = require("react-router").Link;
// let SessionsTable = require('./sessions-table');
let SessionsList = require("./session-list");
let store = require("../store");

let {
  Tabs,
  Tab,
  Avatar
} = mui;

let Colors = mui.Styles.Colors;

let ClientProfile = React.createClass({

  getInitialState() {
    return {
      client: null  
    };
  },

  componentDidMount() {
    store.client.first({id: +this.props.params.id}, (err, client) => {
      if (this.isMounted()) {
        this.setState({client: client});
      }
    });
  },

  render() {

    if (this.state.client) {
      return (
        <div>
          <div className="profile-intro" style={{color: "white"}}>
            <h3>
              <Avatar src={this.state.client.avatar} />
              {this.state.client.name}
            </h3>
            <SessionsList client={this.state.client} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
});

module.exports = ClientProfile;
