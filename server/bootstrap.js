Meteor.startup(function () {
  // Toggle this for new data.
  var reseedDatabase = false;

  if ( reseedDatabase ) {

    Sales.remove({});

    locations = [
      "Hoofddorp",
      "Amsterdam Centrum",
      "Amsterdam Westerpark",
      "Amsterdam Zuidoost",
      "Utrecht Centrum",
      "Utrecht Jaarbeurs",
      "Rotterdam",
      "Eindhoven",
      "Tilburg",
      "Enschede",
      "Zwolle",
      "Groningen",
      "Nijmegen",
      "Alkmaar",
      "Almere",
      "Amersfoort",
      "Arnhem",
      "Den Bosch",
      "Den Haag",
      "Den Haag Consumentenbond",
      "Haarlem",
      "Leeuwarden",
      "Leiden",
      "Maastricht"
    ]

    details = [];

    _( _.range(1, 201) ).each( function (recruiter_nr) {
      var recruiter = "Recruiter-" + recruiter_nr;
      var location = locations[ _.random(locations.length - 1)];

      details.push([recruiter, location]);
    });

    _( _.range(1, 53) ).each( function (week_nr) {
      _(details).each( function (detail){
        earnings = _.random(10, 250);

        Sales.insert({
          recruiter: detail[0],
          location: detail[1],
          week: week_nr,
          amount: earnings,
          profit: earnings - (earnings * _.random(0.1, 1.2))
        });
      });
    });
  }
});