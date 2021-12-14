import routes from "./routes.js";
import { updateLocation } from "./firestoreDatabaseUtils.jsx";
function spoofLocation(data, interval, username, tripId) {
  let i = 0;
  setInterval(() => {
    if (i < data.length) {
      updateLocation(username, tripId, data[i][0], data[i][1]);
      i++;
    } else {
      clearInterval();
    }
  }, interval);
}

export default { spoofLocation, routes };
