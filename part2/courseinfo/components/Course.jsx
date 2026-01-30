const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <ul>{parts.map( (part) => <Part key={part.id} part={part}/>)} </ul>
)

const Part = ({part}) => (
  <li>
    {part.name} {part.exercises}
  </li>
)

const Total = ({parts}) =>  <p> Number of exercises is {parts.reduce((sum,part) =>(sum + part.exercises),0)} </p>


const Course = ({courses}) =>{
    return(
    <ul>{courses.map(course=> <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>)}</ul>
    )
} 


export default Course