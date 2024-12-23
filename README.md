🖥️ Estrutura do Front-End
Este documento apresenta a estrutura do front-end do projeto e o detalhamento das decisões estruturais tomadas para garantir escalabilidade, manutenibilidade e organização eficiente do código.

📂 Estrutura do Projeto
A estrutura do projeto foi projetada para separar as responsabilidades de forma clara, promovendo a reutilização de código e a facilidade de manutenção.

frontend/
├── .vscode/               # Configurações do editor
├── node_modules/          # Dependências instaladas
├── src/
│   ├── assets/            # Arquivos estáticos (imagens, ícones, etc.)
│   ├── components/        # Componentes Vue reutilizáveis
│   ├── composables/       # Funções reutilizáveis (composables)
│   ├── enums/             # Enumerações usadas no projeto
│   ├── graphql/           # Configuração do Apollo Client e queries/mutations
│   ├── layouts/           # Layouts principais da aplicação
│   ├── model/             # Definições de modelos e interfaces
│   ├── pages/             # Páginas principais da aplicação
│   ├── plugins/           # Plugins adicionais (ex.: Vuetify)
│   ├── routes/            # Configuração das rotas
│   ├── stores/            # Gerenciamento de estado (Pinia)
│   ├── utils/             # Funções utilitárias
│   ├── App.vue            # Componente raiz da aplicação
│   ├── main.ts            # Arquivo principal de entrada
│   └── shims-vue.d.ts     # Declarações de tipos para Vue
├── .editorconfig          # Configuração de estilo de código
├── .env.development       # Variáveis de ambiente para desenvolvimento
├── apolloconfig.js        # Configuração do Apollo Client
├── codegen.ts             # Configuração para geração de tipos GraphQL
├── components.d.ts        # Declarações automáticas de componentes
├── index.html             # Arquivo HTML principal
├── package.json           # Configuração do projeto e dependências
├── tsconfig.json          # Configuração do TypeScript
├── vite.config.mts        # Configuração do Vite
└── yarn.lock              # Controle de versões das dependências (yarn)

🛠️ Tecnologias Utilizadas
Este projeto utiliza tecnologias modernas e eficientes para garantir um desenvolvimento robusto e escalável:

Vue 3: Framework JavaScript progressivo para construção de interfaces.
Vuetify: Biblioteca de componentes baseada no Material Design.
Apollo Client: Cliente GraphQL para integração com APIs.
GraphQL: Linguagem de consulta para comunicação com o servidor (mutations, queries e subscriptions).
Vite: Ferramenta de build rápida e eficiente para Vue.js.
TypeScript: Suporte a tipos estáticos para maior confiabilidade e segurança no código.

🔧 Scripts Disponíveis
Os scripts disponíveis para gerenciar o projeto estão descritos abaixo:

yarn dev: Inicia o servidor de desenvolvimento, permitindo testes locais rápidos.
yarn build: Realiza o build da aplicação.

📋 Decisões Estruturais
Separação de Responsabilidades:

Cada pasta no projeto tem uma responsabilidade clara (ex.: components para componentes reutilizáveis, pages para páginas completas).

Uso de Composables:

A pasta composables contém funções reutilizáveis que encapsulam lógica comum, seguindo o paradigma Composition API do Vue 3.

Integração com GraphQL:

A pasta graphql centraliza as configurações e operações relacionadas ao Apollo Client, garantindo uma comunicação limpa e eficiente com a API.

Gerenciamento de Estado:

A pasta stores organiza o estado global da aplicação usando Pinia, promovendo a centralização do gerenciamento de dados.

Estilo Consistente:

O uso do arquivo .editorconfig garante padronização de estilo entre desenvolvedores e ferramentas.

------------------------------------------------------------------------------------------------------------------------------------------------------------

📚 Backend - Estrutura e Decisões Arquiteturais

Este documento apresenta a organização estrutural e as decisões tomadas para o desenvolvimento do backend da aplicação EdTech, garantindo modularidade, escalabilidade e manutenção.

