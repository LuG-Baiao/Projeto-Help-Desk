# 🗃️ Estrutura do Banco de Dados Help Tech

## 📋 Tabela: `cargo`
```sql
create table cargo(
    id_cargo int not null primary key,
    nome varchar(100) not null
);
```

---

## 👔 Tabela: `funcionario`
```sql
create table funcionario(
    id_funcionario int not null primary key,
    nome varchar(150) not null,
    id_cargo int,
    data_admissao date not null,
    foreign key (id_cargo) references cargo(id_cargo)
);
```
**Relações:**
- `id_cargo` → referência à tabela `cargo`

---

## 🏙️ Tabela: `dim_cidade`
```sql
create table dim_cidade(
    id_cidade int not null primary key,
    cidade varchar(100) not null,
    uf char(2)
);
```

---

## 👤 Tabela: `cliente`
```sql
create table cliente(
    id_cliente int not null AUTO_INCREMENT primary key,
    nome varchar(150) not null,
    cpf_cnpj char(14) not null,
    email varchar(120) unique not null,
    endereco varchar(200),
    id_cidade int,
    cep varchar(10),
    bairro varchar(80),
    telefone varchar(20),
    FOREIGN KEY (id_cidade) references dim_cidade(id_cidade)
);
```
**Relações:**
- `id_cidade` → referência à tabela `dim_cidade`

---

## 📧 Tabela: `log_envio_email`
```sql
create table log_envio_email(
    id_log int AUTO_INCREMENT primary key,
    data_envio datetime not null,
    email_enviado varchar(200)
);
```

---

## ⭐ Tabela: `descritivos_avaliacao`
```sql
create table descritivos_avaliacao(
    id int not null primary key,
    tipo_classificacao_estrela varchar(50)
);
```

---

## 📦 Tabela: `produto`
```sql
create table produto(
    id_produto int not null primary key,
    descricao_produto varchar(150) not null
);
```

---

## 🏭 Tabela: `estoque`
```sql
create table estoque(
    id_estoque int AUTO_INCREMENT not null primary key,
    id_produto int,
    quantidade int not null,
    FOREIGN key (id_produto) references produto(id_produto)
);
```
**Relações:**
- `id_produto` → referência à tabela `produto`

---

## 🛠️ Tabela: `tipo_servico`
```sql
create table tipo_servico(
    id_tipo_servico int not null AUTO_INCREMENT PRIMARY key,
    desc_servico varchar(150) not null
);
```

---

## 📊 Tabela: `status_servico`
```sql
create table status_servico(
    id_status int not null AUTO_INCREMENT primary key,
    desc_status varchar(120) not null
);
```

---

## 📑 Tabela: `solicitacao`
```sql
create table solicitacao(
    id_solicitacao int not null AUTO_INCREMENT PRIMARY key,
    data_solcitacao datetime default CURRENT_TIMESTAMP,
    descricao_solicit text,
    id_status int,
    id_cliente int,
    id_funcionario int,
    id_tipo_servico int,
    FOREIGN key (id_status) references status_servico(id_status),
    FOREIGN key (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN key (id_funcionario) references funcionario(id_funcionario),
    FOREIGN key (id_tipo_servico) references tipo_servico(id_tipo_servico)
);
```
**Relações:**
- `id_status` → referência à tabela `status_servico`  
- `id_cliente` → referência à tabela `cliente`  
- `id_funcionario` → referência à tabela `funcionario`  
- `id_tipo_servico` → referência à tabela `tipo_servico`

---

## 📝 Tabela: `avaliacao`
```sql
create table avaliacao(
    id_avaliacao int not null AUTO_INCREMENT PRIMARY key,
    data_avaliacao datetime DEFAULT CURRENT_TIMESTAMP,
    desc_avaliacao text,
    id_servico int,
    id_cliente int,
    id_desc_estrela int,
    FOREIGN key (id_servico) references solicitacao(id_solicitacao),
    FOREIGN key (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN key (id_desc_estrela) references descritivos_avaliacao(id)
);
```
**Relações:**
- `id_servico` → referência à tabela `solicitacao`  
- `id_cliente` → referência à tabela `cliente`  
- `id_desc_estrela` → referência à tabela `descritivos_avaliacao`

