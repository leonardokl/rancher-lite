import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, getProjects } from "../../store";
import { Navbar } from "../../components";

class HomeHeader extends Component {
  handleServerChange = (evt, { value }) => {
    this.props.onSelectServer(value);
    
  };

  handleProjectChange = (evt, { value }) => {
    this.props.onSelectProject(value);
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeHeader);
