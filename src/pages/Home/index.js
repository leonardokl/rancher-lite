import React from "react";
import { connect } from "react-redux";
import { Loading } from "../../components";
import { actions } from "../../store";
import Server from "../Server";
import Servers from "../Servers";
import Header from "./Header";

const HomePage = ({ selectedServer, loading }) => (
  <div className="App">
    <Header />
    {selectedServer && selectedServer !== "manageServers" ? (
      <Server key={selectedServer} />
    ) : (
      <Servers />
    )}
    <Loading active={loading} />
  </div>
);

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
