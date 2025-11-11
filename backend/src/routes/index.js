import ticketRoutes from "./ticketsRoutes.js";

/**
 * Configura as rotas da aplicação seguindo o padrão barrel.
 */
const routes = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("API Priority Flow está no ar!");
    });

    app.use(
        "/v1/tickets", 
        ticketRoutes
    );
};

export default routes;