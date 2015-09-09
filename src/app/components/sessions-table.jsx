let React = require('react');
let mui = require('material-ui');
let Dialog = mui.Dialog;
let Link = require('react-router').Link;
let _ = require('lodash');
let store = require('../store');

let {
  Tab,
  Tabs,
} = mui;
let Colors = mui.Styles.Colors;

let SessionsTable = React.createClass({

  getInitialState() {
    return {
      clients: []
    };
  },

  componentDidMount() {
    this._refresh(); 
  },

  _refresh() {
    store.client.all((err, clients) => {
      if (this.isMounted()) {
        this.setState({clients: clients});
      }
    }); 
  },

  render() {

    return (
      <Tabs>
        <Tab label="Upcoming" >
          <table className="table table-responsive">
            <tr>
              <td>
                <span style={{color: "white"}}>
                  Upcoming
                </span>
              </td>
              <td>
                <span style={{color: "white"}}>
                  $50
                </span>
              </td>
              <td>
                <span style={{color: "white"}}>
                  09/04/88
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span style={{color: "white"}}>
                  Upcoming
                </span>
              </td>
              <td>
                <span style={{color: "white"}}>
                  $50
                </span>
              </td>
              <td>
                <span style={{color: "white"}}>
                  09/04/88
                </span>
              </td>
            </tr>
          </table>
        </Tab>
        <Tab label="Completed" >
          <table className="table table-responsive">
            <tr>
              <td>
                <span style={{color: "white"}}>
                  Complete
                </span>
              </td>
              <td>
                <span style={{color: "white"}}>
                  $50
                </span>
              </td>
              <td>
                <span style={{color: "white"}}>
                  09/04/88
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span style={{color: "white"}}>
                  Complete
                </span>
              </td>
              <td>
                <span style={{color: "white"}}>
                  $50
                </span>
              </td>
              <td>
                <span style={{color: "white"}}>
                  09/04/88
                </span>
              </td>
            </tr>
          </table>
        </Tab>
      </Tabs>
      
    );
  },

});

module.exports = SessionsTable;
