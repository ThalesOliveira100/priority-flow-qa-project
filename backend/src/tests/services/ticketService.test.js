import { beforeEach, describe, jest, it, expect } from "@jest/globals";
import { MATRIZ_URGENCIA } from "../../config/matrizUrgencia.js";

jest.unstable_mockModule("../../models/Ticket", async () => {
    const mock = await import("../__mocks__/TicketMock.js");
    return {
        Ticket: mock.Ticket
    };
});

const { Ticket } = await import("../../models/index.js");
const TicketService = (await import("../../services/ticketService.js")).default;
const { mockTickets: originalMockTickets } = await import("../__mocks__/TicketMock.js");

let mockDataStore;

beforeEach(() => {
    jest.clearAllMocks();
    // Cria uma cópia fresca dos dados mock para cada teste
    mockDataStore = originalMockTickets.map(ticket => ({
        ...ticket,
        status: "PENDENTE",
        urgencia_calculada: null,
        save: jest.fn().mockResolvedValue(true)
    }));

    Ticket.findAll.mockImplementation(async ({ where }) => {
        if (where.status === "PENDENTE") {
            return mockDataStore.filter(t => t.status === "PENDENTE");
        }
        if (where.status === "CLASSIFICADO") {
            return mockDataStore.filter(t => t.status === "CLASSIFICADO");
        }
        return mockDataStore;
    });

    Ticket.create.mockClear();
});

describe("ticketService.calcularUrgencia (RF004 | RQNF3)", () => {
    it("CT001: Deve prevalecer a palavra-chave de maior impacto na descrição caso contenha múltiplas palavras-chave", () => {
        const urgencia = TicketService.calcularUrgencia("Estou em dúvida do porquê meu sistema está parado", "PREMIUM");
        expect(urgencia).toBe("CRITICA");
    });

    it("CT002: Deve retornar 'CRITICA' para descrição com palavra-chave crítica e cliente PREMIUM", () => {
        const palavrasCriticas = MATRIZ_URGENCIA["CRITICA"];

        for (const palavra of palavrasCriticas) {
            const urgencia = TicketService.calcularUrgencia(`O sistema está ${palavra}`, "PREMIUM");
            expect(urgencia).toBe("CRITICA");
        };
    });

    it("CT003: Deve retornar 'ALTA' para descrição com palavra-chave altas e cliente PREMIUM", () => {
        const palavrasAltas = MATRIZ_URGENCIA["ALTA"];

        for (const palavra of palavrasAltas) {
            const urgencia = TicketService.calcularUrgencia(`O sistema está com ${palavra}`, "PREMIUM");
            expect(urgencia).toBe("ALTA");
        };
    });

    it("CT004: Deve retornar 'MEDIA' para descrição com palavra-chave médias e cliente PREMIUM", () => {
        const palavrasMedias = MATRIZ_URGENCIA["MEDIA"];

        for (const palavra of palavrasMedias) {
            const urgencia = TicketService.calcularUrgencia(`Preciso de ${palavra}`, "PREMIUM");
            expect(urgencia).toBe("MEDIA");
        };
    });

    it("CT005: Deve retornar 'MEDIA' para descrição sem palavras-chave e cliente PREMIUM", () => {
        const urgencia = TicketService.calcularUrgencia("Descrição sem palavras-chave relevantes", "PREMIUM");
        expect(urgencia).toBe("MEDIA");
    });

    it("CT006: Deve retornar 'ALTA' para descrição com palavra-chave crítica e cliente BASICO", () => {
        const palavrasCriticas = MATRIZ_URGENCIA["CRITICA"];

        for (const palavra of palavrasCriticas) {
            const urgencia = TicketService.calcularUrgencia(`O sistema está ${palavra}`, "BASICO");
            expect(urgencia).toBe("ALTA");
        };
    });

    it("CT007: Deve retornar 'MEDIA' para descrição com palavra-chave altas e cliente BASICO", () => {
        const palavrasAltas = MATRIZ_URGENCIA["ALTA"];

        for (const palavra of palavrasAltas) {
            const urgencia = TicketService.calcularUrgencia(`O sistema está com ${palavra}`, "BASICO");
            expect(urgencia).toBe("MEDIA");
        };
    });

    it("CT008: Deve retornar 'BAIXA' para descrição com palavra-chave médias e cliente BASICO", () => {
        const palavrasMedias = MATRIZ_URGENCIA["MEDIA"];

        for (const palavra of palavrasMedias) {
            const urgencia = TicketService.calcularUrgencia(`Preciso de ${palavra}`, "BASICO");
            expect(urgencia).toBe("BAIXA");
        };
    });

    it("CT009: Deve retornar 'MEDIA' para descrição com palavra-chave críticas e cliente GRATUITO", () => {
        const palavrasCriticas = MATRIZ_URGENCIA["CRITICA"];

        for (const palavra of palavrasCriticas) {
            const urgencia = TicketService.calcularUrgencia(`O sistema está ${palavra}`, "GRATUITO");
            expect(urgencia).toBe("MEDIA");
        };
    });

    it("CT010: Deve retornar 'BAIXA' para descrição com palavra-chave altas, médias, ou sem palavras-chave e cliente GRATUITO", () => {
        const palavrasAltas = MATRIZ_URGENCIA["ALTA"];
        const palavrasMedias = MATRIZ_URGENCIA["MEDIA"];

        for (const palavra of [...palavrasAltas, ...palavrasMedias]) {
            const urgencia = TicketService.calcularUrgencia(`O sistema está com ${palavra}`, "GRATUITO");
            expect(urgencia).toBe("BAIXA");
        };

        const urgenciaSemPalavras = TicketService.calcularUrgencia("Descrição sem palavras-chave relevantes", "GRATUITO");
        expect(urgenciaSemPalavras).toBe("BAIXA");
    });

    it("CT011: Deve retornar 'BAIXA' para qualquer descrição com tipo de cliente inválido", () => {
        const urgencia = TicketService.calcularUrgencia("O sistema está parado", "VIP");
        expect(urgencia).toBe("BAIXA");
    });

    it("CT012: Deve ser case insensitive ao analisar a descrição", () => {
        const urgencia = TicketService.calcularUrgencia("O SISTEMA ESTÁ PaRaDo", "PREMIUM");
        expect(urgencia).toBe("CRITICA");
    });
});

