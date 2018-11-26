import React, { Component } from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { Card, Header, Search } from "../components";
import {
  actions,
  getFilteredStacks,
  fetchStacks,
  subscribeToResourceChange
} from "../store";
import Stack from "./Stack";

class StacksPage extends Component {
  state = {
    query: ""
  };
  socket = undefined;

  componentDidMount() {
    const { fetchStacks, subscribeToResourceChange } = this.props;

    this.socket = subscribeToResourceChange();

    fetchStacks();
  }

  componentWillUnmount() {
    this.socket.close();
  }

  search = debounce(query => {
    this.setState({ query });
  }, 100);

  handleSearchChange = evt => {
    this.search(evt.target.value);
  };

  selectStack = stack => {
    this.props.selectStack(stack.id);
    this.setState({ query: "" });
  };

  createStackClickHandler = stack => () => {
    this.selectStack(stack);
  };

  getActiveStacks = () => {
    const { getStacks } = this.props;
    const { query } = this.state;
    const stacks = getStacks(query);

    return stacks;
  };

  handleKeyChange = ({ key }) => {
    const { query } = this.state;
    const stacks = this.getActiveStacks();

    if (key === "Enter" && query && stacks.length) {
      this.selectStack(stacks[0]);
    }
  };

  render() {
    const { selectedStack } = this.props;
    const stacks = this.getActiveStacks();

    if (selectedStack) {
      return <Stack key={selectedStack} />;
    }

    return (
      <div>
        <Header>
          <h1>Stacks</h1>
          <Search
            name="searchStacks"
            key="searchStacks"
            onChange={this.handleSearchChange}
            onKeyDown={this.handleKeyChange}
          />
        </Header>

        <Card.Group>
          {stacks.map(stack => (
            <Card
              name={stack.name}
              onClick={this.createStackClickHandler(stack)}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stacks: state.stacks,
  selectedStack: state.selectedStack,
  getStacks: query => getFilteredStacks(state, query)
});

const mapDispatchToProps = {
  fetchStacks,
  subscribeToResourceChange,
  selectStack: actions.selectStack,
  updateService: actions.updateService
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StacksPage);
