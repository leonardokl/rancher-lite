import React, { Component } from "react";
import cn from "classnames";

class Dropdown extends Component {
  state = {
    active: false
  };

  handleMouseEnter = () => {
    this.setState({ active: true });
  };

  handleMouseLeave = () => {
    this.setState({ active: false });
  };

  render() {
    const { options, value, main, placeholder, dividerOption } = this.props;
    const { active } = this.state;
    const selectedOption = options.find(option => option.value === value);

    return (
      <li
        className={cn("btn dropdown r-p0", { "project-btn": main })}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <a
          href="#"
          role="button"
          className={"btn btn-link dropdown-toggle text-left"}
          aria-label="Environment"
          style={{ minWidth: 90 }}
        >
          <span className="clip">
            {selectedOption ? selectedOption.text : placeholder}
          </span>
          {" "}
          <i className="icon icon-chevron-down project-chevron" />
          <span className="sr-only">Toggle Dropdown</span>
        </a>
        <ul
          className={cn("dropdown-menu dropdown-menu-right project-menu", {
            block: active
          })}
          role="menu"
          data-dropdown-id="enviroment"
        >
          {options.map(option => (
            <li
              key={option.value}
              className={cn("", {
                active: option.value === value,
                selected: option.value === value
              })}
              onClick={evt => {
                this.setState({ active: false }, () => {
                  this.props.onChange(evt, option);
                });
              }}
            >
              <a href="#" className="clip">
                {option.text}
              </a>
            </li>
          ))}
          {dividerOption && (
            <React.Fragment>
              <li className="divider" />
              <li
                className={cn("", {
                  active: dividerOption.value === value,
                  selected: dividerOption.value === value
                })}
                onClick={evt => {
                  this.setState({ active: false }, () => {
                    this.props.onChange(evt, dividerOption);
                  });
                }}
              >
                <a href="#" className="clip">
                  {dividerOption.text}
                </a>
              </li>
            </React.Fragment>
          )}
        </ul>
      </li>
    );
  }
}

export default Dropdown;
