import React, { useState } from 'react';
import {nanoid} from 'nanoid';

//components
import './App.css';
import data from "./data.js";
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';


function App() {

  let [contacts, setContacts] = useState(data)
  let [addFormData, setAddFormata] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: ""
  })

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: ""
  })

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormata(newFormData)
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber :  addFormData.phoneNumber,
      email:   addFormData.email
    }

    const newContacts = [...contacts, newContact]
    setContacts(newContacts)
  }


  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber :  editFormData.phoneNumber,
      email:   editFormData.email
    }
    const newContacts = [...contacts]

    const index = contacts.findIndex((contact) => contact.id === editContactId)

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null)
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id)

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber :  contact.phoneNumber,
      email:   contact.email
    }

      setEditFormData(formValues)
  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts]

    const index = contacts.findIndex((contact) => contact.id === contactId)

    newContacts.splice(index, 1)
     
    setContacts(newContacts)
  }

  return (
      <>
      
      <div className='app-container'>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone No.</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          <tbody>
          
            {
              contacts.map((contact) => (
                <>
                {editContactId === contact.id ? (<EditableRow editFormData={editFormData}
                 handleEditFormChange={handleEditFormChange}  handleCancelClick={handleCancelClick} />):
                (<ReadOnlyRow contact={contact} handleEditClick={handleEditClick}  handleDeleteClick={handleDeleteClick} /> )}
              
                </>
              ))
            }
            </tbody>

        </table>
        </form>

            <h1>Add a contact</h1>

            <form onSubmit={handleAddFormSubmit}>
              <input type='text' name='fullName' required="required" placeholder='Enter your name' onChange={handleAddFormChange} ></input>
              <input type='text' name='address' required="required" placeholder='Enter your address' onChange={handleAddFormChange} ></input>
              <input type='number' name='phoneNumber' required="required" placeholder='Enter your phone number' onChange={handleAddFormChange}></input>
              <input type='email' name='email' required="required" placeholder='Enter your email' onChange={handleAddFormChange} ></input>
              <button type='submit'>Add</button>
            </form>

      </div>
      </>
  );
}

export default App;
