import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.unstable_mockModule("../../services/ticketService.js", () => ({
    default: {
        getTicketsPendentes: jest.fn(),
        getTicketsClassificados: jest.fn(),
        createTicket: jest.fn(),
        processarFila: jest.fn(),
    },
}));
const TicketService = (await import("../../services/ticketService.js")).default;
const TicketController = (await import("../../controllers/ticketController.js")).default;

const { mockTickets } = await import("../__mocks__/TicketMock.js");

const mockRequest = (params = {}, body = {}) => ({ params, body });

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("TicketController", () => {
    let next;
    beforeEach(() => {
        jest.clearAllMocks();
        next = jest.fn();
    });

    it("Deve retornar tickets pendentes e status 200", async () => {
        // Arrange (Dado que)
        const req = mockRequest();
        const res = mockResponse();

        TicketService.getTicketsPendentes.mockResolvedValue(mockTickets);

        // Act (Quando)
        await TicketController.getTicketsPendentes(req, res, next);

        // Assert (Então)
        expect(TicketService.getTicketsPendentes).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTickets);
        expect(next).not.toHaveBeenCalled();
    });

    it("Deve chamar next(err) se o service falhar ao obter tickets pendentes", async () => {
        // Arrange
        const req = mockRequest();
        const res = mockResponse();

        const mockError = new Error("Erro de banco de dados");
        TicketService.getTicketsPendentes.mockRejectedValue(mockError);

        // Act
        await TicketController.getTicketsPendentes(req, res, next);

        // Assert
        expect(TicketService.getTicketsPendentes).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockError);
    });

    it("Deve retornar tickets classificados e status 200", async () => {
        // Arrange
        const req = mockRequest();
        const res = mockResponse();
        const ticketsClassificadosMock = [
            {
                ...mockTickets[0],
                status: "CLASSIFICADO",
                urgencia_calculada: "CRITICA"
            },
            {
                ...mockTickets[1],
                status: "CLASSIFICADO",
                urgencia_calculada: "MEDIA"
            }
        ];

        TicketService.getTicketsClassificados.mockResolvedValue(ticketsClassificadosMock);

        // Act
        await TicketController.getTicketsClassificados(req, res, next);

        // Assert
        expect(TicketService.getTicketsClassificados).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(ticketsClassificadosMock);
        expect(next).not.toHaveBeenCalled();
    });

    it("Deve chamar next(err) se o service falhar ao obter tickets classificados", async () => {
        // Arrange
        const req = mockRequest();
        const res = mockResponse();
        const mockError = new Error("Erro de banco de dados");

        TicketService.getTicketsClassificados.mockRejectedValue(mockError);

        // Act
        await TicketController.getTicketsClassificados(req, res, next);

        // Assert
        expect(TicketService.getTicketsClassificados).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockError);
    });

    it("Deve criar um ticket e retornar status 201", async () => {
        // Arrange
        const ticketData = { 
            titulo: mockTickets[0].titulo, 
            descricao: mockTickets[0].descricao, 
            tipo_cliente: mockTickets[0].tipo_cliente 
        };
        const req = mockRequest({}, ticketData);
        const res = mockResponse();

        const ticketCriado = { ...mockTickets[0], status: "PENDENTE" };
        TicketService.createTicket.mockResolvedValue(ticketCriado);

        // Act
        await TicketController.createTicket(req, res, next);

        // Assert
        expect(TicketService.createTicket).toHaveBeenCalledWith(ticketData);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(ticketCriado);
        expect(next).not.toHaveBeenCalled();
    });

    it("Deve chamar next(err) se o service falhar ao criar ticket", async () => {
        // Arrange
        const ticketData = {
            titulo: ""
        };
        const req = mockRequest({}, ticketData);
        const res = mockResponse();

        const mockError = new Error("Dados inválidos");
        TicketService.createTicket.mockRejectedValue(mockError);

        // Act
        await TicketController.createTicket(req, res, next);

        // Assert
        expect(TicketService.createTicket).toHaveBeenCalledWith(ticketData);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockError);
    });

    it("Deve processar a fila e retornar os tickets atualizados com status 200", async () => {
        // Arrange
        const req = mockRequest();
        const res = mockResponse();
        const ticketsAtualizadosMock = [
            {
                ...mockTickets[0],
                status: "CLASSIFICADO",
                urgencia_calculada: "CRITICA"
            },
            {
                ...mockTickets[1],
                status: "CLASSIFICADO",
                urgencia_calculada: "MEDIA"
            }
        ];

        TicketService.processarFila.mockResolvedValue(ticketsAtualizadosMock);

        // Act
        await TicketController.processarFila(req, res, next);

        // Assert
        expect(TicketService.processarFila).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(ticketsAtualizadosMock);
        expect(next).not.toHaveBeenCalled();
    });

    it("Deve chamar next(err) se o service falhar ao processar a fila", async () => {
        // Arrange
        const req = mockRequest();
        const res = mockResponse();
        const mockError = new Error("Erro de banco de dados ao processar fila");

        TicketService.processarFila.mockRejectedValue(mockError);

        // Act
        await TicketController.processarFila(req, res, next);

        // Assert
        expect(TicketService.processarFila).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockError);
    });
});