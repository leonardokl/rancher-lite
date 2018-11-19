import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, getSelectedServer } from "../../store";
import Dropdown from "../../components/Dropdown";

class HomeHeader extends Component {
  componentDidMount() {
    const { servers, selectedServer, selectServer } = this.props;

    if (servers.length && !selectedServer) {
      selectServer(servers[0].id);
    }
  }

  handleServerChange = (evt, { value }) => {
    const server = value === "addNewServer" ? null : value;

    this.props.selectServer(server);
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
                  placeholder="Server"
                  main
                  value={selectedServer}
                  options={servers
                    .map(server => ({
                      value: server.id,
                      text: server.url
                    }))
                    .concat({ value: "addNewServer", text: "ADD SERVER" })}
                  onChange={this.handleServerChange}
                />
                <Dropdown
                  placeholder="Environment"
                  value={selectedProject}
                  options={projects.map(project => ({
                    value: project.id,
                    text: project.name
                  }))}
                  onChange={this.handleDropdownChange}
                />
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
  selectProject: actions.selectProject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeHeader);
