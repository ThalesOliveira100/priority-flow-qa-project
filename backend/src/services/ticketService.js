import { Ticket } from "../models/Ticket.js";
import { MATRIZ_URGENCIA, REGRAS_REBAIXAMENTO } from "../config/matrizUrgencia.js";

class TicketService {
    /**
     * RF004 - Matriz de Decisão de Urgência
     * 
     * Calcula a urgência de um ticket com base na descrição e no tipo de cliente. 
     */
    static calcularUrgencia(descricao, tipo_cliente) {
        const texto = descricao.toLowerCase();
        const regras = REGRAS_REBAIXAMENTO[tipo_cliente];
        let urgencia = "MEDIA";

        for (const [nivel, palavrasChave] of Object.entries(MATRIZ_URGENCIA)) {
            if (palavrasChave.some(palavra => texto.includes(palavra))) {
                urgencia = nivel;
                break;
            };
        };

        if (regras && urgencia in regras) {
            urgencia = regras[urgencia];
        } else if (!regras) {
            urgencia = "BAIXA";
        };

        return urgencia;
    };

    static async createTicket(dados) {
        return await Ticket.create({
            ...dados,
            status: "PENDENTE",
            urgencia_calculada: null
        });
    };

    static async getTicketsPendentes() {
        return await Ticket.findAll({ where: { status: "PENDENTE" } });
    }

    static async getTicketsClassificados() {
        return await Ticket.findAll({ where: { status: "CLASSIFICADO" } });
    }

    /**
     * RF003: Ação - Processar Fila de Triagem
     * 
     * Localiza todos os tickets com status "PENDENTE" no banco de dados, calcula e 
     * atribui a urgência para cada um, e atualiza o status para "CLASSIFICADO".
     * 
     * @returns Retorna a lista de tickets que foram atualizados
     */
    static async processarFila() {
        const pendentes = await Ticket.findAll({ 
            where: { status: "PENDENTE" } 
        });
        if (pendentes.length === 0) return [];

        const ticketsAtualizados = [];
        for (const ticket of pendentes) {
            const urgencia = this.calcularUrgencia(ticket.descricao, ticket.tipo_cliente);
            ticket.urgencia_calculada = urgencia;
            ticket.status = "CLASSIFICADO";
            await ticket.save();
            ticketsAtualizados.push(ticket);
        };

        return ticketsAtualizados;
    };
};

export default TicketService;
