Template.facets.recruiters = function () {
  return _.uniq( _( Template.facets.sales() ).pluck("recruiter") );
};

Template.facets.recruitersWithoutResults = function () {
  var allRecruiters = _.uniq(_(Sales.find({}).fetch()).pluck("recruiter"));
  return _.difference(allRecruiters, Template.facets.recruiters());    
};

Template.facets.isRecruiterChecked = function () {
  var isChecked = _.contains(Session.get('recruiters'), this.toString());
  if (isChecked){ return "checked" }
};