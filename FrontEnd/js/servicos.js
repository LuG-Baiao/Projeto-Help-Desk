let listaStatus = [];

// Carrega todos os status da API
async function carregarStatus() {
    try {
        const res = await fetch("http://localhost:3000/Status");
        const json = await res.json();
        listaStatus = json.status;  // armazena os status
    } catch (erro) {
        console.error("Erro ao carregar status:", erro);
    }
}

async function carregarServicos() {
    const tbody = document.querySelector("#tabela-servicos tbody");
    tbody.innerHTML = "";

    await carregarStatus(); // garante que o status esteja carregado ANTES da tabela

    try {
        const res = await fetch("http://localhost:3000/lista_solicitacoes");
        const servicos = await res.json();

        servicos.forEach(serv => {
            const tr = document.createElement("tr");

            // monta o select de status dinamicamente
            let selectStatus = `<select class="select-status" data-id="${serv.id_solicitacao}">`;

            listaStatus.forEach(st => {
                selectStatus += `
                    <option value="${st.id_status}" ${st.desc_status === serv.desc_status ? "selected" : ""}>
                        ${st.desc_status}
                    </option>
                `;
            });

            selectStatus += "</select>";

            tr.innerHTML = `
                <td>${serv.id_solicitacao}</td>
                <td>${serv.descricao_solicit}</td>
                <td>${serv.cliente}</td>
                <td>${serv.email}</td>
                <td>${serv.telefone}</td>
                <td>${serv.responsavel}</td>
                <td>${serv.desc_servico}</td>
                <td>${serv.desc_status}</td>

                <td>
                    ${selectStatus}
                </td>

                <td>
                    <button class="btn-salvar" data-id="${serv.id_solicitacao}">
                        Salvar
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        ativarBotoes();
    } catch (erro) {
        console.error("Erro ao carregar serviços:", erro);
    }
}

function ativarBotoes() {
    document.querySelectorAll(".btn-salvar").forEach(botao => {
        botao.addEventListener("click", async () => {
            const id = botao.getAttribute("data-id");
            const select = document.querySelector(`select[data-id='${id}']`);
            const novoStatus = Number(select.value);

            try {
                const res = await fetch(`http://localhost:3000/atualiza_status_servico/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_status: novoStatus })
                });

                // lê como texto se não for JSON
                const texto = await res.text();

                let json;
                try {
                    json = JSON.parse(texto);
                } catch {
                    console.error("Resposta não JSON:", texto);
                    throw new Error("A API não retornou JSON.");
                }

                if (!res.ok) throw new Error(json.message || "Erro no servidor");

                alert("Status atualizado com sucesso!");
                carregarServicos();
            } catch (e) {
                alert("Erro ao atualizar: " + e.message);
            }
        });
    });
}

window.addEventListener("DOMContentLoaded", carregarServicos);
