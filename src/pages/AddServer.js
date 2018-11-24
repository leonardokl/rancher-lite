import debounce from "lodash/debounce";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, FooterActions, Form, Header, Well } from "../components";
import { actions } from "../store";

class AddRancherServerPage extends Component {
  state = {
    submiting: false
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    const {
      target: { elements }
    } = evt;

    this.setState({ submiting: true });

    onSubmit({
      url: elements.url.value,
      accessKey: elements.accessKey.value,
      secretKey: elements.secretKey.value
    });
  };

  debouncedUpdate = debounce(data => {
    this.props.updateAddServerForm(data);
  }, 300);

  handleInputChange = ({ target }) => {
    this.debouncedUpdate({
      [target.name]: target.value
    });
  };

  handleCancel = () => {
    this.props.resetAddServerForm();
    this.props.onCancel();
  };

  render() {
    const { addServerForm } = this.props;
    const { submiting } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Header content="Add Server" />

        <Well as="section">
          <Form.Input
            label="URL"
            name="url"
            defaultValue={addServerForm.url}
            autoComplete="off"
            required
            placeholder="e.g https://myrancherserver.com"
            onChange={this.handleInputChange}
          />
          <Form.Input
            label="Access Key"
            name="accessKey"
            defaultValue={addServerForm.accessKey}
            autoComplete="off"
            required
            placeholder="See in yor API Key"
            onChange={this.handleInputChange}
          />
          <Form.Input
            label="Secret Key"
            name="secretKey"
            defaultValue={addServerForm.secretKey}
            autoComplete="off"
            required
            placeholder="See in yor API Key"
            onChange={this.handleInputChange}
          />
        </Well>

        <FooterActions>
          <Button primary loading={submiting} content="Save" />
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
  addServerForm: state.addServerForm
});

export default connect(
  mapStateToProps,
  {
    onSubmit: actions.addServer,
    updateAddServerForm: actions.updateAddServerForm,
    resetAddServerForm: actions.resetAddServerForm
  }
)(AddRancherServerPage);
