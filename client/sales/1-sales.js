Sales = new Meteor.Collection("sales");

Template.facets.sales = function () {
  var selectors = {};

  if ( Session.get('recruiters') ) {
    selectors["recruiter"] = { $in: Session.get('recruiters') }
  }

  if ( Session.get('locations') ) {
    selectors["location"] = { $in: Session.get('locations') }
  }

  return Sales.find(selectors).fetch();
};

Template.facets.events({
  "change .recruiters-facet": function () {
    recruiters = _.map( $('.recruiters-facet:checked'), function(elem){
      return $(elem).val();
    });

    if (recruiters.length > 0) {
      Session.set("recruiters", recruiters);
    } else {
      Session.set("recruiters", null);
    }
  },
  "change .locations-facet": function () {
    locations = _.map( $('.locations-facet:checked'), function(elem){
      return $(elem).val();
    });

    if (locations.length > 0) {
      Session.set("locations", locations);
    } else {
      Session.set("locations", null);
    }
  }
});

Template.table.results = function () {
  var sales = Template.facets.sales();

  // Reduce sales grouped by day:
  var per_week = _.groupBy(sales, function(s){return s.week});
  var results = _.map(per_week, function(x){
    return {
      week: _(x).first().week,
      amount: _.reduce(x, function(memo, num){ return memo + num.amount; }, 0).toFixed(2),
      profit: _.reduce(x, function(memo, num){ return memo + num.profit; }, 0).toFixed(2)
    }
  });

  return results;
}