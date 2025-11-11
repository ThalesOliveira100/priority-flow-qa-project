const isNotBlank = (value) => {
    if (!value || typeof value !== "string" || value.trim().length === 0) {
        throw new Error("O campo não pode ser nulo ou conter apenas espaços em branco.");
    }
};

export { isNotBlank };