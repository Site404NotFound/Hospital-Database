
// Below code segments were obtained from the Week 7 Lecture Content
var mysql = require('./dbcon.js');
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended:true}));
app.set('port', 3738);                                  // Using port 3738 for my flip3 address
app.use(express.static('views'));
app.set('mysql', mysql);

app.get('/', function(req, res){
  // var context = {};
  // callbackCount = 0;
  // var mysql = req.app.get('mysql');
  // selectPatients(req, res, mysql, context, complete);
  // selectDoctors(req, res, mysql, context, complete);
  // selectDepartments(req, res, mysql, context, complete);
  // selectSpecialty(req, res, mysql, context, complete);
  // selectDiagnosis(req, res, mysql, context, complete);
  // selectAddresses(req, res, mysql, context, complete);
  // function complete(){
  //     callbackCount++;
  //     if(callbackCount >= 6){
  //       console.log(context);
          res.render('hospital');
  //     }
  // }
});

app.get('/query', function(req, res){
  console.log("ENTERED query GET Route");
  var context = {};
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  selectDoctors(req, res, mysql, context, complete);
  selectDepartments(req, res, mysql, context, complete);
  selectDiagnosis(req, res, mysql, context, complete);
  selectAddresses(req, res, mysql, context, complete);
  selectZips(req, res, mysql, context, complete);
  selectSpecialty(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 6){
          res.render('query', context);
      }
  }
});

app.post('/specialtysearch', function(req, res){
  var context = {};
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  specialtysearch(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
        console.log(context);
          res.render('specialty_search', context);
      }
  }
});

app.post('/zipcodesearch', function(req, res){
  var context = {};
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  zipcodesearch(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
        console.log(context);
          res.render('zip_search', context);
      }
  }
});

app.post('/greaterseverity', function(req, res){
  var context = {};
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  greaterSeveritySearch(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
        console.log(context);
          res.render('greaterseverity_search', context);
      }
  }
});

app.post('/lesserseverity', function(req, res){
  var context = {};
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  lesserSeveritySearch(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
        console.log(context);
          res.render('lesserseverity_search', context);
      }
  }
});

app.post('/doctorcount', function(req, res){
  var context = {};
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  doctordepartsearch(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
        console.log(context);
          res.render('doctorcount_search', context);
      }
  }
});

app.post('/patientcount', function(req, res){
  var context = {};
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  patientdepartsearch(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
        console.log(context);
          res.render('patientcount_search', context);
      }
  }
});

function patientdepartsearch (req, res, mysql, context, complete) {
  sql = "SELECT department.name AS 'Department_Name', COUNT(*) AS 'Patients_Admitted' FROM patients JOIN department ON patients.department_id = department.did WHERE department.did = ?;";
var inserts = [req.body.patient_department_count];
  mysql.pool.query(sql, inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.patientdepart_search = rows;
      console.log(rows);
      complete ();
  });
}

function doctordepartsearch (req, res, mysql, context, complete) {
  sql = "SELECT department.name AS 'Department_Name', COUNT(*) AS 'Doctors_Staffed' FROM doctors JOIN department ON doctors.department_id = department.did WHERE department.did = ?;";
var inserts = [req.body.doctor_department_count];
  mysql.pool.query(sql, inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.doctordepart_search = rows;
      console.log(rows);
      complete ();
  });
}



function lesserSeveritySearch (req, res, mysql, context, complete) {
  sql = 'SELECT p.first_name, p.last_name, d.severity FROM patients p JOIN diagnosis d ON p.diagnosis_id = d.diid WHERE d.severity < ?;';
var inserts = [req.body.lesser_severity];
  mysql.pool.query(sql, inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.severityNumber = req.body.lesser_severity;
      context.lesser_severity_search = rows;
      console.log(rows);
      complete ();
  });
}

function greaterSeveritySearch (req, res, mysql, context, complete) {
  sql = 'SELECT p.first_name, p.last_name, d.severity FROM patients p JOIN diagnosis d ON p.diagnosis_id = d.diid WHERE d.severity > ?;';
var inserts = [req.body.greater_severity];
  mysql.pool.query(sql, inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.severityNumber = req.body.greater_severity;
      context.greater_severity_search = rows;
      console.log(rows);
      complete ();
  });
}

