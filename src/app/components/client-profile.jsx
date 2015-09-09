let React = require("react");
let mui = require("material-ui");
let Link = require("react-router").Link;
let SessionsTable = require('./sessions-table');


let {
  Tabs,
  Tab,
} = mui;

let Colors = mui.Styles.Colors;

let ClientProfile = React.createClass({

  render() {

    return (

      <div>
        <div className="profile-intro" style={{color: "white"}}>
          <h3>Andrew Marcus</h3>
          <SessionsTable />
        </div>
      </div>

    );
  },
});

module.exports = ClientProfile;
