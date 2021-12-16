const { degreesToRadians, getDeltas, getDistance, findMaximumDistance } = require("../utils/utils.maps");
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
    const expected = { maxLatitudeDelta: 0, maxLongitudeDelta: 0 };
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
    expect(Math.abs(expectedLat - actualLat) < Math.pow(10, -3)).toBe(true);
    expect(Math.abs(expectedLong - actualLong) < Math.pow(10, -3)).toBe(true);
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

describe.only("getDistance function: ", () => {
  it.only("returns a number", () => {
    const inputUser = { coords: { latitude: 53.467442, longitude: -2.28477 } };
    const inputOther = { latitude: 53.463058, longitude: -2.29134 };
    const expected = "number";
    const actual = getDistance(inputUser, inputOther);
    expect(typeof actual).toBe(expected);
  });
  it("returns a distance of 0 when the same location is passed twice", () => {
    const inputUser = { coords: { latitude: 53.467442, longitude: -2.28477 } };
    const inputOther = { latitude: 53.467442, longitude: -2.28477 };
    const expected = 0;
    const actual = getDistance(inputUser, inputOther);
    expect(actual).toBe(expected);
  });
  it("returns the correct distance when two different locations are passed", () => {
    let inputUser = { coords: { latitude: 51.510357, longitude: -0.116773 } };
    let inputOther = { latitude: 38.889931, longitude: -77.009003 };
    let expected = 5897.658;
    let actual = getDistance(inputUser, inputOther);
    expect(Math.abs(actual - expected) < Math.pow(10, -3)).toBe(true);

    inputUser = { coords: { latitude: 53.467442, longitude: -2.28477 } };
    inputOther = { latitude: 53.4649, longitude: -2.3488 };
    expected = 4.248;
    actual = getDistance(inputUser, inputOther);
    expect(Math.abs(actual - expected) < Math.pow(10, -3)).toBe(true);
  });
  describe("testing side effects: ", () => {
    const inputUser = { coords: { latitude: 53.467442, longitude: -2.28477 } };
    const inputUserFixed = { coords: { latitude: 53.467442, longitude: -2.28477 } };

    const inputOther = { latitude: 53.4649, longitude: -2.3488 };
    const inputOtherFixed = { latitude: 53.4649, longitude: -2.3488 };
    getDistance(inputUser, inputOther);
    it("inputUser object should not be mutated", () => {
      expect(inputUser).toEqual(inputUserFixed);
    });
    it("inputOther object should not be mutated", () => {
      expect(inputOther).toEqual(inputOtherFixed);
    });
  });
});

describe("findMaximumDistance function", () => {
  it("returns a number", () => {
    const inputUser = { coords: { latitude: 53.467442, longitude: -2.28477 } };
    const inputGroup = [
      { latitude: 53.4649, longitude: -2.3488 },
      { latitude: 38.889931, longitude: -77.009003 },
    ];
    const expected = "number";
    const actual = findMaximumDistance(inputUser, inputGroup);
    expect(typeof actual).toBe(expected);
  });
  it("returns the maximum distance between the user and any other users's location", () => {
    const inputUser = { coords: { latitude: 53.467442, longitude: -2.28477 } };
    const inputGroup = [
      { latitude: 53.4649, longitude: -2.3488 },
      { latitude: 53.467442, longitude: -2.28478 },
    ];
    const expected = 4.247;
    const actual = findMaximumDistance(inputUser, inputGroup);

    expect(Math.abs(actual - expected) < Math.pow(10, -3)).toBe(true);
  });
});