describe("ticketService.createTicket", () => {
    it("CT001: Deve criar um ticket com status 'PENDENTE' e urgência nula", async () => {
        const dadosTicket = {
            titulo: "Teste de criação",
            descricao: "Descrição do ticket de teste",
            tipo_cliente: "BASICO"
        };

        const ticketCriado = await TicketService.createTicket(dadosTicket);

        expect(Ticket.create).toHaveBeenCalledWith({
            ...dadosTicket,
            status: "PENDENTE",
            urgencia_calculada: null
        });
        expect(ticketCriado).toHaveProperty("id", "mock-id");
        expect(ticketCriado).toHaveProperty("status", "PENDENTE");
        expect(ticketCriado).toHaveProperty("urgencia_calculada", null);
    });

    it("CT002: Não deve criar um ticket com título vazio", async () => {
        const dadosTicket = {
            titulo: "    ",
            descricao: "Descrição válida",
            tipo_cliente: "BASICO"
        };

        Ticket.create.mockImplementationOnce(async () => {
            throw new Error("O título não pode estar vazio ou conter apenas espaços em branco.");
        });

        await expect(TicketService.createTicket(dadosTicket))
            .rejects
            .toThrow("O título não pode estar vazio ou conter apenas espaços em branco.");
        
        expect(Ticket.create).toHaveBeenCalledWith(expect.objectContaining(dadosTicket));
    });

    it("CT003: Não deve criar um ticket com descrição vazia", async () => {
        const dadosTicket = {
            titulo: "Título válido",
            descricao: "    ",
            tipo_cliente: "BASICO"
        };

        Ticket.create.mockImplementationOnce(async () => {
            throw new Error("A descrição não pode estar vazia ou conter apenas espaços em branco.");
        });

        await expect(TicketService.createTicket(dadosTicket))
            .rejects
            .toThrow("A descrição não pode estar vazia ou conter apenas espaços em branco.");
        
        expect(Ticket.create).toHaveBeenCalledWith(expect.objectContaining(dadosTicket));
    });

    it("CT004: Não deve criar um ticket com tipo de cliente inválido", async () => {
        const dadosTicket = {
            titulo: "Título válido",
            descricao: "Descrição válida",
            tipo_cliente: "VIP"
        };

        Ticket.create.mockImplementationOnce(async () => {
            throw new Error("O tipo de cliente deve ser 'GRATUITO', 'BASICO' ou 'PREMIUM'.");
        });

        await expect(TicketService.createTicket(dadosTicket))
            .rejects
            .toThrow("O tipo de cliente deve ser 'GRATUITO', 'BASICO' ou 'PREMIUM'.");

        expect(Ticket.create).toHaveBeenCalledWith(expect.objectContaining(dadosTicket));
    });
});

