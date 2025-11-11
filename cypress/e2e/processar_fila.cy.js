describe("Processar Fila de Tickets", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
    });

    it("Deve processar ticket único na fila pendente para a fila classificada", () => {
        cy.criarTicket("Processar este ticket", "Descrição do ticket a ser processado", "PREMIUM");
        cy.processarFila();

        cy.verificarTicketNaFilaClassificada("Processar este ticket", "PREMIUM");
    });

    it("Deve processar múltiplos tickets na fila pendente para a fila classificada", () => {
        cy.criarTicket("Primeiro ticket", "Descrição do primeiro ticket", "BASICO");
        cy.criarTicket("Segundo ticket", "Descrição do segundo ticket", "GRATUITO");
        cy.criarTicket("Terceiro ticket", "Descrição do terceiro ticket", "PREMIUM");

        cy.processarFila();

        cy.verificarTicketNaFilaClassificada("Primeiro ticket", "BASICO");
        cy.verificarTicketNaFilaClassificada("Segundo ticket", "GRATUITO");
        cy.verificarTicketNaFilaClassificada("Terceiro ticket", "PREMIUM");
    });
});
