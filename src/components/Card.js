//Importamos react
import React from "react";
import "./styles/Card.css";
import { Link } from 'react-router-dom';

//definimos la clase con extens heredado de react.component
class Card extends React.Component{
    
    render(){

        //creamos las variables para recibir los props
        const { id, profile_image, nombre, profesion, telefono } = this.props;
        return (
            <div className="card-container">
                <div className="image-container">
                    <img className="user-icon" src={profile_image} alt="user profile image"/>
                </div>

                <div className="info-container">
                    <p className="txt-nombre">{nombre}</p>
                    <p className="txt-profesion">{profesion}</p>
                    <p className="txt-telefono">(+52) {telefono}</p>
                </div>

                <Link to={`/info/${id}`}>
                    <button className="btn" >Detalles</button>
                </Link>
            </div>

         )
    }
}

export default Card