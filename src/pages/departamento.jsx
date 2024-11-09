import axios from "axios";
import { useState, useEffect } from "react";

function Departamentos(){
    
    //listarDepartamentos();
    const[departamento, setDepartamento] = useState(null);
    const[departamentos, setDepartamentos] = useState([]);
    
    
    function listarDepartamentos(){
        axios.get("http://localhost:5078/departamentos")
            .then(
                (resposta) => {
                    console.log(resposta.data);
                    setDepartamentos(resposta.data);
                }
            );
    }

    useEffect(listarDepartamentos, []);

    function excluir(id){
        //alert("Id " + id);
        axios.delete("http://localhost:5078/departamentos/" + id).then(
            ()=>{
                listarDepartamentos();
            }
        );
    }

    function Linha(index, departamento){
        return (
            <tr key={index}>
                <td>{departamento.id}</td>
                <td>{departamento.descricao}</td>
                <td>{departamento.nomeDepartamento}</td>
                <td>
                   <button
                        onClick={()=>{
                            excluir(departamento.id);
                        }}               
                   >Excluir</button>
                     <button
                        onClick={()=> {
                            editar(departamento);
                        }}
                     >Editar</button>
                </td>
            </tr>
        );
    }

    function Linhas(departamentos){

        // const departamentos = [
        //     {
        //         id: "1",
        //         desc: "Estudar HTML e CSS",
        //         conc: "Sim"
        //     },
        //     {
        //         id: "2",
        //         desc: "Testar aplicação",
        //         conc: "Não"
        //     }
        // ];
    
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

    function aoDigitar(e, i){
        setDepartamento(
            {
                id : departamento.id,
                nomeDepartamento: e.target.value,
                descricao: "OLA",
            }
        )
    }

    function editar(departamento){
        console.log("editar " + departamento.id + " " + departamento.descricao + " " + departamento.nomeDepartamento);
        setDepartamento({
            id : departamento.id,
            descricao : departamento.descricao,
            nomeDepartamento: departamento.nomeDepartamento,
        });
    }

    function salvar(){
        if (departamento.id){
            axios.put("http://localhost:5078/departamentos/"+ departamento.id, departamento).then(
                listarDepartamentos()
            );
        } 
        else {
            axios.post("http://localhost:5078/departamentos", departamento).then(
                listarDepartamentos()
            );
        }        
    }

    function Formulario(){
        return (
            <form>
                <label for="desc">Descrição</label>
                <input type="text" id="desc" name="desc" 
                    value={departamento.descricao}
                    onChange={aoDigitar}
                />
                <label for="nomeDep">Nome do Departamento</label>
                <input type="text" id="nomeDep" name="nomeDep"
                    value={departamento.nomeDepartamento}
                    onChange={aoDigitar}
                />
                <button onClick={salvar}>Salvar</button>
                <button onClick={cancelar}>Cancelar</button>
            </form>
        );
    }

    function novoDepartamento(){
        setDepartamento(
            {
                descricao : "",
                nomeDepartamento: ""
            }
        )
    }
    
    function Tabela(departamentos){
        return(
            <>
              <button onClick={()=>{
                novoDepartamento();
              }}>Novo Departamento</button> 
                <table>
                <tr>
                    <th>ID</th>
                    <th>Descrição</th>
                    <th>Nome do departamento</th>
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