📂 Estrutura do Projeto
O projeto é dividido em 4 camadas principais, cada uma com uma responsabilidade bem definida. A estrutura é organizada da seguinte forma:

src/
├── 1 - Core/               # Camada central com entidades e contratos
│   ├── EdTech.Common/      # Recursos e utilitários comuns
│   ├── EdTech.Domain/      # Definição de entidades do domínio
│   ├── EdTech.Interfaces/  # Contratos e interfaces
│
├── 2 - Data/               # Camada de acesso a dados
│   ├── EdTech.Data/        # Implementação do repositório e contexto de dados
│       ├── Configuration/  # Configurações específicas do banco de dados
│       ├── Context/        # Contexto do Entity Framework Core
│       ├── Migrations/     # Arquivos de migração
│       ├── Repositories/   # Repositórios para acesso a dados
│
├── 4 - API/                # Camada de API para exposição de endpoints
│   ├── EdTech.API/         # Implementação da API REST e GraphQL
│       ├── AutoMapper/     # Configuração do AutoMapper para mapeamento entre DTOs e entidades
│       ├── Dtos/           # Objetos de transferência de dados
│       ├── GraphQL/        # Configurações e resolvers para GraphQL
│       ├── ViewModels/     # Modelos para visualização e apresentação
│       ├── appsettings.json # Configurações da aplicação
│       └── Program.cs      # Ponto de entrada da aplicação
│
└── tests/                  # Testes automatizados

OBS: A Sln se encontra na pasta da camada API.

🏗️ Camadas e Responsabilidades

1️⃣ Core
A camada Core é o núcleo da aplicação e contém os seguintes módulos:

EdTech.Common: Utilitários e constantes comuns para toda a aplicação.
EdTech.Domain: Contém as entidades que representam o domínio do negócio, como modelos de dados e regras fundamentais.
EdTech.Interfaces: Define os contratos e interfaces para os repositórios e serviços, promovendo a inversão de controle (IoC).

2️⃣ Data
A camada Data gerencia o acesso e persistência de dados, garantindo abstração e desacoplamento do banco de dados:

- Configuration: Contém configurações específicas para o Entity Framework Core, como mapeamentos personalizados.
- Context: Implementa o contexto de dados utilizando o Entity Framework Core.
- Migrations: Gerencia as migrações para versionamento do banco de dados.
- Repositories: Implementa os repositórios definidos na camada de Interfaces, facilitando o acesso aos dados.

3️⃣ API
A camada API é responsável por expor os recursos da aplicação, tanto via REST quanto GraphQL:

- AutoMapper: Configura o mapeamento entre entidades e DTOs, facilitando a transformação de dados.
- Dtos: Contém os objetos de transferência de dados que trafegam entre a API e o cliente.
- GraphQL: Configuração da API GraphQL, incluindo resolvers e esquemas.
- ViewModels: Modelos para apresentação e formatação de dados para os clientes.
- Program.cs: Configuração da aplicação, incluindo middlewares e injeção de dependência.

Pontos importantes: 

Por que a camada de Application não foi utilizada?
A decisão de não incluir uma camada de Application no projeto está diretamente relacionada ao uso do GraphQL e à abstração fornecida por seus resolvers (Queries, Mutations e Subscriptions). Aqui estão os principais motivos para essa escolha:

Por que a camada de Application não foi utilizada?
A escolha de não incluir uma camada de Application no projeto foi motivada pela capacidade do GraphQL de abstrair e centralizar as responsabilidades nos resolvers, eliminando a necessidade de intermediários. Os principais motivos são:

- Redundância de Camadas
Os resolvers já processam regras, transformam dados (DTOs/ViewModels) e orquestram chamadas ao domínio e repositórios. Isso torna a camada de Application desnecessária.

- GraphQL como Interface Flexível
O GraphQL já lida com:

