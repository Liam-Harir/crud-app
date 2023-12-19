import React, {useState} from 'react'
import './AddStudent.css'
import { nanoid } from 'nanoid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'

function AddStudent(props) {
    const[Name, setName] = useState('');
    const[DPS, setDPS] = useState('');
    const[HP, setHP] = useState('');
    const[selectedFile, setSelectedFile] = useState();
    const[Elixer, setElixer] = useState();

    const doWork= () => {
        const newStudent = {'id':nanoid(), 'Name':Name, 'DPS':DPS, 'HP':HP, 'Elixer':Elixer, 'images':URL.createObjectURL(selectedFile)};
        props.addStudent(newStudent);
    }

    const imageUpdate = (event) => {
        setSelectedFile(event.target.files[0]);
    }

  return (
    <div className='row mt-4 clash-royale-border' id='addStudent'>
        <div className='col-md-2'>
            <label htmlFor='txtName' className='form-label'>Card Name</label>
            <input type='text' id='txtName' placeholder='Name' className='form-control' onChange={(evt) => setName(evt.currentTarget.value)} value={Name} />
        </div>
        <div className='col-md-2'>
            <label htmlFor='txtDPS' className='form-label'>DPS</label>
            <input type='text' id='txtDPS' placeholder='DPS' className='form-control' onChange={(evt) => setDPS(evt.currentTarget.value)} value={DPS} />
        </div>
        <div className='col-md-2'>
            <label htmlFor='txtHP' className='form-label'>Health Points</label>
            <input type='HP' id='txtHP' placeholder='HP' className='form-control' onChange={(evt) => setHP(evt.currentTarget.value)} value={HP} />
        </div>
        <div className='col-md-2'>
            <label htmlFor='txtElixer' className='form-label'>Elixer</label>
            <input type='text' id='txtElixer' placeholder='Elixer Cost' className='form-control' onChange={(evt) => setElixer(evt.currentTarget.value)} value={Elixer} />
        </div>
        <div className='col-md-2'>
        <label htmlFor='fileUpload' className='form-label'>Card Image</label>
            <input type='file' name='file' id='fileUpload' onChange={imageUpdate} />
        </div>
        <div className='col-md-2'>
            <br/>
            <button type='button' id='btnAdd' className='btn btn-success btn-lg' onClick={doWork}><FontAwesomeIcon icon={faPlusCircle}/>&nbsp; Add Card</button>
        </div>
      
    </div>
  );
}

export default AddStudent;
