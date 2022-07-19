import React from "react";
import Titulo from "../components/Title";
import UserList from "../components/UserList";
import db from "../components/firebase";
import { collection, getDocs } from "firebase/firestore";

class Dashboard extends React.Component{
    
    //Creamos el state data
    constructor(props) {
        super(props);
        //Lista user es el props de los datos
        this.state = {listaUsuarios : []}
    }
    
    //Método para la obtencion de usuarios
    obtenerDatosUsuario = () => {
        //referenciamos a la base de datos
        const colRef = collection(db, 'usuarios');
        getDocs(colRef).then((snapshot) =>{
            let listaUsuariosObtenidos = [];
            //recorremos los resultados
            // y lo asignamos al array
            snapshot.forEach((snap) => {
                listaUsuariosObtenidos.push({...snap.data(), id:snap.id});
            });
            // actualizamos el estado por (listaUsuarios = listaUsuariosObtenidos)
            // los resultados obtenidos
            console.log(listaUsuariosObtenidos);
            this.setState({listaUsuarios: listaUsuariosObtenidos});
        })
    }

    componentDidMount(){
        this.obtenerDatosUsuario();
    }
    

    render() {
        return(
            <div>
                <Titulo />
                <UserList usuario={this.state.listaUsuarios}/>
            </div>
        )
    }
}

export default Dashboard