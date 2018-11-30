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

  cards = [];
  activeCardIndex = undefined;

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
    this.props.selectService(stack._id);
    this.setState({ query: "" });
    this.activeCardIndex = undefined;
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

  handleKeyChange = evt => {
    const { query } = this.state;
    const services = this.getActiveServices();

    if (evt.key === "Enter" && query && services.length) {
      this.selectService(services[0]);
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
    const { stack, selectStack, selectedService } = this.props;
    const services = this.getActiveServices();

    this.cards = [];
  
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
            onKeyDown={this.handleKeyChange}
          />
        </Header>

        <Card.Group>
          {services.map((service, index) => (
            <Card
              ref={node => {
                this.cards[index] = node;
              }}
              name={service.name}
              onClick={this.createServiceClickHandles(service)}
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
  stack: getSelectedStack(state),
  selectedService: state.selectedService,
  services: state.services,
  getServices: query => getFilteredServices(state, query)
});

const mapDispatchToProps = {
  fetchServices,
  selectStack: actions.selectStack,
  selectService: actions.selectService
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StackPage);
