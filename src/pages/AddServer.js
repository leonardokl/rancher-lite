import React, { Component } from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import Button from "../components/Button";
import Form from "../components/Form";
import { actions } from "../store";

class AddRancherServer extends Component {
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
        <section className="header clearfix">
          <h1>Add Server</h1>
        </section>

        <section className="container-fluid well">
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
        </section>

        <div className="footer-actions">
          <Button primary loading={submiting} content="Save" />
          <Button type="button" link content="Cancel" onClick={this.handleCancel} />
        </div>
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
)(AddRancherServer);
