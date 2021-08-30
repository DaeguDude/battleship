test("", () => {
  const myMock = jest.fn().mockName("a mock name");

  myMock(1, 2);

  expect(myMock).toHaveBeenCalled();
  expect(myMock.mock.calls.length).toBeGreaterThan(0);

  expect(myMock).toHaveBeenCalledWith(1, 2);
  expect(myMock.mock.calls).toContainEqual([1, 2]);

  expect(myMock).toHaveBeenLastCalledWith(1, 2);
  expect(myMock.mock.calls[myMock.mock.calls.length - 1]).toEqual([1, 2]);

  expect(myMock.mock.calls[myMock.mock.calls.length - 1][0]).toBe(1);

  expect(myMock.mock.calls).toEqual([[1, 2]]);
  expect(myMock.getMockName()).toBe("a mock name");
});
