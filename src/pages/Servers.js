import React from "react";
import { connect } from "react-redux";
import { Button, Header, Servers } from "../components";
import { actions } from "../store";
import AddServer from "./AddServer";

class ServersPage extends React.Component {
  state = {
    addServer: false
  };

  componentDidMount() {
    const { servers, addServerForm } = this.props;

    if (!servers.length || Object.keys(addServerForm).length) {
      this.setState({ addServer: true });
    }
  }

  render() {
    const { servers, onSelectServer, onRemoveServer } = this.props;

    if (this.state.addServer) {
      return <AddServer onCancel={() => this.setState({ addServer: false })} />;
    }

    return (
      <div>
        <Header>
          <h1>
            Servers{" "}
            <Button
              primary
              content="Add Server"
              size="small"
              onClick={() => this.setState({ addServer: true })}
            />
          </h1>
        </Header>

        <Servers
          data={servers}
          onSelect={server => onSelectServer(server.id)}
          onRemove={server => onRemoveServer(server.id)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  servers: state.servers,
  addServerForm: state.addServerForm
});

const mapDispatchToProps = {
  onSelectServer: actions.selectServer,
  onRemoveServer: actions.removeServer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServersPage);
