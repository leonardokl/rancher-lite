import searchByName from "../searchByName";

it("filter a list given a name", () => {
  const list = [{ name: "sentry" }, { name: "jira" }];
  const actual = searchByName(list, "sentry");
  const expected = list.slice(0, 1);

  expect(actual).toEqual(expected);
});
