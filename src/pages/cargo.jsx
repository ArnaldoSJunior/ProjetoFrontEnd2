import axios from "axios";
import { useState, useEffect } from "react";

function Cargos(){

const[cargo, setCargo] = useState(null);
const[cargos, setCargos] = useState([]);

function listarCargos(){
   axios.get("http://localhost:5078/Cargos")
   .then(
    (resposta) => {
        console.log(resposta.data);
        setCargos(resposta.data);
    }
   )
}

useEffect(listarCargos, []);

function excluir(id){
    axios.delete("")
}






}
export default Cargos;