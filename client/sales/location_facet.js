Template.facets.locations = function () {
  return _.uniq( _( Template.facets.sales() ).pluck("location") );    
};

Template.facets.locationsWithoutResults = function () {
  var allLocations = _.uniq(_(Sales.find({}).fetch()).pluck("location"));
  return _.difference(allLocations, Template.facets.locations());    
};

Template.facets.isLocationChecked = function () {
  var isChecked = _.contains(Session.get('locations'), this.toString());
  if (isChecked){ return "checked" }
};