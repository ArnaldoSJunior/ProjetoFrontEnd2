import axios from "axios";
import { useState, useEffect } from "react";

function Cargos() {
    const [cargo, setCargo] = useState({
        id: "",  // Garantir que o id esteja presente no estado
        nome: "",
        descricao: "",
        salarioBase: "",
        departamento: ""
    });
    const [cargos, setCargos] = useState([]);

    // Função para listar os cargos
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

    // Função para excluir um cargo
    function excluir(id) {
        axios.delete("http://localhost:5078/Cargos/" + id)
            .then(() => {
                listarCargos();
            })
            .catch((error) => {
                console.error("Erro ao excluir cargo:", error);
            });
    }

    // Função para renderizar as linhas da tabela de cargos
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

    // Função para iterar sobre os cargos e gerar as linhas da tabela
    function Linhas() {
        return cargos.map((cargo) => Linha(cargo));
    }

    // Função para cancelar a edição de cargo
    function cancelar() {
        setCargo({
            id: "",  // Garantir que o id seja limpo ao cancelar
            nome: "",
            descricao: "",
            salarioBase: "",
            departamento: ""
        });
        console.log("Formulário cancelado e estado do cargo limpo.");
    }

    // Função para lidar com a digitação no formulário
    function aoDigitar(e) {
        setCargo({
            ...cargo,
            [e.target.name]: e.target.value
        });
    }

    // Função para editar um cargo
    function editar(cargo) {
        setCargo(cargo);
        console.log("Editando cargo:", cargo);
    }

    // Função para salvar o cargo (novo ou editado)
    function salvar() {
        const payload = {
            nome: cargo.nome,
            descricao: cargo.descricao,
            salarioBase: cargo.salarioBase,
            departamento: cargo.departamento
        };

        console.log("Salvando cargo:", payload);

        if (cargo.id) {
            // Se o cargo tem id, então é uma edição
            axios.put("http://localhost:5078/Cargos/" + cargo.id, payload)
                .then(() => {
                    listarCargos();
                    cancelar(); // Limpar os campos após salvar
                })
                .catch((error) => {
                    console.error("Erro ao salvar cargo:", error);
                });
        } else {
            // Se não tem id, então é uma criação
            axios.post("http://localhost:5078/Cargos", payload)
                .then(() => {
                    listarCargos();
                    cancelar(); // Limpar os campos após salvar
                })
                .catch((error) => {
                    console.error("Erro ao criar cargo:", error);
                });
        }
    }

    // Formulário para criar ou editar um cargo
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

    // Função para criar um novo cargo
    function novoCargo() {
        setCargo({
            id: "",  // Garantir que o id seja limpo para nova criação
            nome: "",
            descricao: "",
            salarioBase: "",
            departamento: ""
        });
    }

    // Função para renderizar a tabela de cargos
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

    // Renderiza o conteúdo principal: ou a tabela de cargos ou o formulário
    function conteudoPrincipal() {
        console.log("Renderizando conteúdo principal.");
        if (!cargo.id) {
            return Tabela(); // Se o cargo não tem id, renderiza a tabela
        } else {
            return Formulario(); // Se o cargo tem id, renderiza o formulário de edição
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