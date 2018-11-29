import React, { Component } from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { Card, Header, Search } from "../components";
import {
  actions,
  getStacks,
  fetchStacks,
  subscribeToResourceChange
} from "../store";
import Stack from "./Stack";

class StacksPage extends Component {
  state = {
    query: ""
  };
  socket = undefined;
  cards = [];
  activeCardIndex = undefined;

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
    this.props.selectStack(stack._id);
    this.setState({ query: "" });
    this.activeCardIndex = undefined;
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

  handleKeyChange = evt => {
    const { query } = this.state;
    const stacks = this.getActiveStacks();

    if (evt.key === "Enter" && query && stacks.length) {
      this.selectStack(stacks[0]);
    }

    if (evt.key === "ArrowDown" && this.cards.length) {
      evt.preventDefault();
      this.cards[0].focus();
    }
  };

  handleKeyDown = evt => {
    if (evt.key === "ArrowDown" && this.cards.length) {
      evt.preventDefault();
      const item = this.cards[this.activeCardIndex + 1];

      item && item.focus();
    }

    if (evt.key === "ArrowUp" && this.cards.length) {
      evt.preventDefault();
      const item = this.cards[this.activeCardIndex - 1];

      item && item.focus();
    }
  };

  render() {
    const { selectedStack } = this.props;
    const stacks = this.getActiveStacks();

    this.cards = [];

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
          {stacks.map((stack, index) => (
            <Card
              ref={node => {
                this.cards[index] = node;
              }}
              name={stack.name}
              onClick={this.createStackClickHandler(stack)}
              onKeyDown={this.handleKeyDown}
              onFocus={() => {
                this.activeCardIndex = index;
              }}
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
  getStacks: query => getStacks(state, query)
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
