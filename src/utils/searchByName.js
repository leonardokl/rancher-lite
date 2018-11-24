import Fuse from "fuse.js";

function searchByName(list, query) {
  const fuse = new Fuse(list, { keys: ["name"] });

  return fuse.search(query);
}

export default searchByName;
