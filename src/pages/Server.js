import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, getApi } from "../store";
import notification from "../utils/notification";
import Stacks from "./Stacks";

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
  showLoader: actions.showLoader
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerPage);
