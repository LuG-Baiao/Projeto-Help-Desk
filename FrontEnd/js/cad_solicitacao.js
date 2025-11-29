/* ====== ARQUIVO: cadastroServico.js ====== */

// Carregar dropdown de Funcionários
async function carregarFuncionarios() {
    const select = document.getElementById("responsavel");

    try {
        const res = await fetch("http://localhost:3000/lista_funcionarios");
        const json = await res.json();
        const funcionarios = json.funcionarios;

        select.innerHTML = '<option value="">Selecione o responsável</option>';

        funcionarios.forEach(f => {
            const opt = document.createElement("option");
            opt.value = f.id_funcionario;
            opt.textContent = f.nome;
            select.appendChild(opt);
        });
    } catch (e) {
        alert("Erro ao carregar responsáveis.");
        console.error(e);
    }
}

// Carregar dropdown Tipo de Serviço
async function carregarTiposServico() {
    const select = document.getElementById("tipo_servico");

    try {
        const res = await fetch("http://localhost:3000/tp_servico");
        const json = await res.json();
        const tipos = json.servico;

        select.innerHTML = '<option value="">Selecione o tipo de serviço</option>';

        tipos.forEach(t => {
            const opt = document.createElement("option");
            opt.value = t.id_tipo_servico;
            opt.textContent = t.desc_servico;
            select.appendChild(opt);
        });
    } catch (e) {
        alert("Erro ao carregar tipos de serviço.");
        console.error(e);
    }
}

// Buscar cliente pelo CPF e retornar seu ID
async function buscarClientePorCPF(cpf) {
    try {
        const res = await fetch(`http://localhost:3000/busca_cliente/${cpf}`);

        if (!res.ok) return null;

        const cliente = await res.json();
        return cliente.id_cliente;
    } catch (e) {
        console.error(e);
        return null;
    }
}

// Enviar formulário para o backend
async function enviar() {
    const descricao = document.getElementById("descricao").value;
    const cpf = document.getElementById("cpf_cliente").value;
    const idFuncionario = document.getElementById("responsavel").value;
    const idTipo = document.getElementById("tipo_servico").value;

    if (!descricao || !cpf || !idFuncionario || !idTipo) {
        alert("Preencha todos os campos.");
        return;
    }

    const idCliente = await buscarClientePorCPF(cpf);

    if (!idCliente) {
        alert("CPF incorreto ou cliente não existe.");
        return;
    }

    const payload = {
        descricao_solicit: descricao,
        id_cliente: idCliente,
        id_funcionario: Number(idFuncionario),
        id_tipo_servico: Number(idTipo),
        id_status: 1   // padrão
    };
    console.log("PAYLOAD ENVIADO: ",  payload)
    try {
        const res = await fetch("http://localhost:3000/cria_solicit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json.message);

        alert("Serviço cadastrado com sucesso! ID: " + json.id_solicitacao);
        document.getElementById("form-servico").reset();
    } catch (e) {
        alert("Erro ao criar solicitação: " + e.message);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    carregarFuncionarios(document.getElementById("responsavel"));
    carregarTiposServico(document.getElementById("tipo_servico"));
});
