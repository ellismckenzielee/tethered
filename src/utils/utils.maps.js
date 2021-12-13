export const getDeltas = (location, group) => {
  /*calculates max long/lat deltas required to show all markers on map component*/
  let maxLatitudeDelta = 0;
  let maxLongitudeDelta = 0;

  group.forEach((member) => {
    const latitudeDelta = Math.abs(member.latitude - location.coords.latitude);
    const longitudeDelta = Math.abs(member.longitude - location.coords.longitude);
    maxLatitudeDelta = maxLatitudeDelta < latitudeDelta ? latitudeDelta : maxLatitudeDelta;
    maxLongitudeDelta = maxLongitudeDelta < longitudeDelta ? longitudeDelta : maxLongitudeDelta;
  });
  maxLatitudeDelta *= 1.1;
  maxLongitudeDelta *= 1.1;
  return { maxLatitudeDelta, maxLongitudeDelta };
};

export const findMaximumDistance = (location, group) => {
  /* calculates the maximum distance between current user and 
  other member of the group */
  const distanceArray = group.map((member) => {
    console.log("MEMBER", member);
    return getDistance(location, member);
  });
  console.log(Math.max(...distanceArray));
  return Math.max(...distanceArray);
};
export const getDistance = (user, member) => {
  /*calculates distance between two users using haversine formula*/
  const radius = 6371;
  const { latitude: userLat, longitude: userLong } = user;
  const { latitude: memberLat, longitude: memberLong } = member;
  const userLatRad = degreesToRadians(userLat);
  const userLongRad = degreesToRadians(userLong);
  const memberLatRad = degreesToRadians(memberLat);
  const memberLongRad = degreesToRadians(memberLong);
  const latDifference = userLatRad - memberLatRad;
  const longDifference = userLongRad - memberLongRad;

  // Haversine Formula
  const a = Math.sin(latDifference / 2) * Math.sin(latDifference / 2) + Math.cos(userLatRad) * Math.cos(memberLatRad) * Math.sin(longDifference / 2) * Math.sin(longDifference / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in km
  const distance = radius * c;
  return distance;
};

export const degreesToRadians = (degrees) => {
  /*convert degrees to radians */
  return (Math.PI * degrees) / 180;
};

export const isLimitExceeded = (maxLimit, location, group) => {
  const maxDistance = findMaximumDistance(location, group);
  return maxDistance <= maxLimit ? false : true;
};
