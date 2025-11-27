// Função para carregar cargos do backend e popular os selects
async function carregarCargos(select = null) {
    try {
        const res = await fetch('http://localhost:3000/list_cargo');
        const json = await res.json();
        const cargos = json.cargo; // array de objetos {id_cargo, nome}

        const selects = select ? [select] : document.querySelectorAll('select[name="cargo"]');

        selects.forEach(s => {
            s.innerHTML = '<option value="">Selecione o cargo</option>';
            cargos.forEach(c => {
                const option = document.createElement('option');
                option.value = c.id_cargo;  // envia o ID do cargo
                option.textContent = c.nome; // mostra o nome para o usuário
                s.appendChild(option);
            });
        });
    } catch (err) {
        console.error('Erro ao carregar cargos:', err);
        alert('Não foi possível carregar a lista de cargos.');
    }
}

// Popula o primeiro select da tabela ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const primeiroSelect = document.querySelector('select[name="cargo"]');
    if (primeiroSelect) carregarCargos(primeiroSelect);
});

// Adicionar nova linha de funcionário
function adicionarLinha() {
    const tabela = document.getElementById('tabela-corpo');
    const novaLinha = document.createElement('tr');

    novaLinha.innerHTML = `
        <td><input type="text" placeholder="Ex: 002" name="id_funcionario"></td>
        <td><input type="text" placeholder="Nome do funcionário" name="nome"></td>
        <td><select name="cargo"></select></td>
        <td><input type="date" name="data_admissao"></td>
        <td><input type="text" placeholder="Usuário" name="usuario"></td>
        <td><input type="password" placeholder="Senha" name="senha"></td>
    `;

    tabela.appendChild(novaLinha);

    const selectNovo = novaLinha.querySelector('select[name="cargo"]');
    carregarCargos(selectNovo);
}

// Envio do formulário para backend
const form = document.getElementById('form-funcionarios');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const linhas = document.querySelectorAll('#tabela-corpo tr');
    const funcionarios = [];

    linhas.forEach(tr => {
        const inputs = tr.querySelectorAll('input, select');
        const funcionario = {};
        inputs.forEach(input => {
            funcionario[input.name] = input.value;
        });
        funcionarios.push(funcionario);
    });

    try {
        for (const f of funcionarios) {
            const response = await fetch('http://localhost:3000/cad_func', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(f)
            });

            const result = await response.json(); // agora sempre retorna JSON

            if (!response.ok) {
                throw new Error(result.message || "Erro desconhecido");
            }
        }

        alert('Funcionário(s) cadastrado(s) com sucesso!');
        // opcional: limpar a tabela ou resetar os inputs
        document.getElementById('tabela-corpo').innerHTML = '';
    } catch (err) {
        console.error('Erro:', err);
        alert('Erro ao conectar com o servidor: ' + err.message);
    }
});
