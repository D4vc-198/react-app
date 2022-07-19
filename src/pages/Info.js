import React, { useReducer, useEffect, useState, useRef } from "react";
import Titulo from "../components/Title";
import { Navigate, useParams } from 'react-router-dom';
import { updateDoc, collection, doc, onSnapshot, Timestamp } from "firebase/firestore";
import db from "../components/firebase";
import "../components/styles/info.css";
import { useNavigate } from "react-router-dom";

function Detalles(){
    //Recibimos los parametros enviados

    let params = useParams()
    let navigate = useNavigate();

    //Hooks paralos datos
    const[datosUsuario, setDatosUsuario] = useState( {
            profile_image: "",
            nombre: "",
            profesion: "",
            edad: 0,
            ubicacion: "",
            telefono:"", 
            correo: "",
            fecha: "",
        }
    );

    const[datosSkills, setSkills] = useState({
        angular: true,
        c_sharp: true,
        java: true,
        python: true,
        react: true,
    });
    
    //Hooks checkbox+
    const [angularChecked, setAngularIsChecked] = useState(false)
    const [c_sharpChecked, setC_sharpIsChecked] = useState(false)
    const [javaChecked, setJavaIsChecked] = useState(false)
    const [pythonChecked, sePythonIsChecked] = useState(false)
    const [reactChecked, setReactIsChecked] = useState(false)
    


    
    const isMounted = useRef();

    //Recuperamos los datos del id
    const obtenerDatos = () => { 
        const collectionRef = collection(db, 'usuarios')

        //Obtenemos los datos del id proporcionado
        const getData = doc(collectionRef, params.id)

        //const data = {nombre: nombrePersona}
        //UpdateDoc(datosUsuario, data)
        onSnapshot(getData, (datosObtenidos) => {
            //console.log(datosObtenidos.data().angular);
            setDatosUsuario ({
                //modificamos profile_image de datosUsuario por el valor de respuesta de datosObtenidos.data().profile_image
                datosUsuario, profile_image: datosObtenidos.data().profile_image,
                datosUsuario, nombre: datosObtenidos.data().nombre,
                datosUsuario, profesion: datosObtenidos.data().profesion,
                datosUsuario, edad: datosObtenidos.data().edad,
                datosUsuario, ubicacion: datosObtenidos.data().ubicacion,
                datosUsuario, telefono: datosObtenidos.data().telefono,
                datosUsuario, correo: datosObtenidos.data().correo,
                datosUsuario, fecha: datosObtenidos.data().fecha,
                }
            )

        })

    }

    //Obtenemos los skills
    const obtenerSkills = () =>{
        const collectionRef = collection(db, 'usuarios')
        const getData = doc(collectionRef,params.id)

        onSnapshot(getData, (skillsObtenidos) =>{
           //Reemplazamos el valor de los hooks por el valor de respuesta para el checkbox
            setAngularIsChecked(skillsObtenidos.data().angular)
            setC_sharpIsChecked(skillsObtenidos.data().c_sharp)
            setJavaIsChecked(skillsObtenidos.data().java)
            sePythonIsChecked(skillsObtenidos.data().python)
            setReactIsChecked(skillsObtenidos.data().react)
        })
    }

    //Funciones para cambiar el valor del checkbox
    //dependiendo del estado
    const Angular_Checked = (e) =>{
        setAngularIsChecked(e.target.checked)
        //console.log("Angular evento:" + angularChecked)
        //el valor real es !angularChecked
    }

    const C_Checked = (e) =>{
        setC_sharpIsChecked(e.target.checked)
        console.log("C sharp:" + c_sharpChecked)
        //el valor real es !angularChecked
    }

    const Java_Checked = (e) => {
        setJavaIsChecked(e.target.checked)
    }

    const Python_Checked = (e) => {
        sePythonIsChecked(e.target.checked)
    }

    const React_Checked = (e) => {
        setReactIsChecked(e.target.checked)
    }
    

    //Actualizar Skills
    const update = (e) => {
        e.preventDefault()
        const skills = doc(db, 'usuarios', params.id)
        const data = {
            angular: angularChecked,
            c_sharp: c_sharpChecked,
            java: javaChecked,
            python: pythonChecked, 
            react: reactChecked
        }
        updateDoc(skills, data)
        navigate('/react-app')
    }


    useEffect(() => {
        if (isMounted.current){
            return
        }

        isMounted.current = true;
        obtenerDatos();
        obtenerSkills();
    },  [])

    return(
        <div>
            <Titulo/>
            <div className="personal-card-container">
                
                <div className="personal-img-info">
                    <div className="user-image-container">
                        <img className="user-profile-image" src={datosUsuario.profile_image} alt="profile image"/>
                        <p className="txt-fecha">Fecha entrevista {datosUsuario.fecha}</p>
                    </div>
                    
                    <div className="info-container">
                        <h2>{datosUsuario.nombre}</h2>
                        <ul>
                            <li className="list-item">
                                <div className="txt-item">
                                    <p>Profesión</p>
                                </div>
                                <div className="txt-item-value">
                                    <p>{datosUsuario.profesion}</p>
                                </div>
                            </li>
                            <li className="list-item">
                                <div className="txt-item">
                                    <p>Edad</p>
                                </div>
                                <div className="txt-item-value">
                                    <p>{datosUsuario.edad}</p>
                                </div>
                            </li>
                            <li className="list-item">
                                <div className="txt-item">
                                    <p>Ubicación</p>
                                </div>
                                <div className="txt-item-value">
                                    <p>{datosUsuario.ubicacion}</p>
                                </div>
                            </li>
                            <li className="list-item">
                                <div className="txt-item">
                                    <p>Teléfono</p>
                                </div>
                                <div className="txt-item-value">
                                    <p>{datosUsuario.telefono}</p>
                                </div>
                            </li>
                            <li className="list-item">
                                <div className="txt-item">
                                    <p>Correo</p>
                                </div>
                                <div className="txt-item-value">
                                    <p>{datosUsuario.correo}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="skill-container">
                    <h2>Habilidades</h2>
                    <form onSubmit={update}>
                        <div className="form-container">

                            <div className="checkbox-container">
                                <label className="checkbox">Angular
                                    <input type="checkbox" checked={angularChecked} onChange={Angular_Checked} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            
                            <div className="checkbox-container">
                                <label className="checkbox">C#
                                    <input type="checkbox" checked={c_sharpChecked} onChange={C_Checked} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>

                            <div className="checkbox-container">
                                <label className="checkbox">Java
                                    <input type="checkbox" checked={javaChecked} onChange={Java_Checked} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>

                            <div className="checkbox-container">
                                <label className="checkbox">Python
                                    <input type="checkbox" checked={pythonChecked} onChange={Python_Checked} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>

                            <div className="checkbox-container">
                                <label className="checkbox">React
                                    <input type="checkbox" checked={reactChecked} onChange={React_Checked} />
                                    <span className="checkmark"></span>
                                </label>
                            </div>

                        </div>

                        <div className="button-submit-container">
                            <button className="btn-submit" type="submit">actualizar</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )

}
export default Detalles