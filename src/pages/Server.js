import React, { Component } from "react";
import { connect } from "react-redux";
import { getApi } from "../store";
import { actions } from "../store";
import notification from "../utils/notification";
import StacksPage from "./Stacks";
import ProjectsPage from "./Projects";

class ServerPage extends Component {
  componentDidMount() {
    const { fetchProjects, setProjects, showLoader } = this.props;

    showLoader();

    fetchProjects()
      .then(({ data }) => setProjects(data))
      .catch(ex => {
        setProjects([]);
        notification.error(ex.message);
      });
  }

  render() {
    const { selectedProject } = this.props;

    if (selectedProject) {
      return <StacksPage key={selectedProject} />;
    }

    return <ProjectsPage />;
  }
}

const mapStateToProps = state => ({
  selectedProject: state.selectedProject,
  fetchProjects: () => getApi(state).get("projects")
});

const mapDispatchToProps = {
  setProjects: actions.setProjects,
  showLoader: actions.showLoader
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerPage);
