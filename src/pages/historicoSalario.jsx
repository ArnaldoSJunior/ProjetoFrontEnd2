import axios from "axios";
import { useState, useEffect } from "react";

function HistoricoSalarios(){
    
    const[historicoSalario, setHistoricoSalario] = useState(null);
    const[historicoSalarios, setHistoricoSalarios] = useState([]);
    
    
    function listarHistoricoSalarios(){
        axios.get("http://localhost:5078/HistoricoSalarios")
            .then(
                (resposta) => {
                    console.log(resposta.data);
                    setHistoricoSalarios(resposta.data);
                } );
    }

    useEffect(() => {
        listarHistoricoSalarios();
    }, []);
    

    function excluir(id){
        axios.delete("http://localhost:5078/HistoricoSalarios/" + id)
        .then(()=>{
                listarHistoricoSalarios();
            }
        );
    }

    function Linha(index, historicoSalario){
        return (
            <tr key={index}>
                <td>{historicoSalario.id}</td>
                <td>{historicoSalario.funcionarioId}</td>
                <td>{historicoSalario.dataAlteracao}</td>
                <td>{historicoSalario.salarioAntigo}</td>
                <td>{historicoSalario.salarioNovo}</td>
                <td>{historicoSalario.motivoAlteracao}</td>
                <td>
                    <button onClick={()=>{ excluir(historicoSalario.id);}}>Excluir</button>
                    <button onClick={()=> {editar(historicoSalario);}}>Editar</button>
                </td>
            </tr>
        );
    }

    function Linhas(historicoSalarios){

        const linhas = [];
        for(let i = 0; i < historicoSalarios.length; i++){
            const historicoSalario = historicoSalarios[i];
            linhas[i] = Linha(i, historicoSalario);
        }
        return linhas;
    }

    function cancelar(){
        setHistoricoSalario(null);
    }

    function aoDigitar(e) {
        const { name, value } = e.target;
        setHistoricoSalario({
            ...historicoSalario, 
            [name]: value     
        });
    }

    function editar(historicoSalario){

        setHistoricoSalario({
            
            funcionarioId: historicoSalario.funcionarioId,
            dataAlteracao: historicoSalario.dataAlteracao,
            salarioAntigo: historicoSalario.salarioAntigo ,
            salarioNovo: historicoSalario.salarioNovo ,
            motivoAlteracao: historicoSalario.motivoAlteracao
            
        });
    }

    function salvar(){
        if (historicoSalario.id){
            axios.put("http://localhost:5078/HistorcoSalarios/"+ historicoSalario.id, historicoSalario)
            .then(
                listarHistoricoSalarios()
            );
        } 
        else {
            axios.post("http://localhost:5078/HistoricoSalarios", historicoSalario).then(
                listarHistoricoSalarios()
            );
        }        
        cancelar();
    }

    function Formulario(){
        return (
            <form>
                <label htmlFor="funcionarioId" >Id do funcionário</label>
                <input type="number" id="funcionarioId" name="funcionarioId"
                    value={historicoSalario.funcionarioId}
                    onChange={aoDigitar}
                />

                <label htmlFor="dataAlteracao" >Data de alteração</label>
                <input type="datetime-local" id="dataAlteracao" name="dataAlteracao" 
                    value={historicoSalario.dataAlteracao}
                    onChange={aoDigitar}
                />
                    <label htmlFor="salarioAntigo" >Salário antigo</label>
                <input type="number" id="salarioAntigo" name="salarioAntigo" 
                    value={historicoSalario.salarioAntigo}
                    onChange={aoDigitar}
                />
                    <label htmlFor="salarioNovo" >Salário novo</label>
                <input type="number" id="salarioNovo" name="salarioNovo" 
                    value={historicoSalario.salarioNovo}
                    onChange={aoDigitar}
                />
                    <label htmlFor="motivoAlteracao" >Motivo da alteração</label>
                <input type="text" id="motivoAlteracao" name="motivoAlteracao" 
                    value={historicoSalario.motivoAlteracao}
                    onChange={aoDigitar}
                />
                
            <button type="button" onClick={salvar}>Salvar</button>
            <button type="button" onClick={cancelar}>Cancelar</button>

            </form>
        );
    }

    function novoHistoricoSalario(){
        setHistoricoSalario(
            {
                funcionarioId: 0,
                dataAlteracao: "",
                salarioAntigo: 0 ,
                salarioNovo: 0 ,
                motivoAlteracao: ""
                
            }
        )
    }
    
    function Tabela(historicoSalarios){
        return(
            <>
                <button onClick={()=>{novoHistoricoSalario();}}>Novo Historico de salário</button> 
                <table>
                    {listarHistoricoSalarios()}
                <tr>
                    <th>ID</th>
                    <th>Id Funcionário</th>
                    <th>Data da alteração</th>
                    <th>Salário antigo</th>
                    <th>Salário novo</th>
                    <th>Motivo da alteração</th>
                    <th>Ações</th>
                </tr>
                { Linhas(historicoSalarios) }
                </table> 
            </>
        );
    }

    function conteudoPrincipal(){
        if (historicoSalario == null){
            return Tabela(historicoSalarios);
        } else {
            return Formulario();
        }
    }

    return(       
        <div>
		    <h1>Cadastro de Histórico de Salários</h1>            
            { conteudoPrincipal() }                               
        </div>
    );

}
export default HistoricoSalarios;