const fs = require("fs");
const { version } = require("../package.json");
const manifest = require("../public/manifest.json");

const newManifest = { ...manifest, version };

fs.writeFile(
  "public/manifest.json",
  JSON.stringify(newManifest, null, 2),
  err => {
    if (err) throw err;

    console.log("Manifest updated!");
  }
);
