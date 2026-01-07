import { useState, useEffect } from 'react'
import axios from 'axios'
import Countrylist from './components/Countrylist'

function App() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState([])

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      const countries = response.data
      const selected = countries.filter(x => x.name.common.toLowerCase().includes(name.toLowerCase()))
      setCountry(selected)
    })
  }, [name])
  const handleChange = (event) => {
    setName(event.target.value)
  }
  return (
    <div>
      find countries:
      <input value = {name} onChange={handleChange}/>
      <Countrylist places={country}/>
    </div>
  )
}

export default App
