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
            <tr key={index}>
                <td>{departamento.id}</td>
                <td>{departamento.nomeDepartamento}</td>
                <td>{departamento.descricao}</td>
                <td>
                   <button onClick={()=>{ excluir(departamento.id);}}>Excluir</button>
                   <button onClick={()=> {editar(departamento);}}>Editar</button>
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
            <form>
                <label htmlFor="nomeDep" >Nome do Departamento</label>
                <input type="text" id="nomeDep" name="nomeDepartamento"
                    value={departamento.nomeDepartamento}
                    onChange={aoDigitar}
                />

                <label htmlFor="desc" >Descrição</label>
                <input type="text" id="desc" name="descricao" 
                    value={departamento.descricao}
                    onChange={aoDigitar}
                />
                
          <button type="button" onClick={salvar}>Salvar</button>
          <button type="button" onClick={cancelar}>Cancelar</button>

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
              <button onClick={()=>{novoDepartamento();}}>Novo Departamento</button> 
                <table>
                    
                <tr>
                    <th>ID</th>
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
        <div>
		    <h1>Cadastro de Departamentos</h1>            
            { conteudoPrincipal() }                               
        </div>
    );
}

export default Departamentos;