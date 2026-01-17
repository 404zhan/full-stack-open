const Person = ({person, delContact}) => {
  const label = "delete"
  return(
    <li>{person.name} {person.number}
    <button onClick = {delContact}>{label}</button>
    </li>
  )
}
export default Person