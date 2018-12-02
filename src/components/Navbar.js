import React from "react";
import Dropdown from "./Dropdown";

const Navbar = ({
  projects,
  servers,
  selectedProject,
  selectedServer,
  onServerChange,
  onProjectChange
}) => (
  <header>
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <ul className="nav">
            <Dropdown
              placeholder="Servers"
              main
              value={selectedServer}
              options={servers.map(server => ({
                value: server.id,
                text: server.url
              }))}
              dividerOption={{
                value: "",
                text: "Manage Servers"
              }}
              onChange={onServerChange}
            />
            {!!projects.length && (
              <Dropdown
                placeholder="Environments"
                value={selectedProject}
                options={projects.map(project => ({
                  value: project._id,
                  text: project.name
                }))}
                onChange={onProjectChange}
              />
            )}
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
