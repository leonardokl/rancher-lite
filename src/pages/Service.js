import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Info, ServiceHeaderState } from "../components";
import {
  actions,
  getSelectedService,
  getSelectedStack,
  restartService,
  finishServiceUpgrade
} from "../store";
import { getImage, getImageTag } from "../utils/service";
import UpgradeService from "./UpgradeService";

class ServicePage extends Component {
  state = {
    loading: false,
    showUpgradePage: false
  };

  handleRestart = async () => {
    this.setState({ loading: true });

    await this.props.restartService();
    this.setState({ loading: false });
  };

  handleFinishUpgrade = async () => {
    this.setState({ loading: true });

    await this.props.finishServiceUpgrade();
    this.setState({ loading: false });
  };

  handleUpgrade = () => {
    this.setState({ showUpgradePage: true });
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
        <Header>
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
            <ServiceHeaderState service={service} />
          </div>
        </Header>
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

const mapStateToProps = state => ({
  stack: getSelectedStack(state),
  service: getSelectedService(state)
});

const mapDispatchToProps = {
  restartService,
  finishServiceUpgrade,
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
