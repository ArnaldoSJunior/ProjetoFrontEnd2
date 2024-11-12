import axios from "axios";
import { useState, useEffect } from "react";

function Funcionarios(){

    const[funcionario, setFuncionario] = useState(null);
    const[funcionarios, setFuncionarios] = useState([]);

    function listarFuncionarios(){
        axios.get("http://localhost:5078/Funcionarios")
            .then(
                (resposta) => {
                    console.log(resposta.data);
                    setFuncionarios(resposta.data);
                } );
    }

    useEffect(() => {
        listarFuncionarios();
    }, []);
    
    function excluir(id){
        axios.delete("http://localhost:5078/Funcionarios/" + id)
        .then(()=>{
                listarFuncionarios();
            }
        );
    }

    function Linha(index, funcionario){
        return (
            <tr key={index}>
                <td>{funcionario.id}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cpf}</td>
                <td>{funcionario.cargo}</td>
                <td>{funcionario.dataContratacao}</td>
                <td>{funcionario.salario}</td>
                <td>{funcionario.endereco}</td>
                <td>{funcionario.telefone}</td>
                <td>
                   <button onClick={()=>{ excluir(funcionario.id);}}>Excluir</button>
                   <button onClick={()=> {editar(funcionario);}}>Editar</button>
                </td>
            </tr>
        );
    }

    function Linhas(funcionarios){

        const linhas = [];
        for(let i = 0; i < funcionarios.length; i++){
            const funcionario = funcionarios[i];
            linhas[i] = Linha(i, funcionario);
        }
        return linhas;
    }

    function cancelar(){
        setFuncionario(null);
    }

    function aoDigitar(e) {
        const { name, value } = e.target;
        setFuncionario({
            ...funcionario, 
            [name]: value     
        });
    }

    function editar(funcionario){
       
        setFuncionario({
            id : funcionario.id,
            nome: funcionario.nome,
            cpf: funcionario.cpf,
            cargo: funcionario.cargo,
            dataContratacao: funcionario.dataContratacao,
            salario: funcionario.salario,
            endereco: funcionario.endereco,
            telefone: funcionario.telefone

            
        });
    }

    function salvar(){
        if (funcionario.id){
            axios.put("http://localhost:5078/Funcionarios/"+ funcionario.id, funcionario)
            .then(
                listarFuncionarios()
            );
        } 
        else {
            axios.post("http://localhost:5078/Funcionarios", funcionario).then(
                listarFuncionarios()
            );
        }        
        cancelar();
    }


    function Formulario(){
        return (
            <form>
                <label htmlFor="nome" >Nome</label>
                <input type="text" id="nome" name="nome"
                    value={funcionario.nome}
                    onChange={aoDigitar}
                />
                <label htmlFor="cpf" >cpf</label>
                <input type="text" id="cpf" name="cpf" 
                    value={funcionario.cpf}
                    onChange={aoDigitar}
                />
                  <label htmlFor="cargo" >cargo</label>
                <input type="text" id="cargo" name="cargo" 
                    value={funcionario.cargo}
                    onChange={aoDigitar}
                />  <label htmlFor="dataContratacao" >data de contratação</label>
                <input type="datetime-local" id="dataContratacao" name="dataContratacao" 
                    value={funcionario.dataContratacao}
                    onChange={aoDigitar}
                />  <label htmlFor="salario" >salario</label>
                <input type="number" id="salario" name="salario" 
                    value={funcionario.salario}
                    onChange={aoDigitar}
                />  <label htmlFor="endereco" >endereco</label>
                <input type="text" id="endereco" name="endereco" 
                    value={funcionario.endereco}
                    onChange={aoDigitar}
                />  <label htmlFor="telefone" >telefone</label>
                <input type="text" id="telefone" name="telefone" 
                    value={funcionario.telefone}
                    onChange={aoDigitar}
                />
                
          <button type="button" onClick={salvar}>Salvar</button>
          <button type="button" onClick={cancelar}>Cancelar</button>

            </form>
        );
    }

    function novoFuncionario(){
        setFuncionario(
            {
                nome: "",
                cpf: "",
                cargo: "analista",
                dataContratacao: "2024-11-06T00:00:00",
                salario: 0,
                endereco: "",
                telefone: ""
            }
        )
    }


    function Tabela(funcionarios){
        return(
            <>
              <button onClick={()=>{novoFuncionario();}}>Novo funcionário</button> 
                <table>
                    {listarFuncionarios()}
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Cpf</th>
                    <th>Cargo</th>
                    <th>Data de contratação</th>
                    <th>Salário</th>
                    <th>Endereço</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
                { Linhas(funcionarios) }
             </table> 
            </>
        );
    }

    function conteudoPrincipal(){
        if (funcionario == null){
            return Tabela(funcionarios);
        } else {
            return Formulario();
        }
    }

    return(       
        <div>
		    <h1>Cadastro de Funcionários</h1>            
            { conteudoPrincipal() }                               
        </div>
    );



}
export default Funcionarios;