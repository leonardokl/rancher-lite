import pick from "lodash/pick";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, FooterActions, Form, Header, Well } from "../components";
import { actions, getApi, getSelectedService } from "../store";
import { getImage } from "../utils/service";

class UpgradeServicePage extends Component {
  state = {
    submiting: false
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { upgrade, service, updateService, onCancel } = this.props;
    const image = evt.target.elements.image.value;
    const isDockerImage = /^docker:/.test(service.launchConfig.imageUuid);
    const imageUuid = isDockerImage ? `docker:${image}` : image;

    this.setState({ submiting: true });

    upgrade(imageUuid)
      .then(service => {
        updateService(service);
        onCancel();
      })
      .catch(ex => {
        this.setState({ submiting: false });
      });
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { service } = this.props;
    const { submiting } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Header content="Upgrade Service" />

        <Well as="section">
          <Form.Input
            label="Select Image"
            name="image"
            autoFocus
            defaultValue={getImage(service)}
            autoComplete="off"
            required
            placeholder="e.g ubuntu:latest"
          />
        </Well>

        <FooterActions>
          <Button primary loading={submiting} content="Upgrade" />
          <Button
            type="button"
            link
            content="Cancel"
            onClick={this.handleCancel}
          />
        </FooterActions>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const service = getSelectedService(state);
  const inServiceStrategy = pick(service.upgrade.inServiceStrategy, [
    "batchSize",
    "intervalMillis",
    "launchConfig",
    "secondaryLaunchConfigs",
    "startFirst"
  ]);

  return {
    service,
    upgrade: imageUuid => {
      const launchConfig = {
        ...inServiceStrategy.launchConfig,
        imageUuid
      };

      return getApi(state).post(
        `projects/${state.selectedProject}/services/${
          state.selectedService
        }?action=upgrade`,
        {
          body: JSON.stringify({
            inServiceStrategy: { ...inServiceStrategy, launchConfig }
          })
        }
      );
    }
  };
};

export default connect(
  mapStateToProps,
  {
    updateService: actions.updateService
  }
)(UpgradeServicePage);
