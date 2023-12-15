import React, { useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import AddStudent from './Components/AddStudent';
import { useEffect } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning,faSearch,faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[email, setEmail] = useState('');
  const[selectedFile, setSelectedFile] = useState();
  const[gradYear, setGradYear] = useState();


  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
  };


  const handleRemoveStudent = (studentId) => {
    const updatedStudents = allStudents.filter((student) => student.id !== studentId);
    saveStudents(updatedStudents);
  };

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents);
  };

  const [editmode, setEditMode] = useState(false);


  const searchStudents = () => {
    let keywordsArray = [];
    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if (keywordsArray.length > 0) {
      const results = allStudents.filter((student) => {
        for (const word of keywordsArray) {
          if (
            student.firstName.toLowerCase().includes(word) ||
            student.lastName.toLowerCase().includes(word) ||
            student.gradYear.toString().includes(word)
          ) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(results);
    } else {
      setSearchResults(allStudents);
    }
  };
  useEffect(() => {
    searchStudents(); // Call searchStudents when keywords change
  }, [keywords]);

  const students = [{
    id: nanoid(),
    firstName: "Bernete",
    lastName: "Beed",
    email: "bbeed0@flickr.com",
    images:'images/student1.jpg',
    gradYear: '2003'
  }, {
    id: nanoid(),
    firstName: "Yolande",
    lastName: "Schruur",
    email: "yschruur1@boston.com",
    images:'images/student2.jpg',
    gradYear: '1995'
  }, {
    id: nanoid(),
    firstName: "Ag",
    lastName: "Gendricke",
    email: "agendricke2@networkadvertising.org",
    images:'images/student3.jpg',
    gradYear: '456'
  }, {
    id: nanoid(),
    firstName: "Robinia",
    lastName: "Dagleas",
    email: "rdagleas3@prweb.com",
    images:'images/student4.jpg',
    gradYear: '2003'
  }, {
    id: nanoid(),
    firstName: "Rosa",
    lastName: "Cathel",
    email: "rcathel4@google.cn",
    images:'images/student5.jpg',
    gradYear: '6097'
  }, {
    id: nanoid(),
    firstName: "Brandtr",
    lastName: "Manie",
    email: "bmanie5@arizona.edu",
    images:'images/student6.jpg',
    gradYear: '2003'
  }, {
    id: nanoid(),
    firstName: "Nalani",
    lastName: "Edge",
    email: "nedge6@quantcast.com",
    images:'images/student7.jpg',
    gradYear: '2015'
  }, {
    id: nanoid(),
    firstName: "Mel",
    lastName: "McCullouch",
    email: "mmccullouch7@ucla.edu",
    images:'images/student8.jpg',
    gradYear: '2003'
  }, {
    id: nanoid(),
    firstName: "Danie",
    lastName: "Bushill",
    email: "dbushill8@house.gov",
    images:'images/student9.jpg',
    gradYear: '2003'
  }, {
    id: nanoid(),
    firstName: "Evvy",
    lastName: "Dowderswell",
    email: "edowderswell9@skype.com",
    images:'images/student10.jpg',
    gradYear: '2003'
  }];

  return (
    <div className="container">
      <label htmlFor="txtKeywords"> <FontAwesomeIcon icon={faSearch}/> Search by first or last name or Year</label>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        onChange={(evt) => setKeywords(evt.currentTarget.value)}
        value={keywords}
      />
      <div className="row" id='allStudents'>
        {searchResults &&
          searchResults.map((student) => (
            <div className="col-lg-2" key={student.id}>
              <div className="card position-relative">
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveStudent(student.id)}> <FontAwesomeIcon icon={faWarning}/> &nbsp; Remove </button>
                  <>
                    <img src={student.images} alt="Our Students" />
                    {!editmode && <ul className="list-group list-group-flush">
                      <li className="list-group-item text-center">{student.firstName}</li>
                      <li className="list-group-item text-center">{student.lastName}</li>
                      <li className="list-group-item text-center">{student.email}</li>
                      <li className="list-group-item text-center">{student.gradYear}</li>
                      <li className="list-group-item text-center">
                      <button type='button' className='btn btn-warning' onClick={() => setEditMode(true)}>
                          Edit <FontAwesomeIcon icon={faMagicWandSparkles}/>
                      </button>
                    </li>
                    </ul>
            }
            {editmode &&
              <ul className="list-group list-group-flush">
              <li className="list-group-item text-center"><input type='text' className='form-control' value={firstName} onChange={(evt) => setFirstName(evt.currentTarget.value)} /></li>
              <li className="list-group-item text-center"><input type='text' className='form-control' value={lastName} onChange={(evt) => setLastName(evt.currentTarget.value)} /></li>
              <li className="list-group-item text-center"><input type='email' className='form-control' value={email} onChange={(evt) => setEmail(evt.currentTarget.value)} /></li>
              <li className="list-group-item text-center"><input type='text' className='form-control' value={gradYear} onChange={(evt) => setGradYear(evt.currentTarget.value)} /></li>
              <li className="list-group-item"> <button id='btnSave' className='btn btn-secondary'>Save </button></li>
              </ul>
            }
                  </>
              </div>
            </div>
          ))}
      </div>
      {!allStudents && (
        <button
          type="button"
          className="btn btn-lg btn-success"
          onClick={() => saveStudents(students)}
        >
          Save Students
        </button>
      )}
      <AddStudent addStudent={addStudent} />
      <div className="row mt-4">
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default App;