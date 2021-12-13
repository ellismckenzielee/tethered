const { degreesToRadians } = require("../utils/utils.maps");
describe("degreesToRadians function: ", () => {
  it("returns a number", () => {
    const input = 0;
    const expected = "number";
    const actual = degreesToRadians(input);
    expect(typeof actual).toBe(expected);
  });
  it("returns 0 radians when passed 0 degrees", () => {
    const input = 0;
    const expected = 0;
    const actual = degreesToRadians(input);
    expect(actual).toBe(expected);
  });
  it("returns correct value when passed a  negative angle", () => {
    const input = -20;
    const expected = -0.3491;
    const actual = degreesToRadians(input);
    expect(Math.round(10000 * actual) / 10000).toBe(expected);
  });
  it("returns correct value in radians when passed any input angle in degrees", () => {
    let input = 90;
    let expected = 1.5708;
    let actual = degreesToRadians(input);
    expect(Math.round(10000 * actual) / 10000).toBe(expected);

    input = 180;
    expected = 3.1416;
    actual = degreesToRadians(input);
    expect(Math.round(10000 * actual) / 10000).toBe(expected);

    input = 54;
    expected = 0.9425;
    actual = degreesToRadians(input);
    expect(Math.round(10000 * actual) / 10000).toBe(expected);
  });
});
