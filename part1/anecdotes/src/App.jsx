import { useState } from 'react'

const DisplayMostVoted = ({anecdotes,votes}) => {
  let maxKey = 0
  let totalVotes = 0
  for (const key in votes) {
    if (!Object.hasOwn(votes, key)) continue;
    
    const element = votes[key];
    totalVotes += element
    if (element > votes[maxKey]) {
      maxKey = key
    }
    }

    
    if (totalVotes===0) {
      return(<>
      <h1>Anecdote with most votes</h1>
      <p>Please vote to see the ancedote with most votes</p>
      </>)
      
    }
    else {
      return(<>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxKey]}</p>
      <p>has {votes[maxKey]} votes</p>
      </>)
      
    }
    
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0})

  const randomNumber = () => {

    let number = Math.floor(Math.random()*anecdotes.length)
    if (number===selected){
      return randomNumber ()
    }
    return number
  }  

  const handleVote = () => {
    const new_votes = {...votes}
    new_votes[selected] += 1
    setVotes(new_votes)
  }
  

  return (
    <div>
      {anecdotes[selected]} 
      <p>has {votes[selected]} votes</p>
      <button onClick={()=>setSelected(randomNumber())}>Next Anecdote</button>
      <button onClick={handleVote}>Vote</button>
      <DisplayMostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App