import TicketList from "../TicketList/index";
import "./Dashboard.css";

const Dashboard = ({
    ticketsPendentes = [],
    ticketsClassificados = [],
    onProcessQueue,
    error,
}) => {
    return (
        <section className="dashboardSection">
            <div className="dashboardHeader">
                <div>
                    <h2 className="dashboard__titulo">Dashboard de Triagem</h2>
                    <p className="dashboard__texto">Crie e processe tickets para priorização automática.</p>
                </div>

                <button onClick={onProcessQueue} className="processButton">
                    ▷ Processar Fila Pendente
                </button>
            </div>

            {error && <p className="errorMessage">{error}</p>}

            <div className="listsContainer">
                <TicketList title="Fila Pendente" tickets={ticketsPendentes} />
                <TicketList
                    title="Fila Classificada"
                    tickets={ticketsClassificados}
                    emptyMessage="Nenhum ticket classificado"
                />
            </div>
        </section>
    );
};

export default Dashboard;
