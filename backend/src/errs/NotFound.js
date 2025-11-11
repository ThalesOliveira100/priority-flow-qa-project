import ErroBase from "./ErroBase.js";

class NotFound extends ErroBase {
    constructor(message = "Página não encontrada.") {
        super(404, message);
    };
};

export default NotFound; 
