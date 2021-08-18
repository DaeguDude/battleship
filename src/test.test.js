beforeAll(() => {
  const myBoy = "Sanghak";
});

afterAll(() => {
  console.log("Runs once after all test");
});

test.only("test1", () => {
  console.log("test1");
});

test("test2", () => {
  console.log("test2");
});

test("test3", () => {
  console.log("test2");
});