function specialtysearch (req, res, mysql, context, complete) {
  sql = 'SELECT d.first_name, d.last_name, s.name FROM doctors d JOIN doctor_specialty ds ON d.eid = ds.eid JOIN specialty s ON ds.sid = s.sid WHERE s.name = ?;';
  var inserts = [req.body.specialty];
  mysql.pool.query(sql, inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.specialty_input = req.body.specialty;
      context.doctor_specialty = rows;
      console.log(rows);
      complete ();
  });
}

function zipcodesearch (req, res, mysql, context, complete) {
  sql = 'SELECT p.first_name, p.last_name, a.zip FROM patients p JOIN address a ON p.address_id = a.aid WHERE a.zip = ?;';
  var inserts = [req.body.zipcode];
  mysql.pool.query(sql, inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.zip_input = req.body.zipcode;
      context.zipcode_patient = rows;
      console.log(rows);
      complete ();
  });
}

function selectZips(req, res, mysql, context, complete) {
  sql = mysql.pool.query('SELECT DISTINCT `zip` FROM `address`;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.zipaddress = rows;
      console.log(rows);
      complete();
  });
}

app.get('/doctors', function(req, res){
  console.log("ENTERED doctors GET Route");
  var context = {};
  console.log(context);
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  selectDoctors(req, res, mysql, context, complete);
  selectDepartments(req, res, mysql, context, complete);
  selectDiagnosis(req, res, mysql, context, complete);
  selectAddresses(req, res, mysql, context, complete);
  selectSpecialty(req, res, mysql, context, complete);
  superDoctorSelect(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 6){
        console.log("DISPLAYING CONTEXT OBJECT CONTENTS");
        console.log(context);
          res.render('doctors', context);
      }
  }
});

app.post('/doctors', function(req, res){
  console.log("ENTERED doctors POST route");
  // var context = {};

  callbackCount = 0;
  var mysql = req.app.get('mysql');
  console.log(req.body.specialty);
  insertDoctors(req, res, mysql, complete);
  insertSepcialtyDoctor(req, res, mysql, complete);
  // insertAddress(req, res, mysql, complete);
  // insertDepartment(req, res, mysql, complete);
  // insertSpecialty(req, res, mysql, complete);
  // insertDoctors(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 2){
          res.redirect('/doctors');
      }
  }
});

// app.get('/patients', function(req, res){
//
//   var context = {};
//   mysql.pool.query('SELECT patients.pid, patients.first_name, patients.last_name, patients.middle_name, patients.dob, patients.phone, patients.insurance, doctors.eid, address.streetNum, address.streetName, address.unit, address.zip, address.city, address.state, doctors.last_name, department.name, diagnosis.name FROM patients INNER JOIN address ON patients.address_id = address.aid INNER JOIN doctors ON patients.doctor_id = doctors.eid INNER JOIN department ON patients.department_id = department.did INNER JOIN diagnosis ON patients.diagnosis_id = diagnosis.diid;', function(err, rows, fields){
//     if(err){
//       next(err);
//       return;
//     }
//       context.patients = rows;
//       console.log(rows);
//       res.render('patients', context);
//   });
// });
app.get('/patients', function(req, res){
  console.log("Entered patients GET route");
  var context = {};
  console.log(context);
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  selectPatients(req, res, mysql, context, complete);
  selectDoctors(req, res, mysql, context, complete);
  selectDepartments(req, res, mysql, context, complete);
  selectDiagnosis(req, res, mysql, context, complete);
  selectAddresses(req, res, mysql, context, complete);
  superPatientSelect(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 6){
        console.log("DISPLAYING CONTEXT OBJECT CONTENTS");
        console.log(context);
          res.render('patients', context);
      }
  }
});

app.post('/patients', function(req, res){
  console.log("Entered patients GET route");
  var context = {};
  console.log(context);
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  selectPatients(req, res, mysql, context, complete);
  selectDoctors(req, res, mysql, context, complete);
  selectDepartments(req, res, mysql, context, complete);
  selectDiagnosis(req, res, mysql, context, complete);
  selectAddresses(req, res, mysql, context, complete);
  superPatientSelect(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 6){
        console.log("DISPLAYING CONTEXT OBJECT CONTENTS");
        console.log(context);
          res.render('patients', context);
      }
  }
});
// app.post('/patients', function(req, res){
//   console.log("Entered Patients POST route");
//   console.log(context);
//   callbackCount = 0;
//   var mysql = req.app.get('mysql');
//   selectPatients(req, res, mysql, context, complete);
//   selectDoctors(req, res, mysql, context, complete);
//   selectDepartments(req, res, mysql, context, complete);
//   selectSpecialty(req, res, mysql, context, complete);
//   selectDiagnosis(req, res, mysql, context, complete);
//   selectAddresses(req, res, mysql, context, complete);
//   function complete(){
//       callbackCount++;
//       if(callbackCount >= 4){
//           res.redirect('/patients');
//       }
//   }
// });

