// Carregar lista de cidades no dropdown
async function carregarCidades() {
    try {
        const response = await fetch("http://localhost:3000/cidade");
        const data = await response.json();

        const select = document.getElementById("id_cidade");

        select.innerHTML = ""; // limpa

        data.cidade.forEach(c => {
            const option = document.createElement("option");
            option.value = c.id_cidade;
            option.textContent = c.cidade;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error("Erro ao carregar cidades:", erro);
    }
}

// Enviar cadastro
document.getElementById("formCliente").addEventListener("submit", async function (e) {
    e.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value,
        cpf_cnpj: document.getElementById("cpf_cnpj").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        cep: document.getElementById("cep").value,
        bairro: document.getElementById("bairro").value,
        telefone: document.getElementById("telefone").value,
        id_cidade: document.getElementById("id_cidade").value
    };

    try {
        const response = await fetch("http://localhost:3000/cad_cliente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const res = await response.json();
        alert(res.message);

    } catch (erro) {
        alert("Erro ao cadastrar cliente");
        console.error(erro);
    }
});

carregarCidades();
