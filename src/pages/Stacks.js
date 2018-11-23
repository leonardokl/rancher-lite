import React, { Component } from "react";
import { connect } from "react-redux";
import { getApi } from "../store";
import { actions, getFilteredStacks } from "../store";
import StackCard from "../components/Stack";
import Search from "../components/Search";
import notification from "../utils/notification";
import Stack from "./Stack";

class StacksPage extends Component {
  state = {
    query: ""
  };
  socket = undefined;

  openSocket = () => {
    const { updateService, subscribeToResourceChange } = this.props;

    this.socket = subscribeToResourceChange();

    this.socket.addEventListener("open", function() {
      console.log("Socket opened");
    });

    this.socket.addEventListener("close", function() {
      console.log("Socket closed");
    });

    this.socket.addEventListener("message", function(event) {
      const message = JSON.parse(event.data);
      const { resourceType, name, data } = message;

      if (name === "resource.change" && data && resourceType === "service") {
        const { resource } = data;

        updateService(resource);
      }
    });
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

  handleSearchChange = evt => {
    this.setState({ query: evt.target.value });
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
    const { query } = this.state;
    const stacks = this.getActiveStacks();

    if (selectedStack) {
      return <Stack key={selectedStack} />;
    }

    return (
      <div>
        <section className="header">
          <h1>Stacks</h1>
          <Search
            value={query}
            name="searchStacks"
            key="searchStacks"
            onChange={this.handleSearchChange}
            onKeyDown={this.handleKeyChange}
          />
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
