import filterServiceChange from "../filterServiceChange";

it("calls the callback with the filtered event resource", () => {
  const spy = jest.fn();
  const event = {
    data: `{
      "name": "resource.change",
      "resourceType": "service",
      "data": { "resource": true }
    }`
  };

  filterServiceChange(spy)(event);

  expect(spy).toBeCalledWith(true);

  spy.mockRestore();
});

it("doesn't calls the callback with the event resource", () => {
  const spy = jest.fn();
  const filter = filterServiceChange(spy);

  filter({
    data: `{
      "name": "resource.change",
      "resourceType": "project",
      "data": { "resource": true }
    }`
  });

  filter({
    data: `{
      "name": "resource.create",
      "resourceType": "service",
      "data": { "resource": true }
    }`
  });

  filter({
    data: `{
      "name": "resource.change",
      "resourceType": "service",
    }`
  });

  expect(spy).toBeCalledTimes(0);

  spy.mockRestore();
});