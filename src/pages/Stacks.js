import React, { Component } from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { Card, Header, Search } from "../components";
import { actions, getApi, getFilteredStacks } from "../store";
import notification from "../utils/notification";
import Stack from "./Stack";

class StacksPage extends Component {
  state = {
    query: ""
  };
  socket = undefined;

  handleSocketMessage = event => {
    const message = JSON.parse(event.data);
    const { resourceType, name, data } = message;

    if (name === "resource.change" && data && resourceType === "service") {
      const { resource } = data;

      this.props.updateService(resource);
    }
  };

  openSocket = () => {
    const { subscribeToResourceChange } = this.props;

    this.socket = subscribeToResourceChange();

    this.socket.addEventListener("open", () => console.log("Socket opened"));

    this.socket.addEventListener("close", () => console.log("Socket closed"));

    this.socket.addEventListener("message", this.handleSocketMessage);
  };

  componentDidMount() {
    const { fetchStacks, setStacks, showLoader } = this.props;

    this.openSocket();

    showLoader();

    fetchStacks()
      .then(({ data }) => setStacks(data))
      .catch(ex => {
        console.error(ex);
        setStacks([]);
        notification.error(ex.message);
      });
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

  createStackClickHandles = stack => () => {
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
              onClick={this.createStackClickHandles(stack)}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const api = getApi(state);

  return {
    stacks: state.stacks,
    selectedStack: state.selectedStack,
    getStacks: query => getFilteredStacks(state, query),
    subscribeToResourceChange: () =>
      api.subscribeToResourceChange(state.selectedProject),
    fetchStacks: () =>
      api.get(`projects/${state.selectedProject}/stacks?limit=-1&sort=name`)
  };
};

const mapDispatchToProps = {
  setStacks: actions.setStacks,
  selectStack: actions.selectStack,
  showLoader: actions.showLoader,
  updateService: actions.updateService
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StacksPage);
