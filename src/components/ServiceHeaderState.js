import React from "react";
import startCase from "lodash/startCase";
import cn from "classnames";
import Icon from "./Icon";

function getServiceClass(service) {
  const classes = {
    active: "text-success",
    inactive: "text-danger"
  };

  if (service.transitioning === "yes") {
    return "text-info";
  }

  if (service.healthState === "initializing") {
    return "text-warning";
  }

  return classes[service.state] || "text-info";
}

function getServiceIconName(service) {
  const icons = {
    upgraded: "arrow-circle-up",
    active: "services"
  };

  if (service.transitioning === "yes") {
    return "spinner icon-spin";
  }

  if (service.healthState === "initializing") {
    return "alert";
  }

  return icons[service.state] || "circle";
}

function getServiceState(service) {
  if (
    service.transitioning === "no" &&
    service.healthState === "initializing"
  ) {
    return "Initializing";
  }

  return startCase(service.state);
}

const ServiceHeaderState = ({ service }) => (
  <div
    className={cn("header-state section r-mt5 pull-right", {
      [getServiceClass(service)]: true
    })}
    style={{ marginLeft: 0 }}
  >
    <Icon name={getServiceIconName(service)} /> {getServiceState(service)}
  </div>
);

export default ServiceHeaderState;
