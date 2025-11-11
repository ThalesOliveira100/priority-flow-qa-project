import app from "./src/app.js";
import sequelize from "./config/db.js";

const port = process.env.PORT || 3000; 

/**
 * Conecta ao banco (autentica/sincroniza) e inicializa o servidor Express.
 * 
 * @async
 * @description Encerra a aplicação (process.exit) se a conexão com o banco falhar.
 */
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados estabilizada com sucesso.");
        
        await sequelize.sync();
        console.log("Todos os modelos foram sincronizados com sucesso.");

        app.listen(port, () => {
            console.log(`Aplicação executando em http://localhost:${port}`);
        });

    } catch (err) {
        console.log("Erro ao se conectar ao banco de dados: ", err);
        process.exit(-1);
    };
};

startServer();