describe("RF001 - Criar Tickets", () => {

    beforeEach(() => {
        cy.visit("http://localhost:5173/");
    });

    it("Deve permitir a criação de um ticket PREMIUM", () => {
        cy.criarTicket("Sistema fora do ar!", "O sistema está parado e não responde.", "PREMIUM");
        cy.verificarTicketNaFilaPendente("Sistema fora do ar!", "PREMIUM");
    });

    it("Deve permitir a criação de um ticket BÁSICO", () => {
        cy.criarTicket("Dúvida sobre funcionalidade", "Gostaria de entender melhor como funciona.", "BASICO");
        cy.verificarTicketNaFilaPendente("Dúvida sobre funcionalidade", "BASICO");
    });

    it("Deve permitir a criação de um ticket GRATUITO", () => {
        cy.criarTicket("Sugestão de melhoria", "Seria ótimo ter tema escuro.", "GRATUITO");
        cy.verificarTicketNaFilaPendente("Sugestão de melhoria", "GRATUITO");
    });

    it("Deve exibir erro ao criar ticket sem título", () => {
        cy.criarTicket("", "O sistema está parado.", "PREMIUM");
        cy.get(".errorMessage")
            .should("contain", "O título não pode estar vazio");
    });

    it("Deve exibir erro ao criar ticket sem descrição", () => {
        cy.criarTicket("Sistema fora do ar!", "", "PREMIUM");
        cy.get(".errorMessage")
            .should("contain", "A descrição não pode estar vazia");
    });

    it("Deve exibir erro ao criar ticket sem título e descrição", () => {
        cy.criarTicket("", "", "PREMIUM");
        cy.get(".errorMessage")
            .should("contain", "O título não pode estar vazio")
            .and("contain", "A descrição não pode estar vazia");
    });
});
