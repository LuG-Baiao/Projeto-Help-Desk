const inputBusca = document.querySelector(".input-busca");
const tabela = document.querySelector("#tabela-clientes tbody");

async function carregarClientes(filtro = "") {
    let url = "http://localhost:3000/clientes";

    if (filtro) {
        url += `?filtro=${filtro}`;
    }

    const resposta = await fetch(url);
    const lista = await resposta.json();

    tabela.innerHTML = "";

    lista.forEach(cli => {
        tabela.innerHTML += `
            <tr>
                <td>${cli.id_cliente}</td>
                <td>${cli.nome}</td>
                <td>${cli.email}</td>
                <td>${cli.telefone}</td>
                <td>${cli.cpf_cnpj}</td>
            </tr>
        `;
    });
}

// carregar tudo ao abrir a página
carregarClientes();

// filtrar enquanto digita
inputBusca.addEventListener("input", () => {
    carregarClientes(inputBusca.value);
});