Queries: Recuperação de dados no formato desejado.
Mutations: Alterações de estado.
Subscriptions: Notificações em tempo real.
Os resolvers conectam diretamente o cliente às camadas Domain e Data.
Evitar Acoplamento Desnecessário
A lógica de transformação e validação é tratada nos resolvers, mantendo o código enxuto e evitando duplicações.

- Tipagem e Customização
O esquema do GraphQL define claramente entradas e saídas, eliminando a necessidade de uma camada intermediária para transformação de dados.

- Foco no Domínio
A lógica de negócio está centralizada na camada Domain, enquanto os resolvers expõem essa lógica de forma flexível e ajustada às necessidades do cliente.

Essa abordagem simplifica a arquitetura e melhora a manutenção do sistema.

🛠️ Tecnologias Utilizadas
Este backend utiliza tecnologias modernas para garantir robustez e escalabilidade:

- C# e .NET 8: Linguagem principal e framework robusto para desenvolvimento backend.
- Entity Framework Core: ORM para abstração de acesso ao banco de dados.
- GraphQL com HotChocolate: Comunicação flexível e eficiente entre cliente e servidor.
- AutoMapper: Facilita o mapeamento entre entidades e DTOs.
- PostgreSQL: Banco de dados relacional escalável e confiável para persistência de dados.

📜 Documentação de Comandos do Entity Framework Core (EF Core)

Neste projeto  os comandos de Migrations do EF Core devem ser executados no terminal do projeto EdTech.Data.csproj(botão direito => terminal).

A seguir os comandos utilizados:

1. Criar uma Nova Migração

dotnet ef migrations add InitialCreate --context AppDbContext --startup-project ../EdTech/EdTech.API.csproj
Este comando cria uma nova migração chamada InitialCreate baseada nas alterações do modelo no contexto de dados.

add: Adiciona uma nova migração.
InitialCreate: Nome da migração (substitua pelo nome que preferir).
--context AppDbContext: Especifica o contexto a ser usado.
--startup-project ../EdTech/EdTech.API.csproj: Indica o projeto de inicialização.

2. Atualizar o Banco de Dados

dotnet ef database update --context AppDbContext --startup-project ../EdTech/EdTech.API.csproj
Este comando aplica as migrações pendentes ao banco de dados.

--context AppDbContext: Define o contexto de banco de dados que será usado. Neste caso, AppDbContext.
--startup-project ../EdTech/EdTech.API.csproj: Define o projeto de inicialização. Aqui, o projeto principal da API (EdTech.API).

3. Reverter para uma Migração Anterior

dotnet ef database update MigrationAnterior --context AppDbContext --startup-project ../EdTech/EdTech.API.csproj
Este comando reverte o banco de dados para um estado definido por uma migração anterior.

MigrationAnterior: Substitua pelo nome da migração para a qual deseja reverter (exemplo: InitialCreate).
--context AppDbContext: Define o contexto de banco de dados.
--startup-project ../EdTech/EdTech.API.csproj: Define o projeto de inicialização.

4. Remover a Última Migração

dotnet ef migrations remove --context AppDbContext --startup-project ../EdTech/EdTech.API.csproj
Este comando remove a última migração criada, desde que ela ainda não tenha sido aplicada ao banco de dados.

remove: Remove a última migração.
--context AppDbContext: Especifica o contexto usado.
--startup-project ../EdTech/EdTech.API.csproj: Indica o projeto de inicialização.

📖 Notas Adicionais
Verificar o Status Atual das Migrações
Use o comando abaixo para listar as migrações aplicadas ao banco:

dotnet ef migrations list --context AppDbContext --startup-project ../EdTech/EdTech.API.csproj

Dicas Importantes:

Sempre valide o arquivo de migração gerado antes de aplicá-lo ao banco para evitar alterações indesejadas.
Caso precise criar migrações adicionais ou reverter mudanças, garanta que a versão atual do banco de dados esteja alinhada com o estado do código.

Ajuda do EF Core
Para mais opções e informações sobre comandos, utilize:

dotnet ef --help

------------------------------------------------------------------------------------------------------------------------------------------------------------
Feito com 💻 e ☕ por Felipe Alves.