export default (user, group) => {
  let maxLatitudeDelta = 0;
  let maxLongitudeDelta = 0;
  group.forEach((member) => {
    const latitudeDelta = Math.abs(member.latitude - user.latitude);
    const longitudeDelta = Math.abs(member.longitude - user.longitude);
    maxLatitudeDelta = maxLatitudeDelta < latitudeDelta ? latitudeDelta : maxLatitudeDelta;
    maxLongitudeDelta = maxLongitudeDelta < longitudeDelta ? longitudeDelta : maxLongitudeDelta;
  });
  maxLongitudeDelta *= 1.1;
  maxLongitudeDelta *= 1.1;
  return { maxLatitudeDelta, maxLongitudeDelta };
};
