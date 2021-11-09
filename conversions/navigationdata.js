
module.exports = (app, plugin) => {
  return [{
    pgn: 129283,
    title: 'Cross Track Error (129283)',
    optionKey: 'xte',
    keys: [
      'navigation.courseRhumbline.crossTrackError'
    ],
    callback: (XTE) => [{
      pgn: 129283,
      XTE,
      "XTE mode": "Autonomous",
      "Navigation Terminated": "No"
    }]
  }, {
    pgn: 129284,
    title: 'Navigation Data (129284)',
    optionKey: 'navigationdata',
    keys: [
      'navigation.courseGreatCircle.nextPoint.distance',
      'navigation.courseGreatCircle.nextPoint.bearingTrue',
      'navigation.courseGreatCircle.nextPoint.estimatedTimeOfArrival',
      'navigation.courseGreatCircle.bearingTrackTrue',
      'navigation.courseGreatCircle.nextPoint.position',
      'navigation.courseGreatCircle.nextPoint.velocityMadeGood'
    ],
    timeouts: [
      10000, 10000, 10000, 10000, 30000, 10000
    ],
    callback: (distToDest, bearingToDest, eta, bearingOriginToDest, dest, vmg) => {
      
      /*app.debug(dest);
      app.debug(distToDest);
      app.debug(bearingToDest);
      app.debug(eta);
      app.debug(bearingOriginToDest);
      app.debug(vmg);*/

      if (eta !== null) {
        var etaDate = Math.trunc((eta.getTime() / 1000) / 86400);
        var etaTime = (eta.getUTCHours() * (60 * 60) +
          eta.getUTCMinutes() * 60 +
          eta.getUTCSeconds()) % 86400;
      };

      return [{
        pgn: 129284,
        "SID" : 0x88,
        "Distance to Waypoint" :  distToDest,
        "Course/Bearing reference" : 0,       //True
        "Perpendicular Crossed" : 0,          //No
        "Arrival Circle Entered" : 0,         //No
        "Calculation Type" : 0,               //Great Circle
        "ETA Time" : eta === null ? undefined : etaTime,
        "ETA Date": eta === null ? undefined : etaDate,
        "Bearing, Origin to Destination Waypoint" : bearingOriginToDest,
        "Bearing, Position to Destination Waypoint" : bearingToDest,
        "Origin Waypoint Number" : undefined,
        "Destination Waypoint Number" : undefined,
        "Destination Latitude" : dest === null ? undefined : dest.latitude,
        "Destination Longitude" : dest === null ? undefined : dest.longitude,
        "Waypoint Closing Velocity" : vmg,
      }]
    }
  }]
}
