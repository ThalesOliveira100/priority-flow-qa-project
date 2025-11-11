class ErroBase extends Error {
    constructor(status = 500, mensagem = "Erro interno do servidor") {
        super();
        this.status = status;
        this.mensagem = mensagem;
    };

    enviarResposta(res) {
        res.status(this.status).send({
            status: this.status,
            message: this.mensagem
        });
    };
};

export default ErroBase;
