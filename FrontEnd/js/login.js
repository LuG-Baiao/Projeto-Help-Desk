async function logar() {
    const usuario = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.erro);
            return;
        }

        // SALVANDO O USUÁRIO LOGADO (opcional)
        localStorage.setItem("usuarioLogado", data.usuario);

        // Redirecionar para a home
        window.location.href = "Home.html";

    } catch (erro) {
        alert("Erro ao conectar ao servidor.");
        console.log(erro);
    }
}