describe("ticketService.getTicketsPendentes", () => {
    it("CT001: Deve retornar todos os tickets com status 'PENDENTE'", async () => {
        const ticketsPendentes = await TicketService.getTicketsPendentes();

        expect(Ticket.findAll).toHaveBeenCalledWith({ where: { status: "PENDENTE" } });
        expect(ticketsPendentes.every(t => t.status === "PENDENTE")).toBe(true);
    });

    it("CT002: Deve retornar uma lista vazia se não houver tickets 'PENDENTE'", async () => {
        Ticket.findAll.mockImplementationOnce(async () => []);

        const ticketsPendentes = await TicketService.getTicketsPendentes();
        expect(Ticket.findAll).toHaveBeenCalledWith({ where: { status: "PENDENTE" } });
        expect(ticketsPendentes.length).toBe(0);
    });
});

describe("ticketService.getTicketsClassificados", () => {
    it("CT001: Deve retornar todos os tickets com status 'CLASSIFICADO'", async () => {
        // Atualiza alguns tickets para 'CLASSIFICADO' no mockDataStore
        mockDataStore[0].status = "CLASSIFICADO";
        mockDataStore[1].status = "CLASSIFICADO";

        const ticketsClassificados = await TicketService.getTicketsClassificados();

        expect(Ticket.findAll).toHaveBeenCalledWith({ where: { status: "CLASSIFICADO" } });
        expect(ticketsClassificados.every(t => t.status === "CLASSIFICADO")).toBe(true);
    });

    it("CT002: Deve retornar uma lista vazia se não houver tickets 'CLASSIFICADO'", async () => {
        Ticket.findAll.mockImplementationOnce(async () => []);

        const ticketsClassificados = await TicketService.getTicketsClassificados();
        expect(Ticket.findAll).toHaveBeenCalledWith({ where: { status: "CLASSIFICADO" } });
        expect(ticketsClassificados.length).toBe(0);
    });
});

describe("ticketService.processarFila", () => {
    it("CT001: Deve processar todos os tickets 'PENDENTE' e atualizá-los para 'CLASSIFICADO'", async () => {
        const ticketsAtualizados = await TicketService.processarFila();

        expect(Ticket.findAll).toHaveBeenCalledWith({ where: { status: "PENDENTE" } });
        expect(ticketsAtualizados.length).toBe(mockDataStore.length);

        for (const ticket of ticketsAtualizados) {
            expect(ticket.status).toBe("CLASSIFICADO");
            expect(ticket.urgencia_calculada).not.toBeNull();
            expect(ticket.save).toHaveBeenCalled();
        }
    });

    it("CT002: Deve retornar uma lista vazia se não houver tickets 'PENDENTE' para processar", async () => {
        Ticket.findAll.mockImplementationOnce(async () => []);

        const ticketsAtualizados = await TicketService.processarFila();
        expect(Ticket.findAll).toHaveBeenCalledWith({ where: { status: "PENDENTE" } });
        expect(ticketsAtualizados.length).toBe(0);
    });
});
