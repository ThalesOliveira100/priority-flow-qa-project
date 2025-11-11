import express from "express";
import TicketController from "../controllers/ticketController.js";

const router = express.Router();

router
    .route("/")
    .post(TicketController.createTicket);

router
    .route("/pendentes")
    .get(TicketController.getTicketsPendentes);

router
    .route("/classificados")
    .get(TicketController.getTicketsClassificados);

router
    .route("/processar-fila")
    .post(TicketController.processarFila);

export default router;
