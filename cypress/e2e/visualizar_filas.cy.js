describe("Visualar Filas de Tickets", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
    });

    it("Deve exibir tickets na fila pendente", () => {
        cy.criarTicket("Teste de fila PENDENTE", "Descrição do teste", "GRATUITO");

        cy.verificarTicketNaFilaPendente("Teste de fila PENDENTE", "GRATUITO");
    });

    it("Deve exibir tickets na fila classificada", () => {
        cy.criarTicket("Teste de fila CLASSIFICADA", "Descrição do teste", "PREMIUM");

        cy.processarFila();

        cy.verificarTicketNaFilaClassificada("Teste de fila CLASSIFICADA", "PREMIUM");
    });
});