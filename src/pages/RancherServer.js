import React, { Component } from "react";
import { connect } from "react-redux";
import { getApi } from "../store";
import { actions } from "../store";
import Stacks from "./Stacks";

class RancherServer extends Component {
  componentDidMount() {
    const { fetchProjects, setProjects, showLoader, hideLoader } = this.props;

    showLoader();

    fetchProjects()
      .then(({ data }) => setProjects(data))
      .catch(() => setProjects([]))
      .then(hideLoader);
  }

  render() {
    const { selectedProject } = this.props;

    if (selectedProject) {
      return <Stacks key={selectedProject} />;
    }

    return null;
  }
}

const mapStateToProps = state => ({
  selectedProject: state.selectedProject,
  fetchProjects: () => getApi(state).get("projects")
});

const mapDispatchToProps = {
  setProjects: actions.setProjects,
  showLoader: actions.showLoader,
  hideLoader: actions.hideLoader
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RancherServer);
