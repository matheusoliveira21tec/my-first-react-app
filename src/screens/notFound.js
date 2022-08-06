import React from "react";
import {Link} from "react-router-dom";
const notFoundScreen = () =>{
    return(
        <div>
            <h3>Página não encontrada</h3>
            <Link to="/">Voltar a listagem</Link>
        </div>
    )
}

export default notFoundScreen;
