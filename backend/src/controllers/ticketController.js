import TicketService from "../services/ticketService.js";

class TicketController {
    static async getTicketsPendentes(req, res, next) {
        try {
            const tickets = await TicketService.getTicketsPendentes();
            res.status(200).json(tickets);
        } catch (err) {
            next(err);
        };
    };
    
    static async getTicketsClassificados(req, res, next) {
        try {
            const tickets = await TicketService.getTicketsClassificados();
            res.status(200).json(tickets);
        } catch (err) {
            next(err);
        };
    };

    static async createTicket(req, res, next) {
        try {
            const ticket = await TicketService.createTicket(req.body);
            res.status(201).json(ticket);
        } catch (err) {
            next(err);
        };
    };

    static async processarFila(req, res, next) {
        try {
            const ticketsAtualizados = await TicketService.processarFila();
            res.status(200).json(ticketsAtualizados);
        } catch (err) {
            next(err);
        };
    };
};

export default TicketController;
