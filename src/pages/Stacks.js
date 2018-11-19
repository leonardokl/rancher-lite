import React, { Component } from "react";
import { connect } from "react-redux";
import { getApi } from "../store";
import { actions } from "../store";
import StackCard from "../components/Stack";
import Stack from "./Stack";

class Stacks extends Component {
  componentDidMount() {
    const { fetchStacks, setStacks, showLoader, hideLoader } = this.props;

    showLoader();

    fetchStacks()
      .then(({ data }) => setStacks(data))
      .catch(() => setStacks([]))
      .then(hideLoader);
  }

  render() {
    const { stacks, selectStack, selectedStack } = this.props;

    if (selectedStack) {
      return <Stack key={selectedStack} />;
    }

    return (
      <div>
        <section className="header">
          <h1>Stacks</h1>
        </section>
        <section className="stacks-wrap r-pl0 r-pr0">
          {stacks.map(stack => (
            <StackCard data={stack} onClick={() => selectStack(stack.id)} />
          ))}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stacks: state.stacks,
  selectedStack: state.selectedStack,
  fetchStacks: () =>
    getApi(state).get(
      `projects/${state.selectedProject}/stacks?limit=-1&sort=name`
    )
});

const mapDispatchToProps = {
  setStacks: actions.setStacks,
  selectStack: actions.selectStack,
  showLoader: actions.showLoader,
  hideLoader: actions.hideLoader
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stacks);
