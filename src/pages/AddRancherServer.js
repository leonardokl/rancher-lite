import React, { Component } from "react";
import { connect } from "react-redux";
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

  render() {
    const { submiting } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <section className="header clearfix">
          <h1>Add Rancher Server</h1>
        </section>

        <section className="container-fluid well">
          <Form.Input
            label="URL"
            name="url"
            autoComplete="off"
            required
            placeholder="e.g https://myrancherserver.com"
          />
          <Form.Input
            label="Access Key"
            name="accessKey"
            autoComplete="off"
            required
            placeholder="See in yor API Key"
          />
          <Form.Input
            label="Secret Key"
            name="secretKey"
            autoComplete="off"
            required
            placeholder="See in yor API Key"
          />
        </section>

        <div className="footer-actions">
          <Button primary loading={submiting} content="Save" />
          {/*<Button type="button" link content="Cancel" />*/}
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  {
    onSubmit: actions.addServer
  }
)(AddRancherServer);