app.get('/departments', function(req, res){
  var context = {};
  mysql.pool.query('SELECT did, name FROM department', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.departments = rows;
      console.log(rows);
      res.render('departments', context);
  });
});
app.post('/departments', function(req, res){
  var context = {};
  mysql.pool.query('SELECT did, name FROM department', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.departments = rows;
      console.log(rows);
      res.render('departments', context);
  });
});


app.get('/specialty', function(req, res){
  var context = {};
  console.log("Entered specialty GET route");
  console.log(context);
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  selectDoctors(req, res, mysql, context, complete);
  selectSpecialty(req, res, mysql, context, complete);
  docspectable(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 3){
          res.render('specialty', context);
      }
  }
});

function docspectable (req, res, mysql, context, complete) {
  console.log("Entered docspectable function");
  sql = mysql.pool.query('SELECT d.first_name, d.last_name, s.name, ds.dsid FROM doctors d JOIN doctor_specialty ds ON d.eid = ds.eid JOIN specialty s ON ds.sid = s.sid ORDER BY d.last_name DESC;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.docspectable = rows;
      console.log(rows);
      complete ();
  });
}

app.post('/doctorspecialty', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = 'INSERT INTO doctor_specialty (eid, sid) VALUES (?, ?)';
    var inserts = [req.body.docspec, req.body.specdoc];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
           res.redirect('specialty');
        }
    });
});
// app.get('/specialty', function(req, res){
//   var context = {};
//   mysql.pool.query('SELECT sid, name FROM specialty', function(err, rows, fields){
//     if(err){
//       next(err);
//       return;
//     }
//       context.specialty = rows;
//       console.log(rows);
//       res.render('specialty', context);
//   });
// });

app.post('/specialty', function(req, res){
  var context = {};
  mysql.pool.query('SELECT sid, name FROM specialty', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.specialty = rows;
      console.log(rows);
      res.render('specialty', context);
  });
});

app.get('/addresses', function(req, res){
  var context = {};
  mysql.pool.query('SELECT aid, streetNum, streetName, unit, city, state, zip FROM address;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.addresses = rows;
      console.log(rows);
      res.render('addresses', context);
  });
});

app.post('/addresses', function(req, res){
  var context = {};
  mysql.pool.query('SELECT aid, streetNum, streetName, unit, city, state, zip FROM address;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.addresses = rows;
      console.log(rows);
      res.render('addresses', context);
  });
});

app.get('/diagnosis', function(req, res){
  var context = {};
  mysql.pool.query('SELECT diid, name, severity FROM diagnosis', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.diagnosis = rows;
      console.log(rows);
      res.render('diagnosis', context);
  });
});

app.post('/diagnosis', function(req, res){
  var context = {};
  mysql.pool.query('SELECT diid, diagnosisName, severity FROM diagnosis', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.diagnosis = rows;
      console.log(rows);
      res.render('diagnosis', context);
  });
});


app.post('/addressinserts', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = 'INSERT INTO address (streetNum, streetName, unit, city, state, zip) VALUES (?, ?, ?, ?, ?, ?)';
    var inserts = [req.body.street_number, req.body.street_name, req.body.unit,req.body.city,req.body.state,req.body.zip];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
           res.redirect('addresses');
        }
    });
});

app.post('/patientinserts', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = 'INSERT INTO patients (first_name, last_name, middle_name, dob, phone, insurance, address_id, doctor_id, department_id, diagnosis_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var inserts = [req.body.first_name,req.body.last_name,req.body.middle_name,req.body.dob,req.body.phone,req.body.insurance,req.body.address,req.body.doctor,req.body.department,req.body.diagnosis];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
          res.redirect('patients');
        }
    });
});

app.get('/deletepatient:pid', function(req, res){
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  deletePatients(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('patients');
      }
  }
});

app.get('/deleteds:dsid', function(req, res){
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  deleteDS(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('specialty');
      }
  }
});

