function excluirSolicitacao() {
    const id = document.getElementById("id_solicitacao").value;

    if (!id) {
        alert("Informe o ID da solicitação!");
        return;
    }

    const confirmar = confirm("Tem certeza que deseja excluir a solicitação ID " + id + "?");
    if (!confirmar) return;

    fetch("http://localhost:3000/delete_solicitacao/" + id, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        document.getElementById("id_solicitacao").value = "";
    })
    .catch(err => {
        alert("Erro ao excluir: " + err);
    });
}
