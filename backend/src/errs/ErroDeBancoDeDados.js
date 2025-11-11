import ErroBase from "./ErroBase.js";

class ErroDeBancoDeDados extends ErroBase {
    constructor(mensagem = "Ocorreu um erro ao processar a requisição no banco de dados.") {
        super(500, mensagem);
    };
};

export default ErroDeBancoDeDados;
