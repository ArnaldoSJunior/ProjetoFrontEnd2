import axios from "axios";
import { useState, useEffect } from "react";

function Cargos() {
    const [cargo, setCargo] = useState({
        id: "",  
        nome: "",
        descricao: "",
        salarioBase: "",
        departamento: ""
    });
    const [cargos, setCargos] = useState([]);

    
    function listarCargos() {
        axios.get("http://localhost:5078/Cargos")
            .then((resposta) => {
                console.log("Cargos listados:", resposta.data);
                setCargos(resposta.data);
            })
            .catch((error) => {
                console.error("Erro ao listar cargos:", error);
            });
    }

    useEffect(() => {
        listarCargos();
    }, []);

    
    function excluir(id) {
        axios.delete("http://localhost:5078/Cargos/" + id)
            .then(() => {
                listarCargos();
            })
            .catch((error) => {
                console.error("Erro ao excluir cargo:", error);
            });
    }

    
    function Linha(cargo) {
        return (
            <tr key={cargo.id}>
                <td>{cargo.id}</td>
                <td>{cargo.nome}</td>
                <td>{cargo.descricao}</td>
                <td>{cargo.salarioBase}</td>
                <td>{cargo.departamento}</td>
                <td>
                    <button onClick={() => excluir(cargo.id)}>Excluir</button>
                    <button onClick={() => editar(cargo)}>Editar</button>
                </td>
            </tr>
        );
    }

    
    function Linhas() {
        return cargos.map((cargo) => Linha(cargo));
    }

    
    function cancelar() {
        setCargo({
            id: "",  
            nome: "",
            descricao: "",
            salarioBase: "",
            departamento: ""
        });
        console.log("Formulário cancelado e estado do cargo limpo.");
    }

    
    function aoDigitar(e) {
        setCargo({
            ...cargo,
            [e.target.name]: e.target.value
        });
    }

    
    function editar(cargo) {
        setCargo(cargo);
        console.log("Editando cargo:", cargo);
    }

    function salvar() {
        const payload = {
            nome: cargo.nome,
            descricao: cargo.descricao,
            salarioBase: cargo.salarioBase,
            departamento: cargo.departamento
        };

        console.log("Salvando cargo:", payload);

        if (cargo.id) {
            
            axios.put("http://localhost:5078/Cargos/" + cargo.id, payload)
                .then(() => {
                    listarCargos();
                    cancelar(); 
                })
                .catch((error) => {
                    console.error("Erro ao salvar cargo:", error);
                });
        } else {
            
            axios.post("http://localhost:5078/Cargos", payload)
                .then(() => {
                    listarCargos();
                    cancelar(); 
                })
                .catch((error) => {
                    console.error("Erro ao criar cargo:", error);
                });
        }
    }

   
    function Formulario() {
        console.log("Renderizando formulário para cargo:", cargo);
        return (
            <form>
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={cargo.nome}
                    onChange={aoDigitar}
                />

                <label htmlFor="descricao">Descrição</label>
                <input
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={cargo.descricao}
                    onChange={aoDigitar}
                />

                <label htmlFor="salarioBase">Salário Base</label>
                <input
                    type="number"
                    id="salarioBase"
                    name="salarioBase"
                    value={cargo.salarioBase}
                    onChange={aoDigitar}
                />

                <label htmlFor="departamento">Departamento</label>
                <input
                    type="text"
                    id="departamento"
                    name="departamento"
                    value={cargo.departamento}
                    onChange={aoDigitar}
                />

                <button type="button" onClick={salvar}>Salvar</button>
                <button type="button" onClick={cancelar}>Cancelar</button>
            </form>
        );
    }

   
    function novoCargo() {
        setCargo({
            id: "",  
            nome: "",
            descricao: "",
            salarioBase: "",
            departamento: ""
        });
    }

    
    function Tabela() {
        return (
            <>
                <button onClick={novoCargo}>Novo Cargo</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Salário Base</th>
                            <th>Departamento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Linhas()}
                    </tbody>
                </table>
            </>
        );
    }

  
    function conteudoPrincipal() {
        console.log("Renderizando conteúdo principal.");
        if (!cargo.id) {
            return Tabela(); 
        } else {
            return Formulario(); 
        }
    }

    return (
        <div>
            <h1>Cadastro de Cargos</h1>
            {conteudoPrincipal()}
        </div>
    );
}

export default Cargos;