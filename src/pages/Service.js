import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../components/Button";
import Info from "../components/Info";
import {
  actions,
  getSelectedStack,
  getSelectedService,
  getApi
} from "../store";
import notification from "../utils/notification";
import { getImage, getImageTag } from "../utils/service";

class ServicePage extends Component {
  state = {
    loading: false
  };

  handleRestart = () => {
    this.setState({ loading: true });

    this.props
      .restart()
      .then(() => notification.success("The service are restarting"))
      .catch(ex => notification.error(ex.message))
      .then(() => {
        this.setState({ loading: false });
      });
  };

  handleFinishUpgrade = () => {
    this.setState({ loading: true });

    this.props
      .finishUpgrade()
      .then(() => notification.success("The upgrade are being finished"))
      .catch(ex => notification.error(ex.message))
      .then(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { service, selectService } = this.props;
    const { loading } = this.state;
    const image = getImage(service);

    return (
      <div>
        <section className="header">
          <h1>
            <a href="#" onClick={() => selectService(null)}>
              Service:{" "}
            </a>
            <span style={{ fontSize: 15 }}>{service.name}</span>
          </h1>
        </section>
        <section>
          {!!image && (
            <React.Fragment>
              <Info label="Image:" value={image} />
              <hr />
              <Info label="Tag:" value={getImageTag(service)} />
              <hr />
            </React.Fragment>
          )}
          <Info label="State:" value={service.state} />
          <hr />
          <Info label="Type:" value={service.type} />
        </section>
        <div className="footer-actions">
          {!!service.actions.restart && (
            <Button
              content="Restart"
              loading={loading}
              onClick={this.handleRestart}
            />
          )}
          {!!service.actions.finishupgrade && (
            <Button
              content="Finish Upgrade"
              loading={loading}
              onClick={this.handleFinishUpgrade}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const stack = getSelectedStack(state);
  const service = getSelectedService(state);

  return {
    stack,
    service,
    restart: () =>
      getApi(state).post(
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
      getApi(state).post(
        `projects/${state.selectedProject}/services/${
          service.id
        }?action=finishupgrade`
      )
  };
};

const mapDispatchToProps = {
  setServices: actions.setServices,
  selectService: actions.selectService,
  showLoader: actions.showLoader,
  hideLoader: actions.hideLoader
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicePage);
