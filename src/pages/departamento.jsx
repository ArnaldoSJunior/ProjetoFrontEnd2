import axios from "axios";
import { useState, useEffect } from "react";

function Departamentos(){
    
    
    const[departamento, setDepartamento] = useState(null);
    const[departamentos, setDepartamentos] = useState([]);
    
    
    function listarDepartamentos(){
        axios.get("http://localhost:5078/Departamentos")
            .then(
                (resposta) => {
                    console.log(resposta.data);
                    setDepartamentos(resposta.data);
                } );
    }

    useEffect(() => {
        listarDepartamentos();
    }, []);
    

    function excluir(id){
        axios.delete("http://localhost:5078/Departamentos/" + id)
        .then(()=>{
                listarDepartamentos();
            }
        );
    }

    function Linha(index, departamento){
        return (
            <tr key={index} className="table-striped table-bordered table-hover">
            <td>{departamento.id}</td>
            <td>{departamento.nomeDepartamento}</td>
            <td>{departamento.descricao}</td>
            <td>
            <button className="btn btn-danger btn-sm" onClick={() => excluir(departamento.id)}>Excluir</button>
            <button className="btn btn-primary btn-sm ms-2" onClick={() => editar(departamento)}>Editar</button>
            </td>
        </tr>
        );
    }

    function Linhas(departamentos){

        const linhas = [];
        for(let i = 0; i < departamentos.length; i++){
            const departamento = departamentos[i];
            linhas[i] = Linha(i, departamento);
        }
        return linhas;
    }

    function cancelar(){
        setDepartamento(null);
    }

    function aoDigitar(e) {
        const { name, value } = e.target;
        setDepartamento({
            ...departamento, 
            [name]: value     
        });
    }

    function editar(departamento){
        console.log("editar " + departamento.id + " " + departamento.nomeDepartamento + " " + departamento.descricao + " " );
        setDepartamento({
            id : departamento.id,
            nomeDepartamento: departamento.nomeDepartamento,
            descricao : departamento.descricao,
            
        });
    }

    function salvar(){
        if (departamento.id){
            axios.put("http://localhost:5078/Departamentos/"+ departamento.id, departamento)
            .then(
                listarDepartamentos()
            );
        } 
        else {
            axios.post("http://localhost:5078/Departamentos", departamento).then(
                listarDepartamentos()
            );
        }        
        cancelar();
    }

    function Formulario(){
        return (
            <form id="tabela2">
                <label htmlFor="nomeDep" >Nome do Departamento</label>
                <br />
                <input type="text" id="nomeDep" name="nomeDepartamento"
                    value={departamento.nomeDepartamento}
                    onChange={aoDigitar}
                />

            <br></br>
            <br></br>


                <label htmlFor="desc" >Descrição</label>
                <br />
                <input type="text" id="desc" name="descricao" 
                    value={departamento.descricao}
                    onChange={aoDigitar}
                />
                
            <br></br>
            <br></br>
            <br></br>
                
          <button class="btn btn-success" id="btnSalvar" type="button" onClick={salvar}>Salvar</button>
          <button class="btn btn-danger" type="button" onClick={cancelar}>Cancelar</button>

            </form>
        );
    }

    function novoDepartamento(){
        setDepartamento(
            {
                nomeDepartamento: "",
                descricao : ""
                
            }
        )
    }
    
    function Tabela(departamentos){
        return(
            <>
              <button className="btn btn-success btn-sm" onClick={()=>{novoDepartamento();}}>Novo Departamento</button> 
                <table>
                    {listarDepartamentos()}
                <tr>
                    <th id="id">ID</th>
                    <th>Nome do departamento</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
                { Linhas(departamentos) }
             </table> 
            </>
        );
    }

    function conteudoPrincipal(){
        if (departamento == null){
            return Tabela(departamentos);
        } else {
            return Formulario();
        }
    }

    return(       
        <div id='tabela'>
		    <h1 id="receba">Cadastro de Departamentos</h1>            
            { conteudoPrincipal() }                               
        </div>
    );
}

export default Departamentos;