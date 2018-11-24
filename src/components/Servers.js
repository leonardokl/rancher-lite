import React from "react";
import Button from "./Button";
import Card from "./Card";

const Servers = ({ data, onSelect, onRemove }) => (
  <Card.Group>
    {data.map(server => (
      <Card
        name={server.url}
        onClick={() => onSelect(server)}
        actions={
          <div>
            <Button
              basic
              size="small"
              content="Delete"
              onClick={(evt) => {
                evt.stopPropagation();
                onRemove(server);
              }}
            />
          </div>
        }
      />
    ))}
  </Card.Group>
);

export default Servers;
