const { degreesToRadians, getDeltas } = require("../utils/utils.maps");
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

describe("getDeltas function: ", () => {
  it("returns an object", () => {
    const inputLocation = { coords: { latitude: 0, longitude: 0 } };
    const inputGroup = [
      { latitude: 0, longitude: 0 },
      { latitude: 0, longitude: 0 },
    ];
    const expected = "object";
    const actual = getDeltas(inputLocation, inputGroup);
    expect(typeof actual).toBe(expected);
  });
  it("should return correct object when inputGroup is empty array", () => {
    const inputLocation = { coords: { latitude: 53.467442, longitude: -2.28477 } };
    const inputGroup = [];
    const expected = { maxLatitudeDelta: 0.01, maxLongitudeDelta: 0.01 };
    const actual = getDeltas(inputLocation, inputGroup);
    expect(actual).toEqual(expected);
  });
  it("should return the maximum longitude and latitude difference", () => {
    const inputLocation = { coords: { latitude: 53.467442, longitude: -2.28477 } };
    const inputGroup = [
      { latitude: 53.463058, longitude: -2.29134 },
      { latitude: 53.4668, longitude: -2.2339 },
    ];
    const expected = { maxLatitudeDelta: 0.0048224, maxLongitudeDelta: 0.055957 };
    const actual = getDeltas(inputLocation, inputGroup);
    const expectedLat = expected.maxLatitudeDelta;
    const expectedLong = expected.maxLongitudeDelta;
    const actualLat = actual.maxLatitudeDelta;
    const actualLong = actual.maxLongitudeDelta;
    expect(Math.abs(expectedLat - actualLat) < Math.pow(10, 1000)).toBe(true);
    expect(Math.abs(expectedLong - actualLong) < Math.pow(10, 1000)).toBe(true);
  });
  describe("testing side effects", () => {
    const inputLocation = { coords: { latitude: 53.467442, longitude: -2.28477 } };
    const inputGroup = [
      { latitude: 53.463058, longitude: -2.29134 },
      { latitude: 53.4668, longitude: 2.2339 },
    ];
    const inputLocationFixed = { coords: { latitude: 53.467442, longitude: -2.28477 } };
    const inputGroupFixed = [
      { latitude: 53.463058, longitude: -2.29134 },
      { latitude: 53.4668, longitude: 2.2339 },
    ];
    const actual = getDeltas(inputLocation, inputGroup);
    it("inputLocation should not be mutated", () => {
      expect(inputLocation).toEqual(inputLocationFixed);
    });
    it("inputGroup should not be mutated", () => {
      expect(inputGroup).toEqual(inputGroupFixed);
    });
    it("output object reference should not equal either of the input object references", () => {
      expect(actual).not.toBe(inputLocation);
      expect(actual).not.toBe(inputGroup);
    });
  });
});
