import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookServices from "./services/phonebook"
import Notification from "./components/Notification"




const SinglePerson = ({id,name,number,handleDelete}) =>{
  
  return(<li>{name} {number} <button onClick={()=>handleDelete(id,name)}>Delete</button></li> )
}
const Persons = ({persons,newFilter,handleDelete}) => {
  if (newFilter===""){
      return(<ul>{persons.map(person => <SinglePerson key={person.id} name={person.name} id={person.id} number={person.number} handleDelete={handleDelete}/> )}</ul>)
  }

  let filteredPersons = persons.filter(person=>person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return(<ul>{filteredPersons.map(person => <SinglePerson key={person.id} name={person.name} number={person.number} handleDelete={handleDelete}/> )}</ul>)

}

const Filter = ({value,onChange}) => {
  return(
    <div>
      Filter shown with: <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({onSubmit,valueName,onChangeName,valueNumber,onChangeNumber}) =>{
  return(
    <form onSubmit={onSubmit}>
        <div>
          Name: <input value={valueName} onChange={onChangeName}/>
        </div>
        <div>
          Number: <input value={valueNumber} onChange={onChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setMessage] = useState(null)

  const handleNameChange = (event) =>  {setNewName(event.target.value)}

  const handleNumberChange = (event) => {setNewNumber(event.target.value)}

  const handleFilterChange = (event) => {setNewFilter(event.target.value)}

  const handleDelete = (id,name) => {
    if (window.confirm(`Delete ${name}`)){
    phonebookServices.deleteContact(id).then(deletedid=>setPersons(persons.filter(person=>person.id != deletedid)))
    setMessage(`contact ${name} deleted`)
    setTimeout(()=>setMessage(null),3000)
    }
  }

  const handleNameSubmit = (event) => {
    event.preventDefault()
    let isExisting = persons.find((person)=> person.name == newName)
    if (isExisting) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number?`)){
        phonebookServices.changeNumber(isExisting.id,{name:newName, number:newNumber}).then(modifiedPerson=> {setPersons(persons.map(person=>person.id===isExisting.id?modifiedPerson:person))
        setMessage(`contact ${newName} number updated`)
        setTimeout(()=>setMessage(null),3000)
        setNewName('')
        setNewNumber('')
        }).catch(error=>{setMessage(`${newName} already deleted from server`)
                         setTimeout(() =>setMessage(null), 3000)
                         phonebookServices.getAll().then(phonebook => setPersons(phonebook))
                        })
        
      }
    }
    else{
      phonebookServices.createNew({name:newName, number:newNumber}).then(newPerson => {setPersons(persons.concat(newPerson))
        setMessage(`New contact ${newName} added`)
        setTimeout(()=>setMessage(null),3000)
        setNewName('')
        setNewNumber('')
      })
      
      
    }
  }

  useEffect(()=>{phonebookServices.getAll().then(phonebook => setPersons(phonebook))},[])
  

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={newMessage}/>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>Add new number</h2>
      <PersonForm onSubmit={handleNameSubmit} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App