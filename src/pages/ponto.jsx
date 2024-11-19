import axios from "axios";
import { useState, useEffect } from "react";

function Pontos(){

    const[ponto, setPonto] = useState(null);
    const[pontos, setPontos] = useState([]);

    function listarPontos(){
        axios.get("http://localhost:5078/pontos")
            .then(
                (resposta) => {
                    console.log(resposta.data);
                    setPontos(resposta.data);
                } );
    }

    useEffect(() => {
        listarPontos();
    }, []);
    
    function excluir(id){
        axios.delete("http://localhost:5078/pontos/" + id)
        .then(()=>{
                listarPontos();
            }
        );
    }

    function Linha(index, ponto){
        return (
            <tr key={index}>
                <td>{ponto.id}</td>
                <td>{ponto.nomeFuncionario}</td>
                <td>{ponto.horaEntrada}</td>
                <td>{ponto.horaSaida}</td>
                <td>
                   <button className="btn btn-danger btn-sm"  onClick={()=>{ excluir(ponto.id);}}>Excluir</button>
                   <button className="btn btn-primary btn-sm ms-2" onClick={()=> {editar(ponto);}}>Editar</button>
                </td>
            </tr>
        );
    }

    function Linhas(pontos){

        const linhas = [];
        for(let i = 0; i < pontos.length; i++){
            const ponto = pontos[i];
            linhas[i] = Linha(i, ponto);
        }
        return linhas;
    }

    function cancelar(){
        setPonto(null);
    }

    function aoDigitar(e) {
        const { name, value } = e.target;
        setPonto({
            ...ponto, 
            [name]: value     
        });
    }

    function editar(ponto){
       
        setPonto({
            id : ponto.id,
            nomeFuncionario: ponto.nomeFuncionario,
            horaEntrada: ponto.horaEntrada,
            horaSaida: ponto.horaSaida

        });
    }

    function salvar(){
        if (ponto.id){
            axios.put("http://localhost:5078/pontos/"+ ponto.id, ponto)
            .then(
                listarPontos()
            );
        } 
        else {
            axios.post("http://localhost:5078/pontos", ponto).then(
                listarPontos()
            );
        }        
        cancelar();
    }


    function Formulario(){
        return (
            <form id="tabela2">
                <label htmlFor="nomeFuncionario" >Nome</label>
                <br />
                <input type="text" id="nomeFuncionario" name="nomeFuncionario"
                    value={ponto.nomeFuncionario}
                    onChange={aoDigitar}
                />
                <br />
                <br />
                <label htmlFor="horaEntrada" >Hora Entrada</label>
                <br />
                <input type="dateTime-local" id="horaEntrada" name="horaEntrada" 
                    value={ponto.horaEntrada}
                    onChange={aoDigitar}
                />
                <br />
                <br />
                <label htmlFor="horaSaida" >Hora Saída</label>
                <br />
                <input type="dateTime-local" id="horaSaida" name="horaSaida" 
                    value={ponto.horaSaida}
                    onChange={aoDigitar}
                />
                <br />
                <br />
                
          <button class="btn btn-success" id="btnSalvar" type="button" onClick={salvar}> Salvar</button>
          <button class="btn btn-danger" type="button" onClick={cancelar}>Cancelar</button>

            </form>
        );
    }

    function novoPonto(){
        setPonto(
            {
                nomeFuncionario: "",
                horaEntrada: "",
                horaEntrada: ""
            }
        )
    }


    function Tabela(pontos){
        return(
            <>
              <button class="btn btn-success btn-sm" onClick={()=>{novoPonto();}}>Novo Ponto</button> 
                <table>
                    {listarPontos()}
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Hora Entrada</th>
                    <th>Hora Saida</th>
                </tr>
                { Linhas(pontos) }
             </table> 
            </>
        );
    }

    function conteudoPrincipal(){
        if (ponto == null){
            return Tabela(pontos);
        } else {
            return Formulario();
        }
    }

    return(       
        <div id='tabela'>
		    <h1 id="receba" >Cadastro de Pontos</h1>            
            { conteudoPrincipal() }                               
        </div>
    );



}
export default Pontos;