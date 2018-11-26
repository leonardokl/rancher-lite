import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, FooterActions, Form, Header, Well } from "../components";
import { getSelectedService, upgradeService } from "../store";
import { getImage } from "../utils/service";

class UpgradeServicePage extends Component {
  state = {
    submiting: false
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { upgradeService, onCancel } = this.props;
    const image = evt.target.elements.image.value;
    
    this.setState({ submiting: true });

    upgradeService(image)
      .then(service => {
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

const mapStateToProps = state => ({
  service: getSelectedService(state)
});

export default connect(
  mapStateToProps,
  {
    upgradeService
  }
)(UpgradeServicePage);
