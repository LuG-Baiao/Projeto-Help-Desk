# Diagramas de Componentes (Nível 3) - API REST Backend
Este diagrama apresenta a decomposição do container API REST do sistema Help-Tech CRM, evidenciando seus principais componentes internos e suas responsabilidades.

- **Componente de Autenticação: responsável por validar credenciais, controlar permissões e garantir a segurança no acesso ao sistema.**

- **Componente de Cadastro de Clientes: permite criar, atualizar e consultar informações dos clientes, servindo de base para os tickets de serviço.**

- **Componente de Gestão de Tickets: gerencia todo o ciclo de vida das solicitações, desde a abertura até a atualização de status.**

- **Componente de Notificações: integra-se ao Servidor de Email (SMTP) para envio automático de mensagens relacionadas ao andamento dos serviços.**

Os Clientes acessam o sistema por meio do Aplicativo Mobile, enquanto Atendentes e Técnicos utilizam a Aplicação Web (SPA). Ambos consomem os serviços expostos pela API, que centraliza as regras de negócio, persiste dados no Banco de Dados Relacional e dispara notificações externas para manter os usuários informados.
```mermaid
graph TD

API[API REST]

API --> Auth[Componente de Autenticação]
API --> Clientes[Componente de Cadastro de Clientes]
API --> Tickets[Componente de Gestão de Tickets]
API --> Notif[Componente de Notificações]

Auth --> DB[(Banco de Dados Relacional)]
Clientes --> DB
Tickets --> DB

Notif --> SMTP[Servidor de Email SMTP]



