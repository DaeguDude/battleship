import { forEach } from "./mock";

test("mock", () => {
  const myMock = jest.fn((name) => {
    return `Hey ${name}! How have you been dude?`;
  });

  forEach(["Sanghak", "Dooheum", "Tim"], myMock);
  console.log(myMock.mock.calls);

  // Check how many times it has been called
  expect(myMock.mock.calls.length).toBe(3);

  // Check the argument of each call
  expect(myMock.mock.calls[0][0]).toBe("Sanghak");
  expect(myMock.mock.calls[1][0]).toBe("Dooheum");

  // Check the return value of the function call
  expect(myMock.mock.results[1].value).toBe(
    "Hey Dooheum! How have you been dude?"
  );
  expect(myMock.mock.results[2].value).toBe("Hey Tim! How have you been dude?");
});

// .mock property
