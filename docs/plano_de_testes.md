# Plano de Testes (RQNF12, 13, 14)

Este documento detalha a estratégia de testes para o projeto "Gestor de Prioridade".

## 1. Estratégia de Testes e Prioridades (RQNF12)

### Estratégia Adotada
Para garantir a maior cobertura possível em curto prazo, a estratégia adotada foi baseada na Pirâmide de Testes, priorizando a lógica de negócio crítica (cálculo de SLA) [cite: 31, 91] e os fluxos principais do usuário.

1.  **Testes Unitários (Base):** Foco total na "Matriz de Decisão de Urgência" (RF004)[cite: 91], garantindo que o `TicketService` classifica 100% dos casos corretamente. Isso cumpre o requisito RQNF3[cite: 53].
2.  **Testes E2E (Topo):** Foco em validar os "caminhos felizes" e os 6 cenários de teste  do ponto de vista do usuário (caixa-preta).

### Prioridades de Curto Prazo (Para esta entrega)
1.  **(P1 - Crítico) Testes E2E:** Implementar os 6 cenários de teste (Seção 7)  com Cypress, validando o fluxo completo: criar ticket (UI) -> salvar no banco (API) -> processar fila (API) -> atualizar a UI[cite: 72, 79, 83].
2.  **(P2 - Alto) Testes Unitários da Regra de Negócio:** Cobertura de 100% da função `calcularUrgencia` no `TicketService`, garantindo que a lógica de SLA (RF004) [cite: 91] está correta.
3.  **(P3 - Médio) Testes Unitários dos Controllers:** Garantir que o `TicketController` gerencia o fluxo de requisição/resposta, trata erros e retorna os códigos de status HTTP corretos.

---

## 2. Classificação dos Testes Executados (RQNF13)

### Testes de Caixa-Branca (White-Box)
Testes que validam a estrutura interna do código-fonte:
* **`backend/src/tests/services/ticketService.test.js`**: Testes unitários (Jest) da lógica de `calcularUrgencia` e métodos de serviço.
* **`backend/src/tests/controllers/ticketController.test.js`**: Testes unitários (Jest) do controller, mockando o service para verificar o tratamento de `req`, `res` e `next`.

### Testes de Caixa-Preta (Black-Box)
Testes que validam a funcionalidade sem conhecimento do código interno:
* **`cypress/e2e/triagem_tickets.cy.js`**: Teste E2E (Cypress) que simula um usuário criando e processando tickets no navegador.
* **Testes Manuais/Exploratórios:** Executados para identificar bugs não cobertos pelos scripts (necessário para o RQNF15).

---

## 3. Categorias de Testes Executadas (RQNF14)

* **Testes Unitários:** Executados com Jest para validar os menores "pedaços" de lógica isoladamente (Services, Controllers).
* **Testes E2E (End-to-End):** Executados com Cypress para validar o fluxo completo da aplicação (Frontend + Backend) como um usuário real.
* **Testes Funcionais:** (Cobre E2E e Unitários) Garantem que os requisitos funcionais (RF001, RF002, RF003, RF004) [cite: 72, 79, 83, 91] foram atendidos.
* **Testes de UI:** (Parte do E2E) Garantem que a interface reage corretamente às ações, como atualizar as listas "Pendente" e "Classificada" após o processamento [cite: 88-90].