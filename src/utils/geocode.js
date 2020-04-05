const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) + //we use encodeURIComponent to convert special characters to string so that the api understands the address
    ".json?access_token=pk.eyJ1IjoiZnJhbmtyYXZlbiIsImEiOiJjazhsbTBvNGswZTl0M2hwenNneHB2MmF2In0.uZsjXwbElx7Dc7yRLCaTUg&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to connect to geolocation", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
