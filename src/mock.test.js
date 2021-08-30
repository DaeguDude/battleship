import defaultExport, { bar, foo } from "./foo-bar-baz";

jest.mock("./foo-bar-baz", () => {
  const originalModule = jest.requireActual("./foo-bar-baz");

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => "Partially Mocked Baz"),
    foo: "mocked foo",
  };
});

test("should do a partical mock", () => {
  expect(defaultExport()).toBe("Partially Mocked Baz");
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe("mocked foo");
  expect(bar()).toBe("bar");
});
