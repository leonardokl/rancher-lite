const shell = require("shelljs");

if (shell.exec("zip -r build.zip build").code !== 0) {
  shell.echo("Error: Zip failed");
  shell.exit(1);
}