app.get('/deletedoctor:eid', function(req, res){
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  deleteDoctors(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('doctors');
      }
  }
});


app.post('/departmentinserts', function(req, res){
    var mysql = req.app.get('mysql');
    var departmentSQL = 'INSERT INTO department (name) VALUES (?)';
    var inserts = [req.body.department_name];
    departmentSQL = mysql.pool.query(departmentSQL,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
           res.redirect('departments');
        }
    });
});

app.post('/specialtyinsert', function(req, res){
    var mysql = req.app.get('mysql');
    var specialtySQL = 'INSERT INTO specialty (name) VALUES (?)';
    var inserts = [req.body.specialty_name];
    specialtySQL = mysql.pool.query(specialtySQL,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('specialty');
        }
    });
});

app.post('/diagnosisinsert', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = 'INSERT INTO diagnosis (name, severity) VALUES (?,?)';
    var inserts = [req.body.diagnosis_name, req.body.severity];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('diagnosis');
        }
    });
});


//
// app.get('/doctors:eid', function(req, res){
//   console.log("ENTERED doctor GET UPDATE Route");
//   var context = {};
//   var sql = 'SELECT doctors.eid, doctors.last_name, doctors.first_name, doctors.middle_name, doctors.phone, address.streetNum, address.streetName, address.unit, address.zip, address.city, address.state, department.name AS depart, specialty.name AS special FROM doctors LEFT JOIN address ON doctors.address_id = address.aid LEFT JOIN department ON doctors.department_id = department.did LEFT JOIN doctor_specialty ON doctors.eid = doctor_specialty.eid LEFT JOIN specialty ON specialty.sid = doctor_specialty.sid WHERE doctors.eid = ?;';
//   var trim = req.params.eid.replace(/(^:)|(,$)/g, "")   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
//   var inserts = [trim];
//   console.log(trim);
//   mysql.pool.query(sql, inserts, function(err, rows, fields){
//
//   if(err){
//       next(err);
//       return;
//     }
//       context.doctors = rows;
//       console.log(rows);
//       res.render('update_doctors', context);
//   });
// });

app.get('/doctors:eid', function(req, res){
  console.log("ENTERED doctors GET Route");
  var context = {};
  console.log(context);
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  conditionalDoctorSelect(req, res, mysql, context, complete);
  conditionalSpecialtySelect(req, res, mysql, context, complete);
  selectDepartments(req, res, mysql, context, complete);
  selectDiagnosis(req, res, mysql, context, complete);
  selectAddresses(req, res, mysql, context, complete);
  selectSpecialty(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 6){
        console.log("DISPLAYING CONTEXT OBJECT CONTENTS");
        console.log(context);
          res.render('update_doctors', context);
      }
  }
});

app.post('/doctors:eid', function(req, res){
  console.log("ENTERDED doctor POST UPDATE Route");
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  // updateAddress(req, res, mysql, complete);
  // updateDepartment(req, res, mysql, complete);
  // updateSpecialty(req, res, mysql, complete);
  disableConstraints(req, res, mysql, complete);
  updateDoctors(req, res, mysql, complete);
  enableConstraints(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 3){
          res.redirect('/doctors');
      }
  }
});

app.get('/addresses:aid', function(req, res){
  var context = {};
  var sql = 'SELECT aid, streetNum, streetName, unit, city, state, zip FROM address WHERE aid = ?;';
  var trim = req.params.aid.replace(/(^:)|(,$)/g, "")   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  console.log(trim);
  mysql.pool.query(sql, inserts, function(err, rows, fields){

  if(err){
      next(err);
      return;
    }
      context.addresses = rows;
      console.log(rows);
      res.render('update_address', context);
  });
});

app.post('/addresses:aid', function(req, res){
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  updateAddress(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('addresses');
      }
  }
});

app.get('/deleteaddr:aid', function(req, res){
  console.log("Testing");
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  deleteAddress(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('addresses');
      }
  }
});

app.get('/departments:did', function(req, res){
  var context = {};
  var sql = 'SELECT did, name FROM department WHERE did = ?;';
  var trim = req.params.did.replace(/(^:)|(,$)/g, "")   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  console.log(trim);
  mysql.pool.query(sql, inserts, function(err, rows, fields){

  if(err){
      next(err);
      return;
    }
      context.departments = rows;
      console.log(rows);
      res.render('update_departments', context);
  });
});

