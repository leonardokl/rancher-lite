import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../components/Loading";
import Servers from "../Servers";
import Server from "../Server";
import { actions } from "../../store";
import Header from "./Header";

class HomePage extends Component {
  componentDidMount() {
    const { servers, selectedServer, selectServer } = this.props;

    if (servers.length && !selectedServer) {
      selectServer(servers[0].id);
    }
  }

  render() {
    const { selectedServer, loading } = this.props;

    return (
      <div className="App">
        <Header />
        {selectedServer ? (
          <Server key={selectedServer} />
        ) : (
          <Servers />
        )}
        <Loading active={loading} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  servers: state.servers,
  loading: state.loading,
  projects: state.projects,
  selectedServer: state.selectedServer
});

const mapDispatchToProps = {
  selectServer: actions.selectServer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
