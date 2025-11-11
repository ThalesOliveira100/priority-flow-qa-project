import { ValidationError, 
    UniqueConstraintError, 
    ForeignKeyConstraintError,
    BaseError} from "sequelize";
import ErroBase from "../errs/ErroBase.js";
import ErroValidacao from "../errs/ErroValidacao.js";
import ErroViolacaoChavePrimaria from "../errs/ErroViolacaoChavePrimaria.js";
import ErroViolacaoChaveEstrangeira from "../errs/ErroViolacaoChaveEstrangeira.js";
import ErroDeBancoDeDados from "../errs/ErroDeBancoDeDados.js";

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    console.error(err);

    let errorResponse;

    if (err instanceof ValidationError) {
        errorResponse = new ErroValidacao(err);

    } else if (err instanceof UniqueConstraintError) {
        errorResponse = new ErroViolacaoChavePrimaria(err);

    } else if (err instanceof ForeignKeyConstraintError) {
        errorResponse = new ErroViolacaoChaveEstrangeira(err);
    
    } else if (err instanceof ErroBase) {
        errorResponse = err;

    } else if (err instanceof BaseError) {
        errorResponse = new ErroDeBancoDeDados(err);
    
    } else {
        if (process.env.NODE_ENV !== "production") {
            errorResponse = new ErroBase(500, err.message);
        } else {
            errorResponse = new ErroBase(500, "Erro interno do servidor.");
        };
    };
    
    if (errorResponse) {
        errorResponse.enviarResposta(res);
    } else {
        new ErroBase().enviarResposta(res);
    };
};

export default errorHandler;
