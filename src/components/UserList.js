import React from "react";
import Card from "./Card";

const UserList = (props) => (
    //Pasamos los props
    <div>
        { props.usuario.map((usuario) => {
            //este componente retorna la tarjeta del usuario
            return (
            <Card key={usuario.id}
            id={usuario.id}
            profile_image={usuario.profile_image}
            nombre={usuario.nombre}
            profesion={usuario.profesion}
            telefono={usuario.telefono}/>
            ) 
        })}
    </div>
)

export default UserList