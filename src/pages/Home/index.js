import React, { Component } from "react";
import { connect } from "react-redux";
import AddRancherServer from "../AddRancherServer";
import RancherServer from "../RancherServer";
import Loading from "../../components/Loading";
import { actions } from "../../store";
import Header from "./Header";

class Home extends Component {
  componentDidMount() {
    const { servers, selectedServer, selectServer } = this.props;

    if (servers.length && !selectedServer) {
      selectServer(servers[0].id);
    }
  }

  render() {
    const { selectedServer, servers, loading } = this.props;

    if (!servers.length) {
      return <AddRancherServer />;
    }

    return (
      <div className="App">
        <Header />
        {selectedServer ? (
          <RancherServer key={selectedServer} />
        ) : (
          <AddRancherServer />
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
)(Home);
