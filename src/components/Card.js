import React from "react";
import Button from "./Button";

const styles = {
  stackLink: { display: "flex", justifyContent: "space-between" },
  a: {
    overflow: "hidden"
  }
};

const Card = ({ name, actions, onClick }) => (
  <div className="stack-section" style={{ overflow: "hidden" }}>
    <div className="well r-p0 r-m0">
      <div className="header-left " style={{ marginLeft: 10, float: "none" }}>
        <h4 className="divider clip stack-link" style={styles.stackLink}>
          <a
            href="#"
            tabIndex={0}
            style={styles.a}
            title={name}
            onClick={onClick}
          >
            {name}
          </a>
          {actions}
        </h4>
      </div>
    </div>
  </div>
);

const CardGroup = ({ children }) => (
  <section className="stacks-wrap r-pl0 r-pr0">{children}</section>
);

Card.Group = CardGroup;

export default Card;