app.post('/departments:did', function(req, res){
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  updateDepartment(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('departments');
      }
  }
});

app.get('/deletedepart:did', function(req, res){
  console.log("Testing");
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  deleteDepartment(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('departments');
      }
  }
});

app.get('/specialty:sid', function(req, res){
  var context = {};
  var sql = 'SELECT sid, name FROM specialty WHERE sid = ?;';
  var trim = req.params.sid.replace(/(^:)|(,$)/g, "")   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  console.log(trim);
  mysql.pool.query(sql, inserts, function(err, rows, fields){

  if(err){
      next(err);
      return;
    }
      context.specialty = rows;
      console.log(rows);
      res.render('update_specialty', context);
  });
});

app.post('/specialty:sid', function(req, res){
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  updateSpecialty(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('specialty');
      }
  }
})

app.get('/deletespec:sid', function(req, res){
  console.log("Testing");
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  deleteSpecialty(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('specialty');
      }
  }
});

app.get('/diagnosis:diid', function(req, res){
  console.log("ENTERED diagnosis:diid GET Route");
  var context = {};
  var sql = 'SELECT diid, name, severity FROM diagnosis WHERE diid = ?;';
  var trim = req.params.diid.replace(/(^:)|(,$)/g, "")   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  console.log(trim);
  mysql.pool.query(sql, inserts, function(err, rows, fields){

  if(err){
      next(err);
      return;
    }
      context.diagnosis = rows;
      console.log(rows);
      res.render('update_diagnosis', context);
  });
});

app.post('/diagnosis:diid', function(req, res){
  console.log("ENTERED diagnosis:diid POST Route");
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  updateDiagnosis(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('diagnosis');
      }
  }
});

app.get('/patients:pid', function(req, res){

  callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');
  conditionalPatientSelect(req, res, mysql, context, complete);
  selectDoctors(req, res, mysql, context, complete);
  selectDepartments(req, res, mysql, context, complete);
  selectDiagnosis(req, res, mysql, context, complete);
  selectAddresses(req, res, mysql, context, complete);
  console.log('PATIENTS PID IN GET ROUTE = ' + req.params.pid);
  function complete(){
      callbackCount++;
      if(callbackCount >= 5){
        // console.log("DISPLAYING CONTEXT BEFORE ENTERING UPDATE PAGE");
        // console.log(context);
          res.render('update_patients', context);
      }
  }
});

app.post('/patients:pid', function(req, res){
  console.log("ENTERED patients:pid POST Route");
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  disableConstraints(req, res, mysql, complete);
  updatePatients(req, res, mysql, complete);
  enableConstraints(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 3){
          res.redirect('patients');
      }
  }
});

function conditionalDoctorSelect(req, res, mysql, context, complete) {
  console.log("ENTERING conditionalDoctorSelect");
  var trim = req.params.eid.replace(/(^:)|(,$)/g, "")   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  var sql = 'SELECT eid, last_name, first_name, middle_name, phone, address_id, department_id FROM doctors WHERE eid = ?;'
mysql.pool.query(sql, inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.doctors = rows;
      console.log(rows);
      complete();
  });
}

function conditionalPatientSelect(req, res, mysql, context, complete) {
  console.log("ENTERING conditionalPatientSelect");
  var trim = req.params.pid.replace(/(^:)|(,$)/g, "")   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  var sql = 'SELECT pid, last_name, first_name, middle_name, DATE_FORMAT(`dob`,"%Y-%m-%d") AS birth, doctor_id, department_id, diagnosis_id, insurance, address_id, phone FROM patients WHERE pid = ?;'
mysql.pool.query(sql, inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.patients = rows;
      console.log(rows);
      complete();
  });
}

function conditionalSpecialtySelect(req, res, mysql, context, complete) {
  console.log("ENTERING conditionalSpecialtySelect");
  var trim = req.params.eid.replace(/(^:)|(,$)/g, "")   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  var sql = 'SELECT sid FROM doctor_specialty WHERE eid = ? LIMIT 1;'
mysql.pool.query(sql, inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.specialty_select = rows;
      console.log(rows);
      complete();
  });
}

// app.post('/update_patients:pid', function(req, res){
//   callbackCount = 0;
//   var mysql = req.app.get('mysql');
//   updatePatients(req, res, mysql, complete);
//   function complete(){
//       callbackCount++;
//       if(callbackCount >= 1){
//           res.redirect('patients');
//       }
//   }
// });

