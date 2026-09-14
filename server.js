import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

async function serveStaticFile(filePath, res) {
  try {
    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) {
      return false;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extension] || 'application/octet-stream';
    const content = await readFile(filePath);

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
    return true;
  } catch {
    return false;
  }
}

async function handleApiChat(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const { message } = JSON.parse(body || '{}');

      if (!message || !message.trim()) {
        return sendJson(res, 400, { response: 'Mensagem vazia.' });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return sendJson(res, 500, {
          response: 'A chave da IA não está configurada. Defina GROQ_API_KEY no ambiente do servidor.'
        });
      }

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'Você é o Matheus.AI, assistente virtual do portfólio de Matheus Lopes Silva. Responda em português, de forma curta, amigável e objetiva. Fale do portfólio, das habilidades e da proficiência em automação, IA e desenvolvimento front-end.'
            },
            { role: 'user', content: message }
          ],
          temperature: 0.7
        })
      });

      const data = await groqResponse.json();

      if (!groqResponse.ok || !data?.choices?.[0]?.message?.content) {
        return sendJson(res, 500, {
          response: 'Não foi possível obter resposta da IA no momento.'
        });
      }

      return sendJson(res, 200, {
        response: data.choices[0].message.content
      });
    } catch (error) {
      return sendJson(res, 500, {
        response: `Erro ao processar a mensagem: ${error.message}`
      });
    }
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/chat') {
    await handleApiChat(req, res);
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/chat') {
    sendJson(res, 200, { response: 'Use POST para enviar mensagem.' });
    return;
  }

  let requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
  let normalizedPath = path.normalize(requestedPath).replace(/^\/+/, '');
  let filePath = path.join(__dirname, normalizedPath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Acesso negado');
    return;
  }

  const served = await serveStaticFile(filePath, res);
  if (!served) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página não encontrada');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
