# Especificações Gherkin (RQNF11)

Este documento descreve os principais casos de uso da aplicação "Gestor de Prioridade" usando a sintaxe Gherkin.

---

Feature: Classificação de Urgência de Tickets
    Para garantir o atendimento priorizado (SLA), o sistema deve classificar tickets pendentes
    com base no tipo de cliente e em palavras-chave na descrição.

    Cenário: (Cenário 1) Cliente PREMIUM com palavra-chave CRÍTICA 
        DADO QUE eu estou na página de "Dashboard de Triagem"
        E eu preencho o título com "Problema de login"
        E eu preencho a descrição com "Meu sistema está completamente parado."
        E eu seleciono o tipo de cliente "PREMIUM"
        QUANDO eu clico no botão "Criar Ticket"
        E o ticket "Problema de login" aparece na "Fila Pendente"
        E eu clico no botão "Processar Fila Pendente"
        ENTÃO o ticket "Problema de login" deve sair da "Fila Pendente"
        E o ticket "Problema de login" deve aparecer na "Fila Classificada" com a urgência "CRITICA"

    Cenário: (Cenário 2) Cliente BASICO com palavra-chave CRÍTICA
        DADO QUE eu estou na página de "Dashboard de Triagem"
        E eu preencho a descrição com "Sistema offline"
        E eu seleciono o tipo de cliente "BASICO"
        QUANDO eu clico em "Criar Ticket"
        E eu clico em "Processar Fila Pendente"
        ENTÃO o ticket deve aparecer na "Fila Classificada" com a urgência "ALTA"

    Cenário: (Cenário 3) Cliente GRATUITO com palavra-chave ALTA
        DADO QUE eu estou na página de "Dashboard de Triagem"
        E eu preencho a descrição com "Lento"
        E eu seleciono o tipo de cliente "GRATUITO"
        QUANDO eu clico em "Criar Ticket"
        E eu clico em "Processar Fila Pendente"
        ENTÃO o ticket deve aparecer na "Fila Classificada" com a urgência "BAIXA"

    Cenário: (Cenário 4) Regra de Precedência de Palavra-Chave (RN004.2)
        DADO QUE eu estou na página de "Dashboard de Triagem"
        E eu preencho a descrição com "Tenho uma dúvida, mas o sistema não funciona"
        E eu seleciono o tipo de cliente "PREMIUM"
        QUANDO eu clico em "Criar Ticket"
        E eu clico em "Processar Fila Pendente"
        ENTÃO o ticket deve aparecer na "Fila Classificada" com a urgência "CRITICA"

    Cenário (Cenário 5): Cliente BASICO sem Palavra-Chave
        DADO QUE eu estou na página de "Dashboard de Triagem"
        E eu preencho a descrição com "Vocês são incríveis! Só elogio!"
        E eu seleciono o tipo de cliente "BASICO"
        QUANDO eu clico em "Criar Ticket"
        E eu clico em "Processar Fila Pendente"
        ENTÃO o ticket deve aparecer na "Fila Classificada" com a urgência "BAIXO"

    Cenário (Cenário 6): Cliente PREMIUM com Palavra-Chave MÉDIA
        DADO QUE eu estou na página de "Dashboard de Triagem"
        E eu preencho a descrição com "Preciso de ajuda com a mensalidade"
        E eu seleciono o tipo de cliente "PREMIUM"
        QUANDO eu clico em "Criar Ticket"
        E eu clico em "Processar Fila Pendente"
        ENTÃO o ticket deve aparecer na "Fila Classificada" com a urgência "MEDIA"
