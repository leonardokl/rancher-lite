import React, { Component } from "react";
import { connect } from "react-redux";
import sortBy from "lodash/sortBy";
import { getApi } from "../store";
import { actions, getSelectedStack, getFilteredServices } from "../store";
import Card from "../components/Stack";
import Search from "../components/Search";
import Service from "./Service";

class Stack extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const { fetchServices, setServices, showLoader, hideLoader } = this.props;

    showLoader();

    fetchServices()
      .then(({ data }) => setServices(sortBy(data, "name")))
      .catch(() => setServices([]))
      .then(hideLoader);
  }

  handleSearchChange = evt => {
    this.setState({ query: evt.target.value });
  };

  createServiceClickHandles = service => () => {
    this.props.selectService(service.id);
    this.setState({ query: "" });
  };

  render() {
    const { stack, selectStack, selectedService, getServices } = this.props;
    const { query } = this.state;
    const services = getServices(query);

    if (selectedService) {
      return <Service key={selectedService} />;
    }

    return (
      <div>
        <section className="header">
          <h1>
            <a href="#" onClick={() => selectStack(null)}>
              Stack:{" "}
            </a>
            <span style={{ fontSize: 15 }}>{stack.name}</span>
          </h1>
          <Search value={query} onChange={this.handleSearchChange} />
        </section>
        <section className="stacks-wrap r-pl0 r-pr0">
          {services.map(service => (
            <Card
              data={service}
              onClick={this.createServiceClickHandles(service)}
            />
          ))}
        </section>
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
)(Stack);
