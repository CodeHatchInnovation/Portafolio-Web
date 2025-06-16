document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del Menú Hamburguesa
    const hamburgerToggle = document.getElementById('hamburger-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav ul li a');

    if (hamburgerToggle && mainNav) {
        hamburgerToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            const icon = hamburgerToggle.querySelector('i');
            if (mainNav.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    const icon = hamburgerToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Cargar Proyectos desde projects.json
    function fetchProjects() {
        return fetch('projects.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo projects.json');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error al obtener los proyectos:', error);
                return [];
            });
    }

    // 3. Renderizar Proyectos y Modal
    const projectsContainer = document.getElementById('projects-container');
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalLanguages = document.getElementById('modal-languages');
    const modalProjectImages = document.getElementById('modal-project-images');
    const modalProjectLiveDemo = document.getElementById('modal-project-live-demo');

    function renderProjects(projectsData) {
        if (!projectsContainer || !Array.isArray(projectsData)) return;

        projectsContainer.innerHTML = '';

        projectsData.forEach(project => {
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            swiperSlide.dataset.projectId = project.id;

            swiperSlide.innerHTML = `
                <img src="${project.images[0]}" alt="${project.title}" class="project-thumbnail">
                <div class="project-details">
                    <h3>${project.title}</h3>
                    <p>${project.description.substring(0, 100)}...</p>
                    <div class="project-languages">
                        ${project.languages.map(lang => `<span class="language-badge">${lang}</span>`).join('')}
                    </div>
                </div>
                <div class="project-links">
                    <button class="btn btn-primary btn-small view-project-btn">Ver Detalles</button>
                </div>
            `;
            projectsContainer.appendChild(swiperSlide);
        });

        document.querySelectorAll('.view-project-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const projectId = event.target.closest('.swiper-slide').dataset.projectId;
                const project = projectsData.find(p => p.id === projectId);
                if (project) {
                    showProjectModal(project);
                }
            });
        });

        if (projectsData.length > 0) {
            new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
            });
        }
    }

    function showProjectModal(project) {
        modalProjectTitle.textContent = project.title;
        modalProjectDescription.textContent = project.description;

        modalLanguages.innerHTML = project.languages.map(lang => `<span class="language-badge">${lang}</span>`).join('');
        modalProjectImages.innerHTML = '';
        project.images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = project.title;
            modalProjectImages.appendChild(img);
        });

        if (project.liveDemo && project.liveDemo !== '#') {
            modalProjectLiveDemo.href = project.liveDemo;
            modalProjectLiveDemo.textContent = 'Ver Demo en Vivo';
            modalProjectLiveDemo.style.display = 'inline-block';
        } else if (project.github) {
            modalProjectLiveDemo.href = project.github;
            modalProjectLiveDemo.textContent = 'Ver en GitHub';
            modalProjectLiveDemo.style.display = 'inline-block';
        } else {
            modalProjectLiveDemo.style.display = 'none';
        }

        projectModal.show();
    }

    fetchProjects().then(renderProjects);

    // 5. Funcionalidad del Chatbot
    const chatbotToggleButton = document.getElementById('chatbot-toggle-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotCloseButton = document.getElementById('chatbot-close-button');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendButton = document.getElementById('chatbot-send-button');
    const chatbotBody = document.getElementById('chatbot-body');

    if (chatbotToggleButton && chatbotWindow && chatbotCloseButton && chatbotInput && chatbotSendButton && chatbotBody) {
        chatbotToggleButton.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
            if (chatbotWindow.classList.contains('open')) {
                chatbotInput.focus();
            }
        });

        chatbotCloseButton.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });

        chatbotSendButton.addEventListener('click', () => {
            sendMessage();
        });

        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const userMessage = chatbotInput.value.trim();
            if (userMessage !== '') {
                displayMessage(userMessage, 'user');
                chatbotInput.value = '';
                setTimeout(() => {
                    handleBotResponse(userMessage);
                }, 500);
            }
        }

        function displayMessage(message, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat-message', `${sender}-message`);
            messageDiv.textContent = message;
            chatbotBody.appendChild(messageDiv);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }

        function handleBotResponse(message) {
            let botResponse = 'Lo siento, no entendí tu pregunta. ¿Puedes reformularla o preguntar sobre mis habilidades, proyectos o contacto?';
            const lowerMessage = message.toLowerCase();

            if (lowerMessage.includes('hola') || lowerMessage.includes('saludo')) {
                botResponse = '¡Hola! ¿En qué puedo ayudarte hoy?';
            } else if (lowerMessage.includes('nombre')) {
                botResponse = 'Mi nombre es Brandon Uriel Escalona Garcia.';
            } else if (lowerMessage.includes('habilidades')) {
                botResponse = 'Mis habilidades incluyen HTML, CSS, JavaScript, PHP, Python, MySQL, administración de Windows Server y redes.';
            } else if (lowerMessage.includes('proyectos')) {
                botResponse = 'He trabajado en proyectos como un sistema de gestión de clientes, una web de consultoría financiera y un juego 2D.';
            } else if (lowerMessage.includes('contacto')) {
                botResponse = 'Puedes contactarme por email: brandonurielescalonagarcia@gmail.com o por LinkedIn.';
            } else if (lowerMessage.includes('edad')) {
                botResponse = 'Soy un programa de computadora, no tengo edad. 😉';
            } else if (lowerMessage.includes('gracias')) {
                botResponse = 'De nada. ¡Estoy aquí para ayudarte!';
            } else if (lowerMessage.includes('desarrollador')) {
                botResponse = 'Soy un desarrollador junior enfocado en soluciones web y redes.';
            } else if (lowerMessage.includes('cv') || lowerMessage.includes('curriculum')) {
                botResponse = 'Puedes ver mi CV en el botón "Ver CV" en la sección de Inicio.';
            } else if (lowerMessage.includes('redes') || lowerMessage.includes('networking')) {
                botResponse = 'Tengo experiencia en configuración y mantenimiento de infraestructuras de red.';
            } else if (lowerMessage.includes('servidores')) {
                botResponse = 'Tengo experiencia en administración de servidores Windows Server 2019 e IIS.';
            }

            displayMessage(botResponse, 'bot');
        }
    }
});
