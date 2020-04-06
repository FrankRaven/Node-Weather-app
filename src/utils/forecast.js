const request = require("request");

const forecast = (lat, log, callback) => {
  const url =
    "https://api.darksky.net/forecast/9140cd08cc6e6ceaf5799a793d4a236f/" +
    log +
    "," +
    lat +
    "?units=si";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Go play the dinosaur game as Internet is not available",
        undefined
      );
    } else if (body.error) {
      callback("Coordinate error: Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain. Today's temperature high is " +
          body.daily.data[0].temperatureHigh +
          " and today's low is " +
          body.daily.data[0].temperatureLow
      );
    }
  });
};

module.exports = forecast;
