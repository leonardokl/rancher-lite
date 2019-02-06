import getUserPreference from "../getUserPreference";

const userPreferences = {
  data: [{
    name: 'defaultProjectId',
    value: '"1a5"'
  }]
};

it("returns a parsed value given a name", () => {
  const actual = getUserPreference(userPreferences, "defaultProjectId");
  const expected = "1a5";

  expect(actual).toBe(expected);
});

it("returns undefined when the the name is not found", () => {
  const actual = getUserPreference(userPreferences, "test");
  const expected = undefined;

  expect(actual).toBe(expected);
});