app.get('/deletediags:diid', function(req, res){
  console.log("Testing");
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  deleteDiagnosis(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('diagnosis');
      }
  }
});

function selectAddresses(req, res, mysql, context, complete) {
  sql = mysql.pool.query('SELECT aid, streetNum, streetName, unit, city, state, zip FROM address;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.addresses = rows;
      console.log(rows);
      complete();
  });
}

function superDoctorSelect(req, res, mysql, context, complete) {
  sql = mysql.pool.query('SELECT doctors.eid, doctors.last_name, doctors.first_name, doctors.middle_name, doctors.phone, address.streetNum, address.streetName, address.unit, address.zip, address.city, address.state, department.name AS depart FROM doctors LEFT JOIN address ON doctors.address_id = address.aid LEFT JOIN department ON doctors.department_id = department.did;', function(err, rows, fields){
  // sql = mysql.pool.query('SELECT doctors.eid, doctors.last_name, doctors.first_name, doctors.middle_name, doctors.phone, address.streetNum, address.streetName, address.unit, address.zip, address.city, address.state, department.name AS depart, specialty.name AS special FROM doctors LEFT JOIN address ON doctors.address_id = address.aid LEFT JOIN department ON doctors.department_id = department.did LEFT JOIN doctor_specialty ON doctors.eid = doctor_specialty.eid LEFT JOIN specialty ON specialty.sid = doctor_specialty.sid;', function(err, rows, fields){
  // sql = mysql.pool.query('SELECT doctors.eid, doctors.first_name, doctors.last_name, doctors.middle_name, doctors.phone, address.streetNum, address.streetName, address.unit, address.zip, address.city, address.state, department.name AS department, specialty.name AS specialty FROM doctors LEFT JOIN address ON doctors.address_id = address.aid LEFT JOIN department ON doctors.department_id = department.did LEFT OUTER JOIN doctor_specialty ON doctors.eid = doctor_specialty.eid LEFT OUTER JOIN specialty ON specialty.sid = doctor_specialty.sid;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.superDoc = rows;
      console.log("DISPLAYING SUPERDOC DETAILS FOR TABLE CREATION");
      console.log(rows);
      complete();
  });
}

function superPatientSelect(req, res, mysql, context, complete) {
  sql = mysql.pool.query('SELECT patients.pid, patients.first_name, patients.last_name, patients.middle_name, DATE_FORMAT(patients.dob,"%Y-%m-%d") AS birth, patients.phone, patients.insurance, address.streetNum, address.streetName, address.unit, address.zip, address.city, address.state, department.name, doctors.first_name AS doctorfirst, doctors.last_name AS doctorlast, department.name AS department, diagnosis.name AS diagnosis FROM `patients` LEFT JOIN address ON patients.address_id = address.aid LEFT JOIN doctors ON patients.doctor_id = doctors.eid LEFT JOIN department ON patients.department_id = department.did LEFT JOIN diagnosis ON patients.diagnosis_id = diagnosis.diid;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.superPatient = rows;
      console.log("DISPLAYING SUPERDOC DETAILS FOR TABLE CREATION");
      console.log(rows);
      complete();
  });
}


function selectPatients(req, res, mysql, context, complete) {
  console.log("Entered selectPatients");
  sql = mysql.pool.query('SELECT `pid`, `first_name`, `last_name`, `middle_name`, DATE_FORMAT(`dob`,"%Y-%m-%d") AS birth, `phone`, `insurance`, `address_id`, `doctor_id`, `department_id`, `diagnosis_id` FROM `patients`;', function(err, rows, fields){
  // sql = mysql.pool.query('SELECT patients.pid, patients.first_name, patients.last_name, patients.middle_name, patients.dob, patients.phone, patients.insurance, doctors.eid, address.streetNum, address.streetName, address.unit, address.zip, address.city, address.state, doctors.last_name, department.name, diagnosis.name FROM patients INNER JOIN address ON patients.address_id = address.aid INNER JOIN doctors ON patients.doctor_id = doctors.eid INNER JOIN department ON patients.department_id = department.did INNER JOIN diagnosis ON patients.diagnosis_id = diagnosis.diid;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.patients = rows;
      console.log(rows);
      complete();
  });
}

