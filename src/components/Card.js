import React from "react";

const styles = {
  stackLink: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%"
  },
  a: {
    overflow: "hidden",
    lineHeight: "20px"
  }
};

class Card extends React.Component {
  static defaultProps = {
    onKeyDown: function(){},
    onFocus: function(){},
  };

  card = React.createRef();

  focus = () => {
    this.card.current.focus();
  };

  render() {
    const { name, actions, onClick, onKeyDown, onFocus } = this.props;

    return (
      <div className="stack-section" style={{ overflow: "hidden" }}>
        <div
          ref={this.card}
          className="card well r-p0 r-m0"
          tabIndex={0}
          style={{ cursor: "pointer" }}
          role="button"
          onClick={onClick}
          onKeyDown={evt => {
            if (evt.key === "Enter") onClick();
            else onKeyDown(evt);
          }}
          onFocus={onFocus}
        >
          <div
            className="header-left "
            style={{ marginLeft: 10, float: "none" }}
          >
            <h4 className="divider clip stack-link" style={styles.stackLink}>
              <span href="#" style={styles.a} title={name} onClick={onClick}>
                {name}
              </span>
              {actions}
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

const CardGroup = ({ children }) => (
  <section className="stacks-wrap r-pl0 r-pr0">{children}</section>
);

Card.Group = CardGroup;

export default Card;
