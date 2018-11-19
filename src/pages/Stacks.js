import React, { Component } from "react";
import { connect } from "react-redux";
import { getApi } from "../store";
import { actions, getFilteredStacks } from "../store";
import StackCard from "../components/Stack";
import Search from "../components/Search";
import Stack from "./Stack";

class Stacks extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const { fetchStacks, setStacks, showLoader, hideLoader } = this.props;

    showLoader();

    fetchStacks()
      .then(({ data }) => setStacks(data))
      .catch(() => setStacks([]))
      .then(hideLoader);
  }

  handleSearchChange = evt => {
    this.setState({ query: evt.target.value });
  };

  createStackClickHandles = stack => () => {
    this.props.selectStack(stack.id);
    this.setState({ query: "" });
  };

  render() {
    const { getStacks, selectedStack } = this.props;
    const { query } = this.state;
    const stacks = getStacks(query);

    if (selectedStack) {
      return <Stack key={selectedStack} />;
    }

    return (
      <div>
        <section className="header">
          <h1>Stacks</h1>
          <Search value={query} onChange={this.handleSearchChange} />
        </section>

        <section className="stacks-wrap r-pl0 r-pr0">
          {stacks.map(stack => (
            <StackCard
              data={stack}
              onClick={this.createStackClickHandles(stack)}
            />
          ))}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stacks: state.stacks,
  getStacks: query => getFilteredStacks(state, query),
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
