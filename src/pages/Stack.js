import debounce from "lodash/debounce";
import sortBy from "lodash/sortBy";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Header, Search } from "../components";
import {
  actions,
  getApi,
  getFilteredServices,
  getSelectedStack
} from "../store";
import notification from "../utils/notification";
import Service from "./Service";

class StackPage extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const { fetchServices, setServices, showLoader } = this.props;

    showLoader();

    fetchServices()
      .then(({ data }) => setServices(sortBy(data, "name")))
      .catch(ex => {
        setServices([]);
        notification.error(ex.message);
      });
  }

  search = debounce(query => {
    this.setState({ query });
  }, 100);

  handleSearchChange = evt => {
    this.search(evt.target.value);
  };

  selectService = stack => {
    this.props.selectService(stack.id);
    this.setState({ query: "" });
  };

  createServiceClickHandles = service => () => {
    this.selectService(service);
  };

  getActiveServices = () => {
    const { getServices } = this.props;
    const { query } = this.state;
    const services = getServices(query);

    return services;
  };

  handleKeyChange = ({ key }) => {
    const { query } = this.state;
    const services = this.getActiveServices();

    if (key === "Enter" && query && services.length) {
      this.selectService(services[0]);
    }
  };

  render() {
    const { stack, selectStack, selectedService } = this.props;
    const services = this.getActiveServices();

    if (selectedService) {
      return <Service key={selectedService} />;
    }

    return (
      <div>
        <Header>
          <h1>
            <a href="#" onClick={() => selectStack(null)}>
              Stack:{" "}
            </a>
            <span style={{ fontSize: 15 }}>{stack.name}</span>
          </h1>
          <Search
            name="searchServices"
            key="searchServices"
            onChange={this.handleSearchChange}
            onKeyPress={this.handleKeyChange}
          />
        </Header>

        <Card.Group>
          {services.map(service => (
            <Card
              name={service.name}
              onClick={this.createServiceClickHandles(service)}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const stack = getSelectedStack(state);

  return {
    stack,
    selectedService: state.selectedService,
    services: state.services,
    getServices: query => getFilteredServices(state, query),
    fetchServices: () =>
      getApi(state).get(
        `projects/${state.selectedProject}/stacks/${
          stack.id
        }/services?limit=-1&sort=name`
      )
  };
};

const mapDispatchToProps = {
  setServices: actions.setServices,
  selectStack: actions.selectStack,
  selectService: actions.selectService,
  showLoader: actions.showLoader,
  hideLoader: actions.hideLoader
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StackPage);
