import React, { Component } from "react";
import { connect } from "react-redux";
import sortBy from "lodash/sortBy";
import { getApi } from "../store";
import { actions, getSelectedStack } from "../store";
import Card from "../components/Stack";
import Service from "./Service";

class Stack extends Component {
  componentDidMount() {
    const { fetchServices, setServices, showLoader, hideLoader } = this.props;

    showLoader();

    fetchServices()
      .then(({ data }) => setServices(sortBy(data, "name")))
      .catch(() => setServices([]))
      .then(hideLoader);
  }

  render() {
    const {
      stack,
      services,
      selectService,
      selectStack,
      selectedService
    } = this.props;

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
        </section>
        <section className="stacks-wrap r-pl0 r-pr0">
          {services.map(service => (
            <Card data={service} onClick={() => selectService(service.id)} />
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