function selectDoctors(req, res, mysql, context, complete) {
  console.log("Entered selectDoctors function");
  sql = mysql.pool.query('SELECT eid, last_name, first_name, middle_name, phone, address_id, department_id FROM doctors;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.doctors = rows;
      console.log(rows);
      complete ();
  });
}


function selectDepartments(req, res, mysql, context, complete) {
  console.log("Entered selectDepartments");
  sql = mysql.pool.query('SELECT did, name FROM department;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.departments = rows;
      console.log(rows);
      complete ();
  });
}

function selectSpecialty(req, res, mysql, context, complete) {
  console.log("Entered selectSpecialty");
  sql = mysql.pool.query('SELECT sid, name FROM specialty;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.specialty = rows;
      console.log(rows);
      complete ();
  });
}

function selectDiagnosis(req, res, mysql, context, complete) {
  console.log("Entered selectDiagnosis");
  sql = mysql.pool.query('SELECT diid, name, severity FROM diagnosis;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.diagnosis = rows;
      console.log(rows);
      complete ();
  });
}

function insertDoctors(req, res, mysql, complete) {
  var sql = 'INSERT INTO doctors (first_name, last_name, middle_name, phone, address_id, department_id) VALUES (?,?,?,?,?,?);';
  // var sql = 'INSERT INTO doctors (first_name, last_name, middle_name, phone, address_id, department_id, specialty_id) VALUES (?,?,?,?,(SELECT aid FROM address WHERE  = ? && streetNum = ? && unit = ? && zip = ? && city = ? && state = ? LIMIT 1), (SELECT did FROM department WHERE departmentName = ? LIMIT 1), (SELECT sid FROM specialty WHERE name = ? LIMIT 1))';
  var inserts = [req.body.first_name, req.body.last_name, req.body.middle_name, req.body.phone, req.body.address, req.body.department];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}
