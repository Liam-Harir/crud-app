import React, {useState, useEffect} from 'react';
import './AddStudent.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faWarning,faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';

function student(props) {
  const[Name, setName] = useState('');
  const[DPS, setDPS] = useState('');
  const[HP, setHP] = useState('');
  const[Elixer, setElixer] = useState('');
  const[editmode, setEditMode] = useState(false);

  useEffect(() => {
    setName(props.student.Name);
    setDPS(props.student.DPS);
    setHP(props.student.HP);
    setElixer(props.student.Elixer);
  }, []);

  const saveStudent = () => {
    setEditMode(false);
    const updatedStudent = {Name: Name, DPS: DPS, HP: HP, Elixer: Elixer, id: props.student.id, images: props.student.images }
    props.updatedStudent(updatedStudent);
  }
  console.log(props.student.images)
  return (
    <div className='card'>
      <img src={props.student.images} alt='our students' className='card-im-top mx-auto' />
    {
      !editmode && <ul className="list-group list-group-flush">
      <li className="list-group-item text-center">{props.student.Name}</li>
      <li className="list-group-item text-center">DPS: {props.student.DPS}</li>
      <li className="list-group-item text-center">HP: {props.student.HP}</li>
      <li className="list-group-item text-center">Elixer: {props.student.Elixer}</li>
      <li className="list-group-item d-flex justify-content-center" > <button type='button' className='btn btn-danger' onClick={() => props.removeStudent(props.student)}> Remove <FontAwesomeIcon icon={faWarning} /></button> </li>
      <li className="list-group-item d-flex justify-content-center" > <button type='button' className='btn btn-warning' onClick={() => setEditMode(true)}> Edit <FontAwesomeIcon icon={faMagicWandSparkles}/> </button> </li>  
    </ul>
    }
    {
      editmode && <ul className="list-group list-group-flush">
      <li className="list-group-item text-center"><input type='text' className='form-control' value={Name} onChange={(evt) => setName(evt.currentTarget.value)} /></li>
      <li className="list-group-item text-center"><input type='text' className='form-control' value={DPS} onChange={(evt) => setDPS(evt.currentTarget.value)} /></li>
      <li className="list-group-item text-center"><input type='text' className='form-control' value={HP} onChange={(evt) => setHP(evt.currentTarget.value)} /></li>
      <li className="list-group-item text-center"><input type='text' className='form-control' value={Elixer} onChange={(evt) => setElixer(evt.currentTarget.value)} /></li>
      <li className="list-group-item"> <button id='btnSave' className='btn btn-secondary' onClick={saveStudent}>Save </button></li>
      </ul>
    }
    </div>
  )
}

export default student;
