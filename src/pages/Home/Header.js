import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../store";
import Dropdown from "../../components/Dropdown";

class HomeHeader extends Component {
  handleServerChange = (evt, { value }) => {
    const { manageServers, selectedServer } = this.props;

    if (value === "manageServers") {
      manageServers();
    } else if (value !== selectedServer) {
      this.props.selectServer(value);
    }
  };

  handleProjectChange = (evt, { value }) => {
    const { selectedProject } = this.props;

    if (selectedProject !== value) {
      this.props.selectProject(value);
    }
  };

  render() {
    const { projects, servers, selectedProject, selectedServer } = this.props;

    return (
      <header>
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <ul className="nav">
                <Dropdown
                  placeholder="Servers"
                  main
                  value={selectedServer}
                  options={servers.map(server => ({
                    value: server.id,
                    text: server.url
                  }))}
                  dividerOption={{
                    value: "manageServers",
                    text: "Manage Servers"
                  }}
                  onChange={this.handleServerChange}
                />
                {!!projects.length && (
                  <Dropdown
                    placeholder="Environments"
                    value={selectedProject}
                    options={projects.map(project => ({
                      value: project.id,
                      text: project.name
                    }))}
                    onChange={this.handleProjectChange}
                  />
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  servers: state.servers,
  projects: state.projects,
  selectedProject: state.selectedProject,
  selectedServer: state.selectedServer
});

const mapDispatchToProps = {
  selectServer: actions.selectServer,
  selectProject: actions.selectProject,
  manageServers: actions.manageServers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeHeader);
