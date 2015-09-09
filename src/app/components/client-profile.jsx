let React = require("react");
let mui = require("material-ui");
let Link = require("react-router").Link;

let {
  Table,
  TableBody,
  TableHeaderColumn,
  TableHeader,
  TableRowColumn,
  TableRow,
  TableFooter,
} = mui;

let Colors = mui.Styles.Colors;

let ClientProfile = React.createClass({

  render() {

    let containerStyle = {
      textAlign: "center",
      paddingBottom: "70px",
    };
    this.state = {
      fixedHeader: false,
      fixedFooter: true,
      stripedRows: true,
      displayBorder: true,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      displaySelectAll: false,
      deselectOnClickaway: false,
      displayRowCheckbox: false,
      adjustForCheckbox: false,
      height: '100%',
    };

    return (

      <div>
        <div className="row">
          <div className="col-xs-12" style={{color: "white"}} >
            <div className="pull-left">
              <div> Andrew Marcus</div>
              <div className="btn btn-info btn-sm">Schedule Session</div>
            </div>
            <div className="pull-right">
              <div>
                Balance: $300
              </div>
              <div className="btn btn-success btn-sm">Add to Balance</div>
            </div>
          </div>
        </div>


        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection={this._onRowSelection}>
          <TableHeader 
            enableSelectAll={this.state.enableSelectAll}
            displaySelectAll={this.state.displaySelectAll}
            adjustForCheckbox={this.state.adjustForCheckbox}
            // mui requires a table header, but jesse don't want one
            style={{display: 'none'}} >
            <TableRow>
              <TableHeaderColumn>null</TableHeaderColumn>
              <TableHeaderColumn>null</TableHeaderColumn>
              <TableHeaderColumn>null</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            displayRowCheckbox={this.state.displayRowCheckbox}
            displayBorder={this.state.displayBorder}
            stripedRows={this.state.stripedRows}>
            <TableRow>
              <TableRowColumn>Complete</TableRowColumn>
              <TableRowColumn>$50</TableRowColumn>
              <TableRowColumn>09/04/88</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    );
  },
});

module.exports = ClientProfile;
