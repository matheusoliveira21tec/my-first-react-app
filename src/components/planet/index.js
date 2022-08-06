import React, { useState, useEffect } from 'react';
import GrayImg from '../shared/gray-img';
import DescriptionWithLink from '../shared/description_with_link';
import Form from './form';
import { useParams, useNavigate } from 'react-router-dom';

async function getPlanet(id) {
    let response = await fetch(`http://localhost:3000/api/${id}.json`)
    let data = await response.json()
    return data;
}
const Planet = () => {
    const [satellites, setSatellites] = useState([]);
    const [planet, setPlanet] = useState([]);
    const [redirect, setRedirect] = useState(false);
    let { id } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        getPlanet(id).then(data => {
            setSatellites(data['satellites'])
            setPlanet(data['data'])
        }, error => {
            setRedirect(true)
        }
        )
    }, []
    )
    const goToPlanets = () => {
        navigate('/')
    }
    const addSatellite = (new_satelllite) => {
        setSatellites([...satellites, new_satelllite]);
    }
    let title;
    if (planet.title_with_underline)
        title = <h4><u>{planet.name}</u></h4>
    else
        title = <h4>{planet.name}</h4>

    if(redirect){
      return  navigate('/')
    }
    return (
        <div>
            {title}
            <DescriptionWithLink description={planet.description} link={planet.link} />
            <GrayImg img_url={planet.img_url} gray={planet.gray} />
            <h4>Satelites:</h4>
            <hr />
            <Form addSatellite={addSatellite} />
            <hr />
            <ul>
                {
                    satellites.map((satellite, index) =>
                        <li key={index}>{satellite.name}</li>
                    )
                }
            </ul>
            <hr />
            <button type='button' onClick={goToPlanets}>Voltar a listagem</button>
        </div>
    )
}

export default Planet;