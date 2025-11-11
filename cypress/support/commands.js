// Cria um ticket com os campos informados
Cypress.Commands.add("criarTicket", (titulo, descricao, tipoCliente) => {
    if (titulo) cy.get("#titulo").type(titulo);
    if (descricao) cy.get("#descricao").type(descricao);
    if (tipoCliente) cy.get("#tipoCliente").select(tipoCliente);
    cy.get(".form__button").click();
});

// Verifica se o ticket foi criado na lista de pendentes
Cypress.Commands.add("verificarTicketNaFilaPendente", (titulo, tipoCliente) => {
    cy.get(".urgencia-pendente").should("contain", titulo);

    cy.contains('h3', 'Fila Pendente')
        .parent()
        .within(() => {
            cy.contains('li', titulo)
                .should('be.visible')
                .and('contain', `Cliente: ${tipoCliente}`);
        });
});

// Verifica se o ticket foi criado na lista de classificados
Cypress.Commands.add("verificarTicketNaFilaClassificada", (titulo, tipoCliente) => {
    cy.contains('h3', 'Fila Classificada')
        .parent()
        .within(() => {
            cy.contains('h4.ticketList__titulo', titulo)
                .should('be.visible')
                .parent()
                .should('contain', `Cliente: ${tipoCliente}`)
        });
});

// Verifica se o ticket foi classificado com a urgência correta
Cypress.Commands.add("verificarTicketClassificado", (titulo, urgenciaEsperada) => {
    cy.contains('h3', 'Fila Classificada')
        .parent()
        .within(() => {
            cy.contains('h4.ticketList__titulo', titulo)
                .should('be.visible')
                .closest('li.ticketList__item')
                .find('span[class*="ticketList__urgencia-"]')
                .should('have.text', urgenciaEsperada.toUpperCase());
        });
});

// Verifica se a mensagem de erro esperada está sendo exibida
Cypress.Commands.add("verificarMensagemDeErro", (mensagemEsperada) => {
    cy.get(".errorMessage").should("contain", mensagemEsperada);
});

// Processa a fila de tickets pendentes
Cypress.Commands.add("processarFila", () => {
    cy.get(".processButton").click();
});
