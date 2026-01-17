const Countrylist = ({places}) => {
    if(places.length === 1){
        return (
        <div>
            <h1>{places[0].name.common}</h1>
            <p>Capital {places[0].capital[0]}</p>
            <p>Area {places[0].area}</p>
            {places[0].flag}
        </div>
        )
    }
    else if(places.length > 10){
        return (
          <p>Too many matches, specify another filter</p>
        )
    }
    return (
        <ul>
            {places.map((place) => 
                <li key = {place.name.official}>{place.name.common.toLowerCase()}</li>
            )}
        </ul>
    )
}

export default Countrylist