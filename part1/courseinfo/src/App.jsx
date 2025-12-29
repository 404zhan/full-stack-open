const Sum = ({arr}) => {
  return (
    <p><strong>total of {arr.reduce((a, b)=>a+b.exercises, 0)} exercises</strong></p>
  )
}

const Part = ({topic}) => {
  return (
    <li>{topic.name} {topic.exercises}</li>
  )
}

const Content = ({part}) => {
  return (
    <ul>
      {part.map(con => 
       <Part key = {con.id} topic = {con}/>
      )}
    </ul>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <Content part = {course.parts} key = {course.parts.id}/>
      <Sum arr = {course.parts}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => 
        <Course key = {course.id} course={course} />
      )}
    </div>
  )
}

export default App