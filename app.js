console.log("javascript loaded");

$('document').ready( function () {
  console.log("jquery loaded, document ready");

  $('.generate').on('click', generateProject);

  $('.assign').on('click', assignStaff);

  $('.time').on('click', estimateTime);

});

var possibleCompanies = ["acme", "general", "industries", "solutions", "electrical", "horses", "enterprises", "intrepid", "empire"];

var possibleProjectVerbs = ["eat", "direct", "activate", "dynamicize", "interface", "facilitate", "analyze", "barbeque", "detonate"];

var possibleProjectNouns = ["files", "clients", "reports", "expectations", "goals", "services", "administrators", "profits", "investments"];

var companyName;

var projectName;

var fePtsTotal;
var csPtsTotal;
var ssPtsTotal;

var totalStaff = [];

var feStaff = [testStaff1];
var csStaff = [testStaff3];
var ssStaff = [testStaff2];

var timeEstimate;

var testStaff1 = {
  name: "jimmy john",
  skill: "fe",
  pts: 8,
}

var testStaff2 = {
  name: "wendys",
  skill: "ss",
  pts: 4,
}

var testStaff3 = {
  name: "wendys",
  skill: "cs",
  pts: 4,
}

function generateProject() {
  console.log("generateProject ran");

  //TODO a function here that resets the dom so you can startover


  //this sets the global company name variable to a random company name
  generateCompany();
  console.log(companyName);

  //this sets the global project name variable to a random project name
  generateProjectName();
  console.log(projectName);

  //this sets the three global pt total variables to random numbers
  generateProjectPts();
  console.log("front end ", fePtsTotal, "\n",
              "client side ", csPtsTotal, "\n",
              "server side ", ssPtsTotal
  );

  //TODO create the rest of the page except for assign staff button
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function generateCompany() {
  companyName = possibleCompanies[randomNumber(0, possibleCompanies.length - 1)];
  companyName += " " + possibleCompanies[randomNumber(0, possibleCompanies.length - 1)];
}

function generateProjectName() {
  projectName = possibleProjectVerbs[randomNumber(0, possibleProjectVerbs.length - 1)];
  projectName += " " + possibleProjectNouns[randomNumber(0, possibleProjectNouns.length - 1)];
}

function generateProjectPts() {
  fePtsTotal = randomNumber(10, 60);
  csPtsTotal = randomNumber(10, 60);
  ssPtsTotal = randomNumber(10, 60);
}

function assignStaff() {
  console.log("assign staff ran");

  //first we go get a staff person and return that object
  var temp = getStaff();

  //then we look at the object and sort it into an array based on its skill
  if (temp.skill == "fe") {
    feStaff.push(temp);
  } else if (temp.skill == "cs") {
    csStaff.push(temp);
  } else if (temp.skill == "ss") {
    ssStaff.push(temp);
  }

  console.log("front end staff: ", feStaff, "\n",
              "client side staff: ", csStaff, "\n",
              "server side staff ", ssStaff);

  //then we look at all of the arrays, if one of them is empty, we go get a staff person
  if (feStaff.length == 0 || csStaff.length == 0 || ssStaff.length == 0) {
    assignStaff();
  }
  estimateTime();
}

function getStaff() {
  $.ajax( {
    type: "GET",
    url: "/staff",
    success: function(data){
      return data;
    }
  });
}

function estimateTime() {
  var feEstimate =  fePtsTotal / sumStaffPts(feStaff) ;
  var csEstimate = csPtsTotal / sumStaffPts(csStaff);
  var ssEstimate = ssPtsTotal / sumStaffPts(ssStaff);

  if (feEstimate > csEstimate && feEstimate > ssEstimate) {
    timeEstimate = feEestimate;
  } else if (csEstimate > feEstimate && csEstimate > ssEstimate ) {
    timeEstimate = csEstimate;
  } else if (ssEstimate > feEstimate && ssEstimate > csEstimate) {
    timeEstimate = ssEstimate;
  }

  //end by appending timeEstimate to the dom
}

function sumStaffPts(array) {
  for (var i = 0; i < array.length; i++) {
    var departmentCapacity;
    departmentCapacity += array[i].pts;
  }
  return departmentCapacity;
}
