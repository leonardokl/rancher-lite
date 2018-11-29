import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, getProjects } from "../../store";
import { Navbar } from "../../components";

class HomeHeader extends Component {
  handleServerChange = (evt, { value }) => {
    const { manageServers, selectedServer } = this.props;

    if (value === "manageServers") {
      manageServers();
    } else if (value !== selectedServer) {
      this.props.onSelectServer(value);
    }
  };

  handleProjectChange = (evt, { value }) => {
    const { selectedProject } = this.props;

    if (selectedProject !== value) {
      this.props.onSelectProject(value);
    }
  };

  render() {
    const { projects, servers, selectedProject, selectedServer } = this.props;

    return (
      <Navbar
        projects={projects}
        servers={servers}
        selectedProject={selectedProject}
        selectedServer={selectedServer}
        onServerChange={this.handleServerChange}
        onProjectChange={this.handleProjectChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  servers: state.servers,
  projects: getProjects(state),
  selectedProject: state.selectedProject,
  selectedServer: state.selectedServer
});

const mapDispatchToProps = {
  onSelectServer: actions.selectServer,
  onSelectProject: actions.selectProject,
  manageServers: actions.manageServers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeHeader);
