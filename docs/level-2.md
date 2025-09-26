# Diagrama de Containers (Nivel 2) Help Desk
Este diagrama apresenta a visão de containers do **sistema HelpDesk – Help Tech**, destacando os principais elementos que compõem sua arquitetura interna.
O Cliente acessa o sistema por meio do Aplicativo Mobile, enquanto o Atendente e o Técnico utilizam a Aplicação Web (SPA).
Tanto o aplicativo quanto a aplicação web consomem serviços expostos pela **API REST**, responsável por centralizar as regras de negócio, processar requisições e realizar a comunicação com outros componentes.
A API REST se conecta ao **Banco de Dados Relacional**, onde são armazenadas todas as informações de clientes, serviços e solicitações, e também integra-se ao Servidor de Email (SMTP), utilizado para o envio de notificações automáticas de atualização de status aos usuários

```mermaid
graph TD

Cliente -->|Acompanha status do serviço| Mobile[Aplicativo Mobile]

Atendente -->SPA[Aplicacao web]
Tecnico --> SPA

Mobile-->|Faz requisição| API[API REST]

SPA-->|Faz requisição|API

API-->|CRUD Dados|DB[Banco de dados Relacional]

API-->|Envia Notificações|Email[SMT]


