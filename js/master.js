//business logic
var warningArray = [];
var symptomArray =[];
var copingArray = [];

function Test(warnings, symptoms, coping) {
  debugger;
  this.warnings = warnings;
  this.symptoms = symptoms;
  this.coping = coping;
};

Test.prototype.Results = function () {
  debugger;
  var warningsTotal = 0;
  var symptomsTotal = 0;
  var copingTotal = 0;

  var warnings = this.warnings.map(Number);
  for (var i = 0; i < warnings.length; i++) {
    warningsTotal += warnings[i];
  }

  var symptoms = this.symptoms.map(Number);
  for (var i = 0; i < symptoms.length; i++) {
    symptomsTotal += symptoms[i];
  }

  var coping = this.coping.map(Number);
  for (var i = 0; i < coping.length; i++) {
    copingTotal += coping[i];
  }

  if (warningsTotal + symptomsTotal <= 3) {
    return "no stress"
  } else if (warningsTotal + symptomsTotal > 3 && warningsTotal + symptomsTotal <= 10) {
    return "slightly stressed"
  } else if (warningsTotal + symptomsTotal > 10 && copingTotal < 5) {
    return "stress"
  } else if (warningsTotal + symptomsTotal > 10 && copingTotal >= 5) {
    return "coping"
  }
};

//UI logic
$(document).ready(function() {
  $("form#warning-signs").submit(function() {
    event.preventDefault();
    $("#warning-signs").hide();
    $("#symptoms").show();
    $("input:checkbox[name=warning-signs]:checked").each(function () {
      warningArray.push($(this).val());
    });
    $("form#symptoms").submit(function () {
      event.preventDefault();
      $("#symptoms").hide();
      $("#coping").show();
      $("input:checkbox[name=symptoms]:checked").each(function() {
        symptomArray.push($(this).val());
      });
      $("form#coping").submit(function() {
        event.preventDefault();
        $("#coping").hide();
        $("input:checkbox[name=coping]:checked").each(function() {
          copingArray.push($(this).val());
        });
        var stressTest = new Test (warningArray, symptomArray, copingArray);
        debugger;
        var results = stressTest.Results();
        if (results === "no stress") {
          $("#no-stress-results").show();
        } else if (results === "slightly stressed") {
          $("#slight-stress-results").show();
        } else if (results === "stress") {
          $("#stress-results").show();
        } else if (results === "coping") {
          $("#coping-results").show();
        }
        $("#reset").show();
        $("#reset").click(function() {
          location.reload();
        });
      });
    });
  });
});
