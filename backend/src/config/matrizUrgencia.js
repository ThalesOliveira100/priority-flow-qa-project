export const MATRIZ_URGENCIA = {
    CRITICA: ["parado", "offline", "não funciona", "down", "fora do ar"],
    ALTA: ["erro", "bug", "lento", "lentidão", "falha de acesso"],
    MEDIA: ["dúvida", "como fazer", "ajuda", "orientação"],
};

export const REGRAS_REBAIXAMENTO = {
    PREMIUM: {
        CRITICA: "CRITICA",
        ALTA: "ALTA",
        MEDIA: "MEDIA",
        BAIXA: "MEDIA"
    },
    BASICO: {
        CRITICA: "ALTA",
        ALTA: "MEDIA",
        MEDIA: "BAIXA",
        BAIXA: "BAIXA"
    },
    GRATUITO: {
        CRITICA: "MEDIA",
        ALTA: "BAIXA",
        MEDIA: "BAIXA",
        BAIXA: "BAIXA"
    }
};
