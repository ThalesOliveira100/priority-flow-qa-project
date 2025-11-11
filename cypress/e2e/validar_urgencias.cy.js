describe("RF003 / RF004 - Processar Fila de Triagem e Matriz de Urgência", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
    });

    it("Cenário 1 - PREMIUM com 'parado' deve ser CRITICA", () => {
        cy.criarTicket("Sistema não loga", "Meu sistema está parado e não consigo trabalhar.", "PREMIUM");
        cy.verificarTicketNaFilaPendente("Sistema não loga", "PREMIUM");

        cy.processarFila();
        cy.verificarTicketClassificado("Sistema não loga", "CRITICA");
    });

    it("Cenário 2 - BÁSICO com 'parado' deve ser ALTA", () => {
        cy.criarTicket("App travado", "O sistema está parado desde cedo.", "BASICO");
        cy.verificarTicketNaFilaPendente("App travado", "BASICO");

        cy.processarFila();
        cy.verificarTicketClassificado("App travado", "ALTA");
    });

    it("Cenário 3 - GRATUITO com 'lento' deve ser BAIXA", () => {
        cy.criarTicket("Relatório", "O relatório está muito lento.", "GRATUITO");
        cy.verificarTicketNaFilaPendente("Relatório", "GRATUITO");

        cy.processarFila();
        cy.verificarTicketClassificado("Relatório", "BAIXA");
    });
});
