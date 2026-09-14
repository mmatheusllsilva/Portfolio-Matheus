import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const { message } = req.body;
        const apiKey = process.env.GROQ_API_KEY;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: "Você é o Matheus.AI, assistente virtual do portfólio de Matheus Lopes Silva. REGRAS DE RESPOSTA: - Sempre em português - Respostas CURTAS e diretas (máximo 3-4 linhas) - Nunca escreva textos longos ou listas enormes - Seja MUITO simpático e objetivo. SOBRE O MATHEUS: Profissional de automação e desenvolvimento, com foco em n8n, Multi-Agentes de IA, integrações via API e Front-end moderno. HABILIDADES PRINCIPAIS: n8n, orquestração de agentes de IA, APIs, automação de processos, front-end, suporte técnico, ITIL/COBIT. CONTATOS: E-mail: matheus.luis.lopes.silva@outlook.com - WhatsApp: (11) 91311-9373." 
                    },
                    { role: "user", content: message }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (response.ok && data.choices) {
            res.status(200).json({ response: data.choices[0].message.content });
        } else {
            console.log("Erro Groq:", JSON.stringify(data));
            res.status(500).json({ 
                response: "Erro na resposta da IA.", 
                debug: data 
            });
        }
    } catch (error) {
        res.status(500).json({ response: "Erro interno: " + error.message });
    }
}
