import React, { Component } from "react";
import cn from "classnames";

class Dropdown extends Component {
  state = {
    active: false
  };
  button = React.createRef();
  items = [];
  focusedItemIndex = undefined;

  handleMouseEnter = () => {
    this.setState({ active: true });
  };

  handleMouseLeave = () => {
    this.setState({ active: false });
  };

  manageFocus = () => {
    const { options, value, dividerOption } = this.props;
    const { active } = this.state;
    const activeIndex = [...options, dividerOption]
      .filter(Boolean)
      .findIndex(i => i.value === value);

    if (active && activeIndex !== -1) {
      this.focusedItemIndex = activeIndex;
      this.items[activeIndex].focus();
    }
  };

  handleButtonClick = async () => {
    const { active } = this.state;

    await this.setState({ active: !active });

    this.manageFocus();
  };

  execKeyAction = key => {
    const keyAction = {
      Tab: () => this.setState({ active: false }),
      Escape: () => {
        this.setState({ active: false });
        this.button.current.focus();
      },
      ArrowDown: () => {
        if (this.items.length) {
          const item = this.items[this.focusedItemIndex + 1] || this.items[0];

          item.focus();
        }
      },
      ArrowUp: () => {
        if (this.items.length) {
          const item =
            this.items[this.focusedItemIndex - 1] ||
            this.items[this.items.length - 1];

          item.focus();
        }
      }
    };

    const action = keyAction[key] || function() {};

    action();
  };

  handleKeyDown = async (evt) => {
    if(!this.state.active && evt.key === 'ArrowDown') {
      evt.preventDefault();
      await this.setState({ active: true });
      return this.manageFocus();
    } else if (!this.state.active) return;

    const preventDefault = {
      Escape: true,
      ArrowDown: true,
      ArrowUp: true
    };

    if (preventDefault[evt.key]) {
      evt.preventDefault();
    }

    this.execKeyAction(evt.key);
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
          ref={this.button}
          href="#"
          role="button"
          className={"btn btn-link dropdown-toggle text-left"}
          aria-label={placeholder}
          style={{ minWidth: 90 }}
          onClick={this.handleButtonClick}
          onKeyDown={this.handleKeyDown}
        >
          <span className="clip">
            {selectedOption ? selectedOption.text : placeholder}
          </span>{" "}
          <i className="icon icon-chevron-down project-chevron" />
          <span className="sr-only">Toggle Dropdown</span>
        </a>
        <ul
          className={cn("dropdown-menu dropdown-menu-right project-menu", {
            block: active
          })}
          role="menu"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className={cn("", {
                active: option.value === value,
                selected: option.value === value
              })}
            >
              <a
                href="#"
                className="clip"
                ref={node => {
                  this.items[index] = node;
                }}
                onKeyDown={this.handleKeyDown}
                tabIndex={-1}
                onClick={evt => {
                  this.setState({ active: false }, () => {
                    this.props.onChange(evt, option);
                  });
                }}
                onFocus={() => (this.focusedItemIndex = index)}
              >
                {option.text}
              </a>
            </li>
          ))}
          {dividerOption && (
            <React.Fragment>
              <li className="divider" role="presentation" />
              <li
                className={cn("", {
                  active: dividerOption.value === value,
                  selected: dividerOption.value === value
                })}
              >
                <a
                  href="#"
                  className="clip"
                  tabIndex={-1}
                  ref={node => {
                    this.items[options.length] = node;
                  }}
                  onClick={evt => {
                    this.setState({ active: false }, () => {
                      this.props.onChange(evt, dividerOption);
                    });
                  }}
                  onKeyDown={this.handleKeyDown}
                  onFocus={() => (this.focusedItemIndex = options.length)}
                >
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
