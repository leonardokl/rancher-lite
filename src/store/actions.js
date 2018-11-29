import { createActions } from "redux-actions";

export default createActions(
  {
    ADD_SERVER: payload => ({
      ...payload,
      id: Date.now().toString()
    })
  },
  "SHOW_LOADER",
  "HIDE_LOADER",
  "SELECT_SERVER",
  "REMOVE_SERVER",
  "SET_PROJECTS",
  "SELECT_PROJECT",
  "SELECT_DEFAULT_PROJECT",
  "SET_STACKS",
  "SELECT_STACK",
  "SET_SERVICES",
  "SELECT_SERVICE",
  "UPDATE_SERVICE",
  "MANAGE_SERVERS",
  "UPDATE_ADD_SERVER_FORM",
  "RESET_ADD_SERVER_FORM"
);
