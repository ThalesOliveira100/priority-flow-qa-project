# Priority Flow - Sistema de Triagem de Tickets - RQNF6
> Processo Seletivo: FIESC / Senai Soluções Digitais - Analista de Qualidade de Software Júnior (02521/2025)
> Desenvolvido por **Thales Oliveira** - 2025

---

### Descrição Geral
O **Priority Flow** é uma aplicação web desenvolvida com o objetivo de gerenciar e classificar tickets de suporte com base em regras de prioridade e tipo de cliente.

O sistema realiza a **triagem automática de tickets**, atribuindo um nível de urgência conforme identificação de palavras-chave na descrição e rebaixamento de prioridade por categoria de cliente, conforme a **Matriz de Decisão de Urgência** especificada no estudo de caso.

---

### Arquitetura e Tecnologias Utilizadas
| Camada               | Tecnologias                                | Descrição                                                                                     |
| -------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| **Frontend**         | React + Vite + Axios + CSS                 | Interface web responsiva para criação e processamento de tickets.                             |
| **Backend**          | Node.js + Express + Sequelize + PostgreSQL | API REST responsável por gerenciar os tickets, aplicar regras de negócio e persistir dados.   |
| **Testes Unitários** | Jest                                       | Cobertura de testes para controllers e services no backend.                                   |
| **Testes E2E**       | Cypress                                    | Validação do fluxo completo da aplicação (criação, processamento e classificação de tickets). |
| **Banco de Dados**   | PostgreSQL                                 | Armazena as informações dos tickets e seus status de triagem.                                 |
| **ORM**              | Sequelize                                  | Mapeamento dos modelos e controle de validações.                                              |

#### Motivos de escolha da stack:
**Frontend**: Devido à necessidade de atualização do estado do ticket sem o refresh na página, enxerguei o React como a ferramenta ideal a ser utilizada, visto que com ele é possível desenvolver rapidamente e de forma moderna, utilizando a componentização dos elementos na página e funções auxiliares como *UseEffect* e *UseState*. O Vite e o Axios foram escolhidos como auxiliares devido a proximidade que tenho com as ferramentas.

**Backend**: Optei por utilizar o Node.js com Express por sua leveza, velocidade e facilidade de integração com o front-end em React, permitindo uma comunicação fluida via API REST. O Sequelize foi escolhido como ORM pela sua sintaxe simples e por abstrair a complexidade das queries SQL, garantindo melhor organização e manutenção das regras de negócio.

**Testes**: O Jest foi adotado para os testes unitários devido à sua ampla adoção no ecossistema Node e facilidade de mock, enquanto o Cypress foi a escolha natural para os testes E2E pela clareza de escrita e poder de simular interações reais do usuário.


---

### Estrutura de Diretórios

```
priority_flow.fiesc
├─ backend
│  ├─ .env
│  ├─ config
│  │  └─ db.js
│  ├─ eslint.config.js
│  ├─ jest.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ server.js
│  └─ src
│     ├─ app.js
│     ├─ config
│     │  └─ matrizUrgencia.js
│     ├─ controllers
│     │  └─ ticketController.js
│     ├─ errs
│     │  ├─ ErroBase.js
│     │  ├─ ErroDeBancoDeDados.js
│     │  ├─ ErroValidacao.js
│     │  ├─ ErroViolacaoChaveEstrangeira.js
│     │  ├─ ErroViolacaoChavePrimaria.js
│     │  ├─ NotFound.js
│     │  └─ RequisicaoIncorreta.js
│     ├─ middlewares
│     │  ├─ errorHandler.js
│     │  └─ handler404.js
│     ├─ models
│     │  ├─ index.js
│     │  ├─ Ticket.js
│     │  └─ validadores.js
│     ├─ services
│     │  └─ ticketService.js
│     └─ tests
│        ├─ controllers
│        │  └─ ticketController.test.js
│        ├─ services
│        │  └─ ticketService.test.js
│        ├─ setup
│        │  └─ jest.setup.js
│        └─ __mocks__
│           └─ TicketMock.js
├─ cypress
│  ├─ downloads
│  ├─ e2e
│  │  ├─ criar_tickets.cy.js
│  │  ├─ processar_fila.cy.js
│  │  ├─ validar_urgencias.cy.js
│  │  └─ visualizar_filas.cy.js
│  ├─ fixtures
│  │  └─ tickets.json
│  └─ support
│     ├─ commands.js
│     └─ e2e.js
├─ cypress.config.js
├─ frontend
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ icon.png
│  ├─ src
│  │  ├─ .env
│  │  ├─ App.jsx
│  │  ├─ components
│  │  │  ├─ Dashboard
│  │  │  │  ├─ Dashboard.css
│  │  │  │  └─ index.jsx
│  │  │  ├─ Header
│  │  │  │  ├─ Header.css
│  │  │  │  └─ index.jsx
│  │  │  ├─ TicketForm
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ TicketForm.css
│  │  │  └─ TicketList
│  │  │     ├─ index.jsx
│  │  │     └─ TicketList.css
│  │  ├─ main.jsx
│  │  ├─ services
│  │  │  └─ Api.js
│  │  └─ styles
│  │     ├─ App.css
│  │     └─ index.css
│  └─ vite.config.js
├─ package-lock.json
├─ package.json
└─ README.md
```

