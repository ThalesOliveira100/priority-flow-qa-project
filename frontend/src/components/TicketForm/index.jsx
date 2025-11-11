import { useState } from "react";
import "./TicketForm.css";

const TicketForm = ({ onSubmitTicket, error }) => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipoCliente, setTipoCliente] = useState("GRATUITO");

    const handleSubmit = (e) => {
        e.preventDefault();

        const novoTicket = {
            titulo,
            descricao,
            tipo_cliente: tipoCliente,
        };

        onSubmitTicket(novoTicket);

        setTitulo("");
        setDescricao("");
        setTipoCliente("GRATUITO");
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2 className="form__header">Novo Ticket</h2>

            <label htmlFor="titulo" className="form__titulo">Título</label>
            <input
                id="titulo"
                type="text"
                placeholder="Resumo do problema"
                className="form__input-text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />

            <label htmlFor="descricao" className="form__titulo">Descrição</label>
            <textarea
                id="descricao"
                placeholder="Descreva o problema em detalhes..."
                className="form__input-text form__textearea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows="6"
            />

            <label htmlFor="tipoCliente" className="form__titulo">Tipo de Cliente</label>
            <select
                id="tipoCliente"
                className="form__select"
                value={tipoCliente}
                onChange={(e) => setTipoCliente(e.target.value)}
            >
                <option value="GRATUITO">Gratuito</option>
                <option value="BASICO">Básico</option>
                <option value="PREMIUM">Premium</option>
            </select>
            {error && <p className="errorMessage">{error}</p>}
            <button type="submit" className="form__button">
                Criar Ticket
            </button>
        </form>
    );
};

export default TicketForm;
