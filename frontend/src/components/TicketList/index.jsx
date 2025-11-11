import "./TicketList.css";

const TicketList = ({ title, tickets = [], emptyMessage }) => {
    const items = [];

    const ordemUrgencia = { CRITICA: 1, ALTA: 2, MEDIA: 3, BAIXA: 4, PENDENTE: 5 };
    const ticketsOrdenados = [...tickets].sort((a, b) => {
        const urgA = ordemUrgencia[a.urgencia_calculada?.toUpperCase()] || 5;
        const urgB = ordemUrgencia[b.urgencia_calculada?.toUpperCase()] || 5;
        return urgA - urgB;
    });

    ticketsOrdenados.forEach(ticket => {
        const urgencia = (ticket.urgencia_calculada || "pendente").toLowerCase();

        items.push(
            <li key={ticket.id} className={`ticketList__item urgencia-${urgencia}`}>
                <div className="ticketList__item-detalhes">
                    <div>
                        <h4 className="ticketList__titulo">{ticket.titulo}</h4>
                            
                        <div className="ticketList__meta">
                            <span className="ticketList__cliente">Cliente: {ticket.tipo_cliente}</span>
                        </div>
                    </div>

                    {ticket.urgencia_calculada && (
                        <span className={`ticketList__urgencia-${urgencia}`}>{ticket.urgencia_calculada}</span>
                    )}
                </div>
            </li>
        );
    });

    const content = items.length > 0 ? (
        <ul className="ticketList__container">{items}</ul>
    ) : (
        <p className="ticketList__vazio">{emptyMessage || "Nenhum ticket encontrado"}</p>
    );

    return (
        <div className="ticketList">
            <h3 className="ticketList__title">{title}</h3>
            {content}
        </div>
    );
};

export default TicketList;
