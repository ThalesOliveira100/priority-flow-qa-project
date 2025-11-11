import { jest } from "@jest/globals";

/**
 * Mock do modelo Ticket para testes unitários
 * 
 * Esse mock simula os métodos do Sequelize Model (create, findAll, save) 
 * para que os testes rodem sem conexão real com o banco de dados.
 */
export const mockTickets = [
    {
        id: "ce424231-d1b5-41f6-b0b6-657cf3bedb39",
        titulo: "Sistema não loga",
        descricao: "Meu sistema está completamente parado e não consigo trabalhar.",
        tipo_cliente: "PREMIUM",
        status: "PENDENTE",
        urgencia_calculada: null,
        save: jest.fn().mockResolvedValue(true)
    },
    {
        id: "a1234567-89ab-cdef-0123-456789abcdef",
        titulo: "Erro ao salvar",
        descricao: "Recebendo um erro 500 ao tentar salvar o formuário.",
        tipo_cliente: "BASICO",
        status: "PENDENTE",
        urgencia_calculada: null,
        save: jest.fn().mockResolvedValue(true)
    },
];

export const Ticket = {
    create: jest.fn(async (dados) => ({
        ...dados,
        id: "mock-id",
        status: "PENDENTE",
        urgencia_calculada: null,
    })),

    findAll: jest.fn(async (filtro) => {
        if (filtro?.where?.status === "PENDENTE") {
            return mockTickets.filter(t => t.status === "PENDENTE");
        }
        if (filtro?.where?.status === "CLASSIFICADO") {
            return mockTickets.filter(t => t.status === "CLASSIFICADO");
        }
        return mockTickets;
    })
};