function insertSepcialtyDoctor (req, res, mysql, complete){
  console.log("ENTERED insertSpecialtyDoctor Function");
  console.log(req.body.specialty);
  var sql = 'INSERT INTO doctor_specialty (eid, sid) VALUES ((SELECT MAX(eid) FROM doctors), ?);';
  var inserts = [req.body.specialty];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function insertDepartment(req, res, mysql, complete){
  var sql = 'INSERT INTO department (name) VALUES (?)';
  var inserts = [req.body.department_name];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function insertAddress(req, res, mysql, complete){
  // if (req.body.street_number == '0') {
  //   req.body.street_number= null;
  // }
  // if (req.body.unit == '0') {
  //   req.body.unit = null;
  // }
  // if (req.body.zip == '0') {
  //   req.body.zip = null;
  // }

  var sql = 'INSERT INTO address (streetNum, streetName, unit, zip, city, state) VALUES (?,?,?,?,?,?)';
  var inserts = [req.body.street_number, req.body.street_name, req.body.unit, req.body.zip, req.body.city, req.body.state];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function insertSpecialty(req, res, mysql, complete){
  var sql = 'INSERT INTO specialty (name) VALUES (?)';
  var inserts = [req.body.specialty];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function insertDiagnosis(req, res, mysql, complete){
  var sql = 'INSERT INTO diagnosis (name, severity) VALUES (?, ?)';
  var inserts = [req.body.diagnosis, req.body.severity];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function updateAddress(req, res, mysql, complete){
  // if (req.body.street_number == 0) {
  //   req.body.street_number= null;
  // }
  // if (req.body.unit == 0) {
  //   req.body.unit = null;
  // }
  // if (req.body.zip == 0) {
  //   req.body.zip = null;
  // }

  var sql = 'UPDATE `address` SET `streetNum`=?,`streetName`=?,`unit`= ?,`zip`= ? ,`city`= ?,`state`= ? WHERE aid = ?';
  var trim = req.params.aid.replace(/(^:)|(,$)/g, "");
  if (req.body.unit == 0){
    req.body.unit = '';
  }
  var inserts = [req.body.street_number, req.body.street_name, req.body.unit, req.body.zip, req.body.city, req.body.state, trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function updateDepartment(req, res, mysql, complete){

  // var sql = "UPDATE department SET departmentName = '?' WHERE did = ?";
  var sql = "UPDATE `department` SET `name` = ? WHERE did = ?";
  var trim = req.params.did.replace(/(^:)|(,$)/g, "");
  var inserts = [req.body.department_name_update, trim];
  console.log(inserts);
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function updateSpecialty(req, res, mysql, complete){
  var sql = 'UPDATE `specialty` SET `name`=? WHERE sid = ?';
  var trim = req.params.sid.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [req.body.specialty_name_update, trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function updatePatients(req, res, mysql, complete){
  console.log("ENTERED updatePatients FUNCTION");

  if (req.body.address == "") {
    req.body.address = null;
  }
  if (req.body.insurance == "") {
    req.body.insurance = null;
  }
  if (req.body.doctor == "") {
    req.body.doctor = null;
  }
  if (req.body.department == "") {
    req.body.department = null;
  }
  if (req.body.diagnosis == "") {
    req.body.diagnosis = null;
  }

  // var sql = 'UPDATE patients SET first_name = ?, last_name = ?, middle_name =?, last_name = ?, dob = ?, address_id= ?, phone = ? insurance = ?, doctor_id = ?, department_id = ?, diagnosis_id = ? WHERE pid = ?';
  var sql = 'UPDATE patients SET first_name = ?, last_name = ?, middle_name = ?, dob = ?, address_id = ?, phone = ?, insurance = ?, doctor_id = ?, department_id = ?, diagnosis_id = ? WHERE pid = ?;';
  var trim = req.params.pid.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [req.body.first_name, req.body.last_name, req.body.middle_name, req.body.dob, req.body.address, req.body.phone, req.body.insurance, req.body.doctor, req.body.department, req.body.diagnosis, trim];
  console.log('THE PATIENT ID = ' + req.params.pid);
  console.log(inserts);
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function disableConstraints(req, res, mysql, complete){
  var sql = 'SET FOREIGN_KEY_CHECKS=0;';
  sql = mysql.pool.query(sql,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function enableConstraints(req, res, mysql, complete){
  var sql = 'SET FOREIGN_KEY_CHECKS=1';
  sql = mysql.pool.query(sql,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function updateDoctors(req, res, mysql, complete){
  var sql = '  UPDATE `doctors` SET `first_name`= ?, `last_name`= ?, `middle_name`= ?, `phone`= ?, `address_id`= ?, `department_id` = ? WHERE eid = ?';
  var trim = req.params.eid.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [req.body.first_name, req.body.last_name, req.body.middle_name, req.body.phone, req.body.address, req.body.department, trim];
  console.log(inserts);
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function updateDiagnosis(req, res, mysql, complete){
  var sql = 'UPDATE `diagnosis` SET `name`= ?, `severity` = ? WHERE diid = ?';
  var trim = req.params.diid.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [req.body.diagnosis_name, req.body.severity, trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function deletePatients(req, res, mysql, complete) {
    console.log(req.params.pid);
  var sql = 'DELETE FROM `patients` WHERE pid = ?';
  var trim = req.params.pid.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function deleteDS(req, res, mysql, complete) {
    console.log("ENTERED DELETE SPECIALTY FUNCTIONS");
    console.log(req.params);
  var sql = 'DELETE FROM `doctor_specialty` WHERE dsid = ?';
  var trim = req.params.dsid.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function deleteDoctors(req, res, mysql, complete) {
    console.log(req.params.eid);
  var sql = 'DELETE FROM `doctors` WHERE eid = ?';
  var trim = req.params.eid.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function deleteDiagnosis(req, res, mysql, complete) {
    console.log("Hello");
    console.log(req.params.diid);
  var sql = 'DELETE FROM `diagnosis` WHERE diid = ?';
  var trim = req.params.diid.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function deleteAddress(req, res, mysql, complete) {
    console.log("Hello");
    console.log(req.params.aid);
  var sql = 'DELETE FROM `address` WHERE aid = ?';
  var trim = req.params.aid.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function deleteSpecialty(req, res, mysql, complete) {
    console.log("ENTERED DELETE SPECIALTY FUNCTIONS");
    console.log(req.params.sid);
  var sql = 'DELETE FROM `specialty` WHERE sid = ?';
  var trim = req.params.sid.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function deleteDepartment(req, res, mysql, complete) {
    console.log("Hello");
    console.log(req.params.did);
  var sql = 'DELETE FROM `department` WHERE did = ?';
  var trim = req.params.did.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}


// Below code segments were obtained from the Week 7 Lecture Content
// 404 Page not found error handler
app.use(function(req,res){
 res.status(404);
 res.render('404');
});

// 500 Server Error handler
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.type('plain/text');
 res.status(500);
 res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port'));
});
