import NotFound from "../errs/NotFound.js";

function handler404(req, res, next) {
    const err404 = new NotFound();
    next(err404);
};

export default handler404;
