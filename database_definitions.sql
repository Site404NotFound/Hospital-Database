CREATE TABLE address (
    aid INT NOT NULL AUTO_INCREMENT,
    streetNum INT,
    streetName VARCHAR(255),
    unit INT,
    zip INT,
    city VARCHAR(255),
    state CHAR(2),
    PRIMARY KEY (aid)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE diagnosis (
  diid INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  severity INT NOT NULL,
  PRIMARY KEY (diid)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE specialty (
  sid INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (sid)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE department (
  did INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (did)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE doctors (
    eid INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    phone CHAR(10) NOT NULL,
    address_id INT NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (eid),
    FOREIGN KEY (address_id) REFERENCES address (aid),
    FOREIGN KEY (department_id) REFERENCES department (did)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE patients (
    pid INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    dob DATE,
    phone CHAR(10) NOT NULL,
    insurance VARCHAR(255),
    address_id INT,
    doctor_id INT,
    department_id INT,
    diagnosis_id INT,
    PRIMARY KEY (pid),
    FOREIGN KEY (address_id) REFERENCES address (aid),
    FOREIGN KEY (doctor_id) REFERENCES doctors (eid) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES department (did),
    FOREIGN KEY (diagnosis_id) REFERENCES diagnosis (diid)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE doctor_specialty (
	dsid INT NOT NULL AUTO_INCREMENT,
    eid INT NOT NULL,
    sid INT NOT NULL,
	PRIMARY KEY (dsid),
    FOREIGN KEY (eid) REFERENCES doctors(eid) ON DELETE CASCADE,
    FOREIGN KEY (sid) REFERENCES specialty(sid) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- https://www.medicalhomeportal.org/diagnoses-and-conditions/diagnosis-prevalence-list
INSERT INTO diagnosis (name, severity) VALUES ('Hydrocephalus', 6);
INSERT INTO diagnosis (name, severity) VALUES ('Phenylketonuria', 9);
INSERT INTO diagnosis (name, severity) VALUES ('Marfan Syndrome', 7);
INSERT INTO diagnosis (name, severity) VALUES ('Neuroblastoma', 5);
INSERT INTO diagnosis (name, severity) VALUES ('Isovaleric Acidemia', 8);
INSERT INTO diagnosis (name, severity) VALUES ('Food Allergy', 1);
INSERT INTO diagnosis (name, severity) VALUES ('Headache (Migraine)', 4);
INSERT INTO diagnosis (name, severity) VALUES ('Asthma (Pediatric)', 2);
INSERT INTO diagnosis (name, severity) VALUES ('Sickle Cell Anemia', 10);
INSERT INTO diagnosis (name, severity) VALUES ('Pulmonary Valve Stenosis', 3);
INSERT INTO diagnosis (name, severity) VALUES ('Fractured Bone', 6);
INSERT INTO diagnosis (name, severity) VALUES ('Sprained Ankle', 1);
INSERT INTO diagnosis (name, severity) VALUES ('Gun Shot Wound', 10);

-- https://www.randomlists.com/random-addresses
INSERT INTO address (streetNum, streetName, unit, zip, city, state) VALUES (123,'6th Street',2065, 32904, 'Melbourne', 'FL');
INSERT INTO address (streetNum, streetName, zip, city, state) VALUES (1100,'Congress Avenue', 78701, 'Austin', 'TX');
INSERT INTO address (streetNum, streetName, unit, zip, city, state) VALUES (713,'North 20th Steet',24, 83702, 'Boise', 'ID');
INSERT INTO address (streetNum, streetName, unit, zip, city, state) VALUES (4200,'Speedway',102, 78723, 'Austin', 'TX');
INSERT INTO address (streetNum, streetName, zip, city, state) VALUES (100,'North Capital Avenue', 48933, 'Lansing', 'MI');
INSERT INTO address (streetNum, streetName, zip, city, state) VALUES (1600,'Pennsylvania Avenue', 20500, 'Washington', 'DC');
INSERT INTO address (streetNum, streetName, unit, zip, city, state) VALUES (71,'Pilgrim Avenue ',4600, 20815, 'Chevy Chase', 'MD');
INSERT INTO address (streetNum, streetName, zip, city, state) VALUES (2,'East Main Street', 53703, 'Madison', 'WI');
INSERT INTO address (streetNum, streetName, unit, zip, city, state) VALUES (4,'Goldfield Road',1367, 96815, 'Honolulu', 'HI');
INSERT INTO address (streetNum, streetName, zip, city, state) VALUES (700,'West Jefferson Street', 83702, 'Boise', 'ID');

-- http://www.netdoctor.co.uk/health-services/nhs/a4502/a-to-z-of-hospital-departments/
INSERT INTO department (name) VALUES ('Accident and Emergency');
INSERT INTO department (name) VALUES ('Anaesthetics');
INSERT INTO department (name) VALUES ('Cardiology');
INSERT INTO department (name) VALUES ('Diagnostic Imaging');
INSERT INTO department (name) VALUES ('General Surgery');
INSERT INTO department (name) VALUES ('Haematology');
INSERT INTO department (name) VALUES ('Microbiology');
INSERT INTO department (name) VALUES ('Neurology');
INSERT INTO department (name) VALUES ('Oncology');
INSERT INTO department (name) VALUES ('Ophthalmology');
INSERT INTO department (name) VALUES ('Pharmacy');

-- https://www.aamc.org/cim/specialty/exploreoptions/list/
INSERT INTO specialty (name) VALUES ('Abdominal Radiology');
INSERT INTO specialty (name) VALUES ('Orthopaedic Surgery');
INSERT INTO specialty (name) VALUES ('Biochemical Genetics');
INSERT INTO specialty (name) VALUES ('Pediatric Cardiology');
INSERT INTO specialty (name) VALUES ('Critical Care Medicine');
INSERT INTO specialty (name) VALUES ('Dermatology');
INSERT INTO specialty (name) VALUES ('Endovascular Surgical Neuroradiology');
INSERT INTO specialty (name) VALUES ('Family Medicine');
INSERT INTO specialty (name) VALUES ('Sports Medicine');
INSERT INTO specialty (name) VALUES ('Internal Medicine');
INSERT INTO specialty (name) VALUES ('Medical Microbiology');
INSERT INTO specialty (name) VALUES ('Neurology');

INSERT INTO doctors (first_name, last_name, middle_name, phone, address_id, department_id)
VALUES ('John', 'Dorian', 'Michael', '2515469442', 13, 10);
INSERT INTO doctors (first_name, last_name, middle_name, phone, address_id, department_id)
VALUES ('Christopher', 'Turk', 'Duncan', '2515469442', 14, 11);
INSERT INTO doctors (first_name, last_name, middle_name, phone, address_id, department_id)
VALUES ('Perry', 'Cox', 'Ulysses', '2515469442', 16, 12);
INSERT INTO doctors (first_name, last_name, phone, address_id, department_id)
VALUES ('Elliot', 'Reid', '2515469442', 17, 13);
INSERT INTO doctors (first_name, last_name, phone, address_id, department_id)
VALUES ('Robert', 'Kelso', '2515469442', 18, 14);

INSERT INTO patients (first_name, last_name, middle_name, dob, phone, insurance, address_id, doctor_id, department_id, diagnosis_id)
VALUES ('Tom', 'Hanks', 'Jeffrey', '1956-07-09','2515469442','USAA', 15, 10, 10, 10);
INSERT INTO patients (first_name, last_name, middle_name, dob, phone, insurance, address_id, doctor_id, department_id, diagnosis_id)
VALUES ('Ethan', 'Klein', 'Edward', '1985-06-24','2269062721','Liberty Mutual', 10, 11, 11, 11);
INSERT INTO patients (first_name, last_name, middle_name, dob, phone, insurance, address_id, doctor_id, department_id, diagnosis_id)
VALUES ('Hila', 'Klein', 'Hakmon', '1987-12-12','2265432876','Liberty Mutual', 10, 12, 12, 12);
INSERT INTO patients (first_name, last_name, middle_name, dob, phone, insurance, address_id, doctor_id, department_id, diagnosis_id)
VALUES ('James', 'Rolfe', 'Duncan', '1980-07-10','6719251352','Nationwide', 11, 13, 13, 13);
INSERT INTO patients (first_name, last_name, middle_name, dob, phone, insurance, address_id, doctor_id, department_id, diagnosis_id)
VALUES ('Felix', 'Kjellberg', 'Arvid Ulf', '1989-10-24','1255464478','Progressive', 12, 14, 14, 14);

INSERT INTO doctor_specialty (eid, sid) VALUES (10, 10);
INSERT INTO doctor_specialty (eid, sid) VALUES (11, 11);
INSERT INTO doctor_specialty (eid, sid) VALUES (12, 12);
INSERT INTO doctor_specialty (eid, sid) VALUES (13, 13);
INSERT INTO doctor_specialty (eid, sid) VALUES (14, 14);
