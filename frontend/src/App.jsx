import { useState, useEffect } from "react";
import Header from "./components/Header";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import Dashboard from "./components/Dashboard/index.jsx";
import "./styles/App.css";
import Api from "./services/Api.js";


function App() {
    const [ticketsPendentes, setTicketsPendentes] = useState([]);
    const [ticketsClassificados, setTicketsClassificados] = useState([]);
    const [errorForm, setErrorForm] = useState(null);
    const [errorDashboard, setErrorDashboard] = useState(null);

    const carregarTicketsPendentes = async () => {
        try {
            const [pendentes, classificados] = await Promise.all([
                Api.getTicketsPendentes(),
                Api.getTicketsClassificados(),
            ]);

            setTicketsPendentes(pendentes);
            setTicketsClassificados(classificados);
            setErrorDashboard(null);

        } catch (err) {
            console.error(err);
            setErrorDashboard(err.message);
        };
    };

    useEffect(() => {
        carregarTicketsPendentes();
    }, []);

    const handleCreateTicket = async (novoTicket) => {
        try {
            await Api.createTicket(novoTicket);
            carregarTicketsPendentes();
            setErrorForm(null);
        } catch (err) {
            console.error(err);
            setErrorForm(err.response.data.message);
        }
    };

    const handleProcessQueue = async () => {
        try {
            await Api.processarFilaPendentes();
            carregarTicketsPendentes();
            setErrorDashboard(null);
        } catch (err) {
            console.error(err);
            setErrorDashboard(err.message);            
        }
    };

    return (
        <>
            <main className="mainContent">
        
                {/* Coluna da Esquerda: Formulário [Req RN001.1] */}
                <section className="formSection">
                    <Header />
                    <hr />
                    <TicketForm 
                        onSubmitTicket={handleCreateTicket}
                        error={errorForm}
                    />
                </section>

                {/* Coluna da Direita: Dashboard de Triagem */}
                <Dashboard 
                    ticketsPendentes={ticketsPendentes}
                    ticketsClassificados={ticketsClassificados}
                    onProcessQueue={handleProcessQueue}
                    error={errorDashboard} 
                />
            </main>
        </>
    );
}

export default App;
