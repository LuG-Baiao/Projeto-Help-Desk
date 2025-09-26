# Diagrama de Contexto (Nível 1) - Help DEsk

Este diagrama apresenta o contexto geral do **sistema HelpDesk – Help Tech**, evidenciando seus principais usuários: Atendente, Cliente e Técnico, além do serviço externo Servidor de Email (SMTP).
O sistema permite que o Atendente cadastre clientes e novos serviços, o Técnico atualize o status das solicitações e o Cliente consulte serviços em aberto e acompanhe o andamento de cada solicitação.
O sistema também se integra ao Servidor de Email (SMTP) para enviar notificações automáticas sobre as atualizações de status.

```mermaid
graph TD

Cliente -->|Acompanha status do serviço| Sistema[Help Tech]

Atendente --> |Cadastra Cliente e serviços| Sistema

Tecnico -->|Atualiza o Status do serviço| Sistema

Sistema -->|Envia Notificação de cada status do serviço|Email[Email SMTP]
Email -->|Envia email de cada Status ao Cliente|Cliente