--- 

### Como executar o projeto

#### 1. Clonar o repositório

```
git clone https://github.com/SENAI-SD/qa-junior-02521-2025-164.215.656-62
cd priority_flow.fiesc
```

#### 2. Instale as dependências dos três projetos (cypress, backend e frontend)

```
npm install

cd backend
npm install

cd ../frontend
npm install
```

#### 3. Configurar o Banco de Dados (PostgreSQL) local
Crie um banco de dados chamado `priority_flow.fiesc` e/ou configure as credências em `backend/.env`

#### 4. Rodar o servidor
```
cd backend
npm run dev
```

O backend por padrão ficará disponível em:
`http://localhost:3000/`

#### 5. Rodar o frontend

```
cd front end
npm run dev
```

O frontend por padrão ficará disponível em:
`http://localhost:5173`

---

### Principais Funcionalidades

* **RF001**: Criação de tickets com título, descrição e tipo de cliente.
* **RF002**: Visualização de tickets pendentes e classificados.
* **RF003**: Processamento da fila de triagem, aplicando lógica de prioridade automaticamente.
* **RF004**: Cálculo de urgência conforme palavras-chave e regras de rebaixamento por tipo de cliente.
* **RF005**: Atualização dinâmica do dashboard após o processamento.

---

### Possibilidades de melhorias

* Implementar testes de integração;
* Implementar testes unitários do model Ticket;
* Incluir mais comentários explicativos do código;
* Implementar autenticação com JWT;
* Criar mais casos de testes E2E com o Cypress, explorando mais cenários; 
* Componentizar os cards de Ticket;
* Implementar REGEX na Matriz de Urgência, para validar não somente palavras exatamente apresentadas, mas padrões como `PAR(parado, parou, parada)` ou `NÃO FUNC(não funciona, não funcionou)`;
* Estruturar melhor o HTML gerado pelo projeto, para implementar um código que facilite o teste E2E;
* Implementar melhor responsabilidade para dispositivos móveis.

---

## Documentação de Qualidade (QA)

Conforme solicitado nos Requisitos Não Funcionais (RQNF) da avaliação, a documentação de testes do projeto está disponível abaixo:

* **[Especificações Gherkin (RQNF11)](./docs/gherkin_specs.md)**
* **[Plano de Testes (RQNF12, 13, 14)](./docs/plano_de_testes.md)**

---

### Inconsistência identificada em teste funcional manual
**Título da inconsistência**: Ação de "Processar Fila Pendente" pode ser disparada múltiplas vezes, mesmo sem tickets pendentes.

**Passo a passo para reprodução**:

    1. Acesse o sistema Priority Flow;
    2. Crie dois ou mais tickets (ex: Cenário 1 e Cenário 2);
    3. Observe que ambos os tickets aparecem corretamente na Fila Pendente;
    4. Clique no botão "Processar Fila Pendente";
    5. Perceba que mesmo após processar o primeiro lote, não restam tickets pendentes, contudo, o botão permanece habilitado, permitindo que o usuário o utilize novamente.

**Observação**:
    Esse comportamento pode se tornar um problema dependendo da quantidade de usuários que utilizam o sistema simultâneamente, visto que serão realizadas requisições extras ao banco de dados sem haver a necessidade.

    Como o ID dos tickets é por UUID, não há problemas caso o passo a passo seja realizado em duas abas abertas (na segunda com os tickets já processados pelo primeiro e não atualizados).

**Resultado Esperado (Conforme RF003)**: A lógica de processamento (RF003.1)  deve ser executada apenas uma vez. Os tickets devem ser movidos da "Lista 1" para a "Lista 2"  de forma limpa, e o botão "Processar" deveria, idealmente, ficar desabilitado durante o processamento para evitar cliques duplicados.

---

### Requisitos NÃO Atendidos
**RQNF2 - A aplicação deve ser executável via Docker**: Não foi atendido, pois, atualmente, não tenho o conhecimento para utilizar o Docker nos projetos, sei que ele se trata de uma ferramenta que facilita o empacotamento e distribuição do projeto por meio de contêineres, mas ainda não cheguei a praticar. Como o tempo para entrega do projeto estava curto, optei pela segurança.

**RQNF7 - A criação de testes de integração para o backend**: Não foram contruídos testes de integração, pelo mesmo motivo da não implementação do RQNF2, desconhecimento da utilização da ferramenta em projetos, apesar de compreender o conceito e os benefícios providos.

**RQNF10 - Utilização da ferramenta SonarQube**: Este requisito não foi realizado, pois desconheço a ferramenta, e até que o projeto fosse apresentado, sequer sabia sua existência. Pesquisei um pouco sobre e me interessei devido a integração CI/CD e feedbacks claros da avaliação do código fornecidas. Anotei como referência para próximos estudos.

---