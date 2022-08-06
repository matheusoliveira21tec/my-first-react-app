import React, { Fragment, useState, useEffect} from 'react';
import Planet from './planet';
import Form from './form';

async function getPlanets() {
    let response = await fetch('http://localhost:3000/api/planets.json')
    let data = await response.json()
    return data;
}
const Planets = () => {
    const [planets, setPlanets] = useState([]);
    useEffect(() =>{
        getPlanets().then(data => {
            setPlanets(data['planets'])
        })
    }, []
    )

    const addPlanet = (new_planet) =>{
        setPlanets([...planets, new_planet]);
    }
    const removeLast = () => {
        let new_planets = [...planets];
        new_planets.pop();
        setPlanets(new_planets);
    };
    const duplicateLast = () => {
        let last_planet = planets[planets.length - 1];
        setPlanets([...planets, last_planet]);
    };
    return (
        <Fragment>
            <h3>Planet list</h3>
            <button onClick={removeLast}>RemoveLast</button>
            <button onClick={duplicateLast}>DuplicateLast</button>
            <hr />
            <Form addPlanet={addPlanet}/>
            {planets.map((planet, index) =>
                <Planet
                    name={planet.name}
                    description={planet.description}
                    link={planet.link}
                    img_url={planet.img_url}
                    id={planet.id}
                    key={index} />)
            }
        </Fragment>
    );
}
export default Planets;