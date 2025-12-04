const nodemailer = require("nodemailer");
const log_email = require("../db/logEmail")


//Configurando email
const transporter  = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user:"helpteche2025@gmail.com",
    pass:"vuxm gvcc imxq ymvb"
  }
});

async function enviarEmail(destinatario, assunto, mensagem) {
    try {
        // ENVIA O EMAIL
        await transporter.sendMail({
            from: "HELP TECH <helpteche2025@gmail.com>",
            to: destinatario,
            subject: assunto,
            html: mensagem
        });

        console.log("E-mail enviado para:", destinatario);

        // GRAVA O LOG NO BANCO
        await log_email.create({
            data_envio: new Date(),
            email_enviado: destinatario
        });

        console.log("Log salvo com sucesso!");

    } catch (erro) {
        console.error("Erro ao enviar email:", erro);
    }
}

module.exports = enviarEmail;