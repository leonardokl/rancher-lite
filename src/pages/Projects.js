import React from "react";
import { connect } from "react-redux";
import { actions } from "../store";
import Card from "../components/Stack";

const ProjectsPage = ({ projects, selectProject }) => (
  <div>
    <section className="header">
      <h1>Environments</h1>
    </section>

    <section className="stacks-wrap r-pl0 r-pr0">
      {projects.map(project => (
        <Card data={project} onClick={() => selectProject(project.id)} />
      ))}
    </section>
  </div>
);

const mapStateToProps = state => ({
  projects: state.projects
});

const mapDispatchToProps = {
  selectProject: actions.selectProject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsPage);
