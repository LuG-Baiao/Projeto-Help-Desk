#  Justificativa e Normalização

##  Três Primeiras Formas Normais

---

### **1FN (Primeira Forma Normal)**

**Aplicação no modelo:**
- Cada entidade possui apenas atributos indivisíveis.  
- O campo `Endereco` foi mantido como um único atributo textual, pois não há necessidade operacional de separá-lo em logradouro, número e complemento.  
- Relações de “1 para N” (como `Cliente - Log_envio_email` e `Produto - Estoque`) foram corretamente transformadas em tabelas separadas, garantindo a atomicidade dos registros.

**Exemplo prático:**
- **Antes:** uma única tabela `Cliente` poderia conter múltiplos e-mails.  
- **Depois:** foi criada a tabela `Log_envio_email` com chave estrangeira `id_cliente`, registrando cada envio separadamente.

---

### **2FN (Segunda Forma Normal)**

**Aplicação no modelo:**
- Todas as tabelas têm chaves primárias simples, eliminando o risco de dependências parciais.  
- A relação entre `Funcionario` e `Cargo` foi separada, criando a tabela `Cargo`, pois o nome do cargo dependia apenas de parte da informação anterior.  
- `Cliente` e `Dim_cidade` foram separadas, garantindo que informações de cidade e UF não dependam do cliente, mas da chave `id_cidade`.

**Exemplo prático:**
- **Antes:** a tabela `Cliente` armazenava “Cidade” e “UF” repetidamente para cada cliente.  
- **Depois:** a tabela `Dim_cidade` centraliza essas informações e o `Cliente` apenas referencia `id_cidade`.

---

### **3FN (Terceira Forma Normal)**

**Aplicação no modelo:**
- A tabela `Solicitacao` separa corretamente as dependências, utilizando chaves estrangeiras para `Status_servico`, `Tipo_servico`, `Cliente` e `Funcionario`.  
- A tabela `Avaliacao` utiliza `id_desc_estrela` para referenciar `descritivos_avaliacao`, evitando duplicação de textos de classificação (ex: “Excelente”, “Bom”, “Regular”).  
- `Estoque` foi normalizada para conter apenas a relação entre produto e quantidade, evitando misturar dados de produto com controle de estoque.

**Exemplo prático:**
- **Antes:** “descrição do status” poderia ser repetida em várias solicitações.  
- **Depois:** a tabela `Status_servico` armazena o texto `desc_status` apenas uma vez, referenciado por chave estrangeira em `Solicitacao`.

---

##  Exemplos Práticos de Redução de Redundâncias

Várias redundâncias foram removidas para garantir consistência e evitar dados repetidos:

- **Cargos:** criou-se a tabela `Cargo`, evitando repetir o nome do cargo em cada funcionário.  
- **Cidades:** a tabela `Dim_cidade` centraliza as informações de cidade e estado, eliminando repetições nos clientes.  
- **Serviços:** as tabelas `Status_servico` e `Tipo_servico` padronizam descrições de status e tipos de serviço.  
- **Avaliações:** a tabela `Descritivos_avaliacao` guarda as classificações de forma única, evitando textos duplicados.  
- **Produtos e Estoque:** separou-se `Produto` e `Estoque`, mantendo descrições únicas e controle de quantidade independente.

---

**Resultado Final:**
Essas mudanças reduziram repetições, facilitaram atualizações e aumentaram a integridade do banco de dados.
