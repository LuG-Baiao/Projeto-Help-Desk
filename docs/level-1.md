```mermaid
graph TD

Cliente -->|Acompanha status do serviço| Sistema[Help Tech]

Atendente --> |Cadastra Cliente e serviços| Sistema

Tecnico -->|Atualiza o Status do serviço| Sistema

Sistema -->|Envia Notificação de cada status do serviço|Email[Email SMTP]
Email -->|Envia email de cada Status ao Cliente|Cliente
