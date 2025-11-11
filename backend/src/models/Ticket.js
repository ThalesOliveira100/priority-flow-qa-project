import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";
import { isNotBlank } from "./validadores.js";

class Ticket extends Model {};

Ticket.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {          
            isNotBlank: (value) => {
                try {
                    isNotBlank(value);
                // eslint-disable-next-line no-unused-vars
                } catch (err) {
                    throw new Error("O título não pode estar vazio ou conter apenas espaços em branco.");
                };
            },
        }        
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {          
            isNotBlank: (value) => {
                try {
                    isNotBlank(value);
                // eslint-disable-next-line no-unused-vars
                } catch (err) {
                    throw new Error("A descrição não pode estar vazia ou conter apenas espaços em branco.");
                };
            },
        }   
    },

    tipo_cliente: {
        type: DataTypes.ENUM("GRATUITO", "BASICO", "PREMIUM"),
        allowNull: false,
        validate: {
            isIn: {
                args: [["GRATUITO", "BASICO", "PREMIUM"]],
                msg: "O tipo de cliente deve ser 'GRATUITO', 'BASICO' ou 'PREMIUM'."
            }
        }
    },

    status: {
        type: DataTypes.ENUM("PENDENTE", "CLASSIFICADO"),
        defaultValue: "PENDENTE"
    },

    urgencia_calculada: {
        type: DataTypes.ENUM("BAIXA", "MEDIA", "ALTA", "CRITICA"),
        defaultValue: null,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Ticket",
    tableName: "tickets",
    timestamps: true,
    hooks: {
        beforeCreate: (ticket) => {
            console.log(`[Ticket criado] ${ticket.titulo} (${ticket.tipo_cliente})`);
        }
    }
});

export { Ticket };