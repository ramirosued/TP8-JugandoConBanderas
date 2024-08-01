"use client";
import React, { useEffect, useState } from "react";
import './styles.css';

export default function Paises() {
  let clase;

  const [paises, setPaises] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [timer, setTimer] = useState(15); // Tiempo inicial del temporizador
  const [timerActive, setTimerActive] = useState(false);
  const [puntos, setPuntos] = useState(0);
  const [message, setMessage] = useState(''); // Estado para el mensaje de puntos
  const [claseColor, setClaseColor] = useState('')
  const [pista, setPista] = useState(0)

  useEffect(() => {
    fetchNewCountry(); 
  }, []);

  useEffect(() => {
    if (timerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte o el temporizador se detenga
    } else if (timer === 0) {
      alert('Se acabó el tiempo. Intenta de nuevo.');
      showMessage('Restas 5 puntos');
      setPista(0)

      fetchPuntos(false)
      fetchNewCountry();
    }
  }, [timer, timerActive]);

  const fetchNewCountry = async () => {
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      const paisAleatorio = data.data[Math.floor(Math.random() * data.data.length)];
      setPaises(paisAleatorio);
      setInputValue('');
      setTimer(15); // Reiniciar el temporizador
      setTimerActive(true); // Activar el temporizador

    } catch (error) {
      console.error("Error al obtener los paises:", error);
    }
  };

  const fetchPuntos = async(e)=>{  //usar useEfect
    if(e){
      setPuntos(prevPuntos => prevPuntos + 10); // Incrementar los puntos en 10
    }else{
      setPuntos(prevPuntos => prevPuntos - 5); // Incrementar los puntos en 10
    }
  }

  const showMessage = async(text) => {
    setMessage(text)
    if(text == 'Bien hecho. Sumas 10 puntos'){
      setClaseColor('verde')
    }else{
      setClaseColor('rojo')
    }
    setTimeout(() => {
      setMessage('');
      setClaseColor('')
    }, 3000);  
    
  };

  const darPista = async()=>{
    if(pista>=3){
      alert('Pistas Agotadas')
    }else{
      console.log(pista)
      alert('La primera letra del pais es ' + paises.name[pista]);
      setPista(pista+1)
    }
  }

  const comprobarPais = (e) => {
    e.preventDefault(); 
    const textoTarea = inputValue.trim().toLowerCase(); 
    const paisNombre = paises.name.trim().toLowerCase();
    console.log(textoTarea)
    console.log(paises.name)
    if (textoTarea.length === 0) {
      window.confirm('No ingresaste ninguna tarea');
    } else {
      const confirmBoton = window.confirm('Deseas confirmar el nombre?');
      if (confirmBoton) {
        if (paisNombre == textoTarea) {
          alert('¡Correcto!');
          showMessage('Bien hecho. Sumas 10 puntos');
          setTimerActive(false); 
          fetchNewCountry();
          setPista(0)
          fetchPuntos(true)
        } else {
          alert('Incorrecto. Intenta de nuevo.');
          setInputValue(''); 
        }
      }
    }
    
  };

  

  return (
    <main className="main">
      <div className="mainContainer">
        <h1 className="title">Paises</h1>
        <table className="countryTable">
          <thead>
            <tr>
              <th>Bandera</th>
            </tr>
          </thead>
          <tbody>
            <tr key={paises.name}>
              <td>
                <img src={paises.flag} alt={`Bandera de ${paises.name}`} className="flag" />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="timer">Tiempo restante: {timer} segundos</p>
        <h3>Puntos: {puntos}</h3>
      </div>

      <div className={claseColor}>
      {<p className="message">{message}</p>}
      </div>

      <form className="form" onSubmit={comprobarPais}>
        <label className="formLabel">
          <input type="text" name="texto" className="inputText" value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} placeholder="Nombre del país" />
          <button type="submit" className="submitButton">LISTO</button>
        </label>
      </form>
      <button onClick={darPista}>Necesito ayuda</button>
    </main>
  
  );
  
}
