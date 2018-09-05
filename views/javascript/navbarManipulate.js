document.addEventListener('DOMContentLoaded', changeNavbar);
var url = window.location.href;
var urlstring = String(url);
var navItems = document.getElementsByClassName('nav-item');
// console.log(url);
// console.log((navItems)[0]);

function changeNavbar (){
  var page = '';
  var elementNum = 0;
  if (urlstring === 'http://flip3.engr.oregonstate.edu:3738/') {
    page = 'Main Page';
    elementNum = navItems[0];
  } else if (urlstring === 'http://flip3.engr.oregonstate.edu:3738/patients') {
    page = 'Patients';
    elementNum = navItems[1];

  } else if (urlstring === 'http://flip3.engr.oregonstate.edu:3738/doctors') {
    page =  'Doctors';
    elementNum = navItems[2];

  } else if (urlstring === 'http://flip3.engr.oregonstate.edu:3738/departments') {
    page = 'Departments';
    elementNum = navItems[3];

  } else {
    page = 'Hospital 404';
    elementNum = undefined;
  }

  if (elementNum == undefined) {
    document.title = page;
  } else {
    makeChanges(page, elementNum);
  }
}

function makeChanges (page, elementNum) {
  document.title = page;
  elementNum.classList.toggle("active");
  event.preventDefault();
}
