import React from 'react';
import {Link} from "react-router-dom";
const City = props => {
    const { local } = props.data
    let listCities =  null;

    const citylocal = (city) => {
        const valueTest =  localStorage.getItem('myValueInLocalStorage') || {};
        const filtered = JSON.parse(valueTest).filter(element => element !== city);
        localStorage.setItem('myValueInLocalStorage', JSON.stringify(filtered));
        props.cityupdate(filtered);
    }

    if(local != null) {
         listCities = local.map((city, index) => 
            <div className="city-div" key={index}>
                <Link className="city-link" to={`/city/${city}`}><div className="city-name">{city.charAt(0).toUpperCase() + city.slice(1)}</div></Link>
                <div className="city-delete" onClick={() => citylocal(city)}>&times;</div>
            </div>
        );
    }
    return (
        <div className="list">
            {listCities}
        </div>
    )
}

export default City;