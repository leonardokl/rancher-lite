import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../store";
import Dropdown from "../../components/Dropdown";

class HomeHeader extends Component {
  componentDidMount() {
    const { servers, selectedServer, selectServer } = this.props;

    if (servers.length && !selectedServer) {
      selectServer(servers[0].id);
    }
  }

  handleServerChange = (evt, { value }) => {
    const { manageServers, selectedServer } = this.props;

    if (value === "manageServers") {
      manageServers();
    } else if (value !== selectedServer) {
      this.props.selectServer(value);
    }
  };

  handleDropdownChange = (evt, { value }) => {
    this.props.selectProject(value);
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
                  options={servers
                    .map(server => ({
                      value: server.id,
                      text: server.url
                    }))
                    .concat({ value: "manageServers", text: "Manage Servers" })}
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
                    onChange={this.handleDropdownChange}
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
  manageServers: actions.manageServers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeHeader);
