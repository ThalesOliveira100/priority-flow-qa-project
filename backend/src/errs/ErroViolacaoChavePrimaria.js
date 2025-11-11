import ErroBase from "./ErroBase.js";

class ErroViolacaoChavePrimaria extends ErroBase {
    constructor(mensagem = "Conflito: O recurso que você está tentando criar já existe.") {
        super(409, mensagem);
    };
};

export default ErroViolacaoChavePrimaria;
