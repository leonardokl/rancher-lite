import React, { Component } from "react";
import { connect } from "react-redux";
import startCase from "lodash/startCase";
import cn from "classnames";
import Button from "../components/Button";
import Info from "../components/Info";
import Icon from "../components/Icon";
import {
  actions,
  getSelectedStack,
  getSelectedService,
  getApi
} from "../store";
import notification from "../utils/notification";
import { getImage, getImageTag } from "../utils/service";
import UpgradeService from "./UpgradeService";

class ServicePage extends Component {
  state = {
    loading: false,
    showUpgradePage: false
  };

  handleRestart = () => {
    this.setState({ loading: true });

    this.props
      .restart()
      .then(service => {
        this.props.updateService(service);
      })
      .catch(ex => notification.error(ex.message))
      .then(() => {
        this.setState({ loading: false });
      });
  };

  handleFinishUpgrade = () => {
    this.setState({ loading: true });

    this.props
      .finishUpgrade()
      .then(service => {
        this.props.updateService(service);
      })
      .catch(ex => notification.error(ex.message))
      .then(() => {
        this.setState({ loading: false });
      });
  };

  handleUpgrade = () => {
    this.setState({ showUpgradePage: true });
  };

  renderStateIcon = () => {
    const { service } = this.props;
    const icons = {
      upgraded: "arrow-circle-up",
      inactive: "circle"
    };
    const name = icons[service.state] || "services";

    return <Icon name={name} />;
  };

  render() {
    const { stack, service, selectService } = this.props;
    const { loading, showUpgradePage } = this.state;
    const image = getImage(service);

    if (showUpgradePage) {
      return (
        <UpgradeService
          onCancel={() => this.setState({ showUpgradePage: false })}
        />
      );
    }

    return (
      <div>
        <section className="header">
          <h1>
            <a href="#" onClick={() => selectService(null)}>
              Service:{" "}
            </a>
            <span style={{ fontSize: 15 }}>{service.name}</span>
          </h1>
          <div className="pull-right">
            <div className="btn-group resource-actions action-menu r-ml5 pull-right">
              {!!service.actions.upgrade && service.kind === "service" && (
                <Button
                  content="Upgrade"
                  basic
                  size="small"
                  loading={loading}
                  onClick={this.handleUpgrade}
                />
              )}
              {!!service.actions.restart && (
                <Button
                  content="Restart"
                  basic
                  size="small"
                  loading={loading}
                  onClick={this.handleRestart}
                />
              )}
              {!!service.actions.finishupgrade && (
                <Button
                  content="Finish Upgrade"
                  basic
                  size="small"
                  loading={loading}
                  onClick={this.handleFinishUpgrade}
                />
              )}
            </div>
            <div
              className={cn("header-state section r-mt5 pull-right", {
                "text-success": service.state === "active",
                "text-info":
                  service.state !== "active" && service.state !== "inactive",
                "text-danger": service.state === "inactive"
              })}
              style={{ marginLeft: 0 }}
            >
              {this.renderStateIcon()} {startCase(service.state)}
            </div>
          </div>
        </section>
        <section>
          <Info label="Stack" value={stack.name} />
          {!!image && (
            <React.Fragment>
              <hr />
              <Info label="Image:" value={image} />
              <hr />
              <Info label="Tag:" value={getImageTag(service)} />
            </React.Fragment>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const stack = getSelectedStack(state);
  const service = getSelectedService(state);
  const api = getApi(state);

  return {
    stack,
    service,
    restart: () =>
      api.post(
        `projects/${state.selectedProject}/services/${
          service.id
        }?action=restart`,
        {
          body: JSON.stringify({
            rollingRestartStrategy: {
              batchSize: 1,
              intervalMillis: 2000
            }
          })
        }
      ),
    finishUpgrade: () =>
      api.post(
        `projects/${state.selectedProject}/services/${
          service.id
        }?action=finishupgrade`
      )
  };
};

const mapDispatchToProps = {
  setServices: actions.setServices,
  updateService: actions.updateService,
  selectService: actions.selectService,
  showLoader: actions.showLoader,
  hideLoader: actions.hideLoader
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicePage);
