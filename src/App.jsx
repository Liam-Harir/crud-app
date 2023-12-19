// localStorage.clear()
import React, { useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import AddStudent from './Components/AddStudent';
import { useEffect } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Student from './Components/Student';
import id from 'id';

function App() {
  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [Elixer, setElixer] = useState('');

  useEffect(() => {
    if(localStorage){
      const studentLocalStorage = JSON.parse(localStorage.getItem('students'));

      if(studentLocalStorage){
        saveStudents(studentLocalStorage);
      }
      else{
        saveStudents(students)
      }
    }

  },[]);

  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
    if(localStorage){
      localStorage.setItem('students', JSON.stringify(students));
      console.log('saved to local storage')
    }
  };

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents);
  };

  const removeStudent = (studentToDelete) => {
    const updatedStudentsArray = allStudents.filter(student => student.id !== studentToDelete.id);
    saveStudents(updatedStudentsArray);
  };

  const updateStudent = (updatedStudent) => {
    const updatedStudentsArray = allStudents.map(student => student.id === updateStudent.id ? {...student, ...updatedStudent} : student)
    saveStudents(updatedStudentsArray);
  };

  const searchStudents = () => {
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if(Elixer){
      keywordsArray.push(Elixer.toString());
    }
    console.log(keywordsArray);

    if(keywordsArray.length > 0){
      const searchResults = allStudents.filter(student => {
        for(const word of keywordsArray){
          if(student.Name.toLowerCase().includes(word) ||
          student.Elixer === word){
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else{
      setSearchResults(allStudents);
    }
  }



  const students = [{
    id: nanoid(),
    Name: "Barbarians",
    DPS: "345",
    HP: "5",
    images:'images/Card1.png',
    Elixer: '6'
  }, {
    id: nanoid(),
    Name: "Yolande",
    DPS: "Schruur",
    HP: "yschruur1@boston.com",
    images:'/images/Card2.png',
    Elixer: '1995'
  }, {
    id: nanoid(),
    Name: "Ag",
    DPS: "Gendricke",
    HP: "agendricke2@networkadvertising.org",
    images:'images/Card3.png',
    Elixer: '456'
  }, {
    id: nanoid(),
    Name: "Robinia",
    DPS: "Dagleas",
    HP: "rdagleas3@prweb.com",
    images:'images/Card4.png',
    Elixer: '2003'
  }, {
    id: nanoid(),
    Name: "Rosa",
    DPS: "Cathel",
    HP: "rcathel4@google.cn",
    images:'images/Card5.png',
    Elixer: '6097'
  }, {
    id: nanoid(),
    Name: "Brandtr",
    DPS: "Manie",
    HP: "bmanie5@arizona.edu",
    images:'images/Card6.png',
    Elixer: '2003'
  }, {
    id: nanoid(),
    Name: "Nalani",
    DPS: "Edge",
    HP: "nedge6@quantcast.com",
    images:'images/Card1.png',
    Elixer: '2015'
  }, {
    id: nanoid(),
    Name: "Mel",
    DPS: "McCullouch",
    HP: "mmccullouch7@ucla.edu",
    images:'images/Card1.png',
    Elixer: '2003'
  }, {
    id: nanoid(),
    Name: "Danie",
    DPS: "43",
    HP: "505",
    images:'images/Card1.png',
    Elixer: '2003'
  }, {
    id: nanoid(),
    Name: "Evvy",
    DPS: "Dowderswell",
    HP: "edowderswell9@skype.com",
    images:'images/Card1.png',
    Elixer: '2003'
  }];

  return (
    
    <div className="container">
            <div className='row mt-4 clash-royale-border' >
          <h3> Search Cards</h3>
          <div className='col-md-4'>
            <input type='text' className='form-control' placeholder='Card Name' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords}/>
          </div>
          <div className='col-md-4 '>
          <select value={Elixer} onChange={evt => setElixer(evt.currentTarget.value)} className='form-select'>
              <option value=''> Select Elixer Cost</option>
              {_(allStudents).map(student => student.Elixer).sort().uniq().map(Elixer => <option key={Elixer} value={Elixer}>{Elixer}</option>).value()}
          </select>
          </div>
          <div className='col-md-4'>
            <button type='button' className='btn btn-primary' onClick={searchStudents}>Search Cards &nbsp; <FontAwesomeIcon icon={faSearch} /></button>
          </div>
      </div> 
      <div className='row clash-royale-border'>
        <h3>Clash Royale Cards</h3>
        {searchResults && searchResults.map((student) =>
          ( <div className='col-lg-2' key={student.id}> 
            <Student  student={student} removeStudent={removeStudent} updateStudent={updateStudent} />
          </div>)
        )}
      </div>
      <AddStudent addStudent={addStudent}/>
    </div>
  );
}

export default App;