const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const projectData = {
  'cobli-panel': {
    category: 'Produto interno',
    title: 'Seleção múltipla de ESNs Painel Admin Cobli',
    description: 'Desenvolvi uma funcionalidade em React para selecionar vários equipamentos de uma vez, com regras de validação para impedir cruzamento entre painéis de clientes diferentes. O objetivo foi reduzir tempo operacional e evitar erros manuais em cenários de alta escala.',
    stack: ['REACT', 'JAVASCRIPT', 'UX', 'VALIDAÇÃO'],
    images: []
  },
  'tickets-cnpj': {
    category: 'Automação',
    title: 'Abertura automática de tickets por CNPJ',
    description: 'Lógica de negócio para identificar múltiplos CNPJs vinculados ao mesmo painel de cliente e abrir tickets segmentados automaticamente a partir da seleção dos equipamentos. Isso reduz o tempo de suporte e evita retrabalho manual.',
    stack: ['REACT', 'NEGÓCIO', 'AUTOMAÇÃO'],
    images: []
  },
  'slack-bot': {
    category: 'IA + Suporte',
    title: 'Bot de suporte com IA Slack',
    description: 'O bot atua no canal de suporte interno, fazendo o primeiro contato com o solicitante para validar a demanda e buscar o contexto do ticket em tempo real antes mesmo de o agente responder. Ele acessa o ticket, verifica status, observações e traz um retorno mais rápido sobre o que está acontecendo com a solicitação, além de priorizar tarefas e alinhar quem é o responsável.',
    stack: ['N8N', 'IA', 'SLACK', 'AUTOMAÇÃO'],
    images: ['IA Canal do Slack.jpeg']
  },
  'snippet-generator': {
    category: 'IA + documentação',
    title: 'IA geradora de Snippet',
    description: 'Snippet seria um modelo de documentação para equipamentos. Antes, a equipe precisava abrir cada item e copiar um modelo já existente no sistema admin, um por um. Com a IA, integrei o fluxo com Snowflake para buscar o número de série, modelo, placa e códigos do equipamento e criar o snippet automaticamente com base na regra de negócio da operação.',
    stack: ['IA', 'SNOWFLAKE', 'DOCUMENTAÇÃO', 'AUTOMAÇÃO'],
    images: ['IA gerador de snippet.jpeg']
  },
  'faq-ai': {
    category: 'FAQ + IA',
    title: 'IA para FAQ de suporte técnico',
    description: 'Desenvolvemos um assistente para apoiar o suporte técnico com base em dados do cliente e da FAQ interna. O fluxo usa embeddings no Supabase e o modelo Claude Haiku 3 para responder consultas em linguagem natural, com recuperação contextualizada e tradução de vetores para trazer respostas mais precisas e rápidas.',
    stack: ['IA', 'SUPABASE', 'CLAUDE', 'EMBEDDINGS'],
    images: ['IA guia de suporte.jpeg']
  },
  'multi-agent': {
    category: 'Multiagentes',
    title: 'Sistema multiagente de IA',
    description: 'O fluxo multiagente orquestra diferentes tarefas de IA em sequência, incluindo transcrição de áudio, validação de contexto e execução de passos automatizados. Isso permite responder demandas complexas com menos intervenção manual e com melhor rastreabilidade do processo.',
    stack: ['N8N', 'IA', 'ÁUDIO', 'AUTOMAÇÃO'],
    images: ['multiagente.jpeg']
  },
  'logistica': {
    category: 'Rastreamento',
    title: 'Rastreio de logística automatizado',
    description: 'Esse projeto era acionado quando o ticket entrava em status “A caminho” no CRM. O fluxo validava se havia envio de equipamento ou periférico, identificava a transportadora e enviava um e-mail com link direto de consulta, dados de rastreio e NF, algo que antes não existia no processo.',
    stack: ['AUTOMAÇÃO', 'CRM', 'LOGÍSTICA'],
    images: ['projeto-codigo-de-rastreio.jpeg']
  },
  'gestao-bia': {
    category: 'Gestão',
    title: 'Aplicativo Web de gestão de contratos',
    description: 'Aplicação open source para gestão de contratos com dados salvos no cache do navegador. Isso significa que a informação continua disponível mesmo após desligar a máquina, desde que o ambiente do navegador seja preservado; os dados só somem se o cache for limpo ou se alguém apague o armazenamento local.',
    stack: ['OPEN SOURCE', 'LOCAL STORAGE', 'GESTÃO'],
    images: ['Painelfoto1.jpeg', 'Painelfoto2.png', 'Painelfoto3.jpeg']
  }
};

const revealItems = document.querySelectorAll('.reveal-item');
revealItems.forEach((item, i) => {
  setTimeout(() => item.classList.add('is-visible'), 300 + i * 120);
});

const heroLayers = document.querySelectorAll('.hero-layer');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  heroLayers.forEach(layer => {
    const depth = parseFloat(layer.dataset.depth) || 0.3;
    layer.style.transform = `translateY(${scrollY * depth}px)`;
  });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 20
    ? 'rgba(79,209,232,0.3)'
    : 'var(--color-cinza-estrutural)';
});

const revealSections = document.querySelectorAll('.section, .project-card');
if (prefersReducedMotion) {
  revealSections.forEach(el => el.classList.add('is-visible'));
} else {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 80}ms`;
        entry.target.classList.add('is-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -25px 0px'
  });

  revealSections.forEach((element, index) => {
    element.style.transitionDelay = `${index * 80}ms`;
    sectionObserver.observe(element);
  });
}

const projectsSection = document.getElementById('projetos');
const projectsGlow = document.querySelector('.projects-glow');
if (projectsSection && projectsGlow && !prefersReducedMotion) {
  projectsSection.addEventListener('pointermove', (event) => {
    const rect = projectsSection.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    projectsGlow.style.transform = `translate(${x - rect.width / 2}px, ${y - rect.height / 2}px) scale(1.1)`;
  });

  projectsSection.addEventListener('pointerleave', () => {
    projectsGlow.style.transform = 'translate(-50%, -50%) scale(0.9)';
  });
}

document.querySelectorAll('.project-card').forEach((card) => {
  if (prefersReducedMotion) return;

  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

const profileLightbox = document.getElementById('profileLightbox');
const profileClose = document.getElementById('profileClose');
const profileTrigger = document.querySelector('.nav-profile-trigger');

if (profileTrigger) {
  profileTrigger.addEventListener('click', () => {
    profileLightbox.hidden = false;
  });
}

if (profileClose) {
  profileClose.addEventListener('click', () => {
    profileLightbox.hidden = true;
  });
}

if (profileLightbox) {
  profileLightbox.addEventListener('click', (event) => {
    if (event.target === profileLightbox) {
      profileLightbox.hidden = true;
    }
  });
}

const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalDescription = document.getElementById('projectModalDescription');
const projectCategory = document.getElementById('projectCategory');
const projectImage = document.getElementById('projectImage');
const projectThumbs = document.getElementById('projectThumbs');
const projectStack = document.getElementById('projectModalStack');
const projectPrev = document.getElementById('projectPrev');
const projectNext = document.getElementById('projectNext');

let activeProjectKey = null;
let activeProjectIndex = 0;

function renderProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  activeProjectKey = projectKey;
  activeProjectIndex = 0;

  projectCategory.textContent = project.category;
  projectModalTitle.textContent = project.title;
  projectModalDescription.textContent = project.description;
  projectStack.innerHTML = '';

  project.stack.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    projectStack.appendChild(li);
  });

  renderProjectImage();
}

function renderProjectImage() {
  const project = projectData[activeProjectKey];
  if (!project) return;

  const hasImages = project.images && project.images.length > 0;
  const mediaContainer = document.querySelector('.project-modal__media');

  if (mediaContainer) {
    mediaContainer.hidden = !hasImages;
  }

  projectImage.hidden = !hasImages;
  projectPrev.hidden = !hasImages;
  projectNext.hidden = !hasImages;
  projectThumbs.hidden = !hasImages;

  if (!hasImages) {
    projectImage.removeAttribute('src');
    projectImage.alt = '';
    projectThumbs.innerHTML = '';
    return;
  }

  const imageSrc = project.images[activeProjectIndex];
  projectImage.src = imageSrc;
  projectImage.alt = `${project.title} - imagem ${activeProjectIndex + 1}`;

  projectThumbs.innerHTML = '';
  project.images.forEach((image, index) => {
    const thumb = document.createElement('img');
    thumb.src = image;
    thumb.alt = `${project.title} - miniatura ${index + 1}`;
    thumb.className = `project-modal__thumb ${index === activeProjectIndex ? 'is-active' : ''}`;
    thumb.addEventListener('click', () => {
      activeProjectIndex = index;
      renderProjectImage();
    });
    projectThumbs.appendChild(thumb);
  });
}

function openProjectModal(projectKey) {
  renderProjectModal(projectKey);
  projectModal.hidden = false;
}

function closeProjectModal() {
  projectModal.hidden = true;
}

projectPrev.addEventListener('click', () => {
  const project = projectData[activeProjectKey];
  if (!project) return;
  activeProjectIndex = (activeProjectIndex - 1 + project.images.length) % project.images.length;
  renderProjectImage();
});

projectNext.addEventListener('click', () => {
  const project = projectData[activeProjectKey];
  if (!project) return;
  activeProjectIndex = (activeProjectIndex + 1) % project.images.length;
  renderProjectImage();
});

projectModalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-close-modal')) {
    closeProjectModal();
  }
});

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => openProjectModal(card.dataset.project));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProjectModal(card.dataset.project);
    }
  });
});

const chatFab = document.getElementById('chatFab');
const chatPopup = document.getElementById('chatPopup');
const chatClose = document.getElementById('chatClose');

chatFab.addEventListener('click', () => {
  chatPopup.hidden = !chatPopup.hidden;
});
chatClose.addEventListener('click', () => {
  chatPopup.hidden = true;
});

const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatBody = document.getElementById('chatBody');

async function sendChatMessage() {
  const text = chatInput.value.trim();
  if (!text || chatSend.disabled) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg chat-msg-user';
  userMsg.textContent = text;
  chatBody.appendChild(userMsg);
  chatInput.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  const botMsg = document.createElement('div');
  botMsg.className = 'chat-msg chat-msg-bot';
  botMsg.textContent = 'Pensando...';
  chatBody.appendChild(botMsg);
  chatBody.scrollTop = chatBody.scrollHeight;

  chatSend.disabled = true;
  chatInput.disabled = true;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    const answer = data?.response || 'Não consegui responder no momento. Tente novamente.';
    botMsg.textContent = answer;
  } catch (error) {
    botMsg.textContent = 'Não foi possível conectar com a IA no momento. Tente novamente mais tarde.';
  } finally {
    chatSend.disabled = false;
    chatInput.disabled = false;
    chatInput.focus();
  }
}

chatSend.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendChatMessage();
});

const dragHandle = document.getElementById('chatDragHandle');
let isDragging = false;
let offsetX = 0, offsetY = 0;

dragHandle.addEventListener('mousedown', e => {
  isDragging = true;
  const rect = chatPopup.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  chatPopup.style.transition = 'none';
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  chatPopup.style.left = `${e.clientX - offsetX}px`;
  chatPopup.style.top = `${e.clientY - offsetY}px`;
  chatPopup.style.right = 'auto';
  chatPopup.style.bottom = 'auto';
  chatPopup.style.position = 'fixed';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});
