import ErroBase from "./ErroBase.js";

class ErroViolacaoChaveEstrangeira extends ErroBase {
    constructor(mensagem = "Não foi possível processar a operação. O recurso associado não existe.") {
        super(400, mensagem);
    };
};

export default ErroViolacaoChaveEstrangeira;
