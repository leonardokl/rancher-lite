import debounce from "lodash/debounce";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Header, Search } from "../components";
import {
  actions,
  fetchServices,
  getFilteredServices,
  getSelectedStack
} from "../store";
import Service from "./Service";

class StackPage extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const { fetchServices } = this.props;

    fetchServices();
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

const mapStateToProps = state => ({
  stack: getSelectedStack(state),
  selectedService: state.selectedService,
  services: state.services,
  getServices: query => getFilteredServices(state, query)
});

const mapDispatchToProps = {
  fetchServices,
  selectStack: actions.selectStack,
  selectService: actions.selectService,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StackPage);
