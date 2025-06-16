document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del Menú Hamburguesa
    const hamburgerToggle = document.getElementById('hamburger-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav ul li a');

    if (hamburgerToggle && mainNav) {
        hamburgerToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            // Cambiar icono de hamburguesa a cruz y viceversa
            const icon = hamburgerToggle.querySelector('i');
            if (mainNav.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar el menú cuando se hace clic en un enlace (útil en móvil)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    // Restaurar icono de hamburguesa
                    const icon = hamburgerToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Datos de Proyectos
    const projectsData = [
        {
            id: 'project1',
            title: 'Sistema de Gestión de Clientes y Productos',
            description: 'Un sistema web para gestionar clientes, productos y ventas. Permite registrar nuevos clientes, actualizar información de productos y llevar un control de inventario y transacciones.',
            languages: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
            images: [
                'assets/images/projects/gestion-clientes/cliente1.webp',
                'assets/images/projects/gestion-clientes/cliente2.webp',
                'assets/images/projects/gestion-clientes/cliente3.webp'
            ],
            liveDemo: '#', // Reemplazar con URL de demo si existe
            github: 'https://github.com/BrandonUrielEsGa/Gestion_de_Clientes_y_Productos'
        },
        {
            id: 'project2',
            title: 'Web de Consultoría Financiera',
            description: 'Diseño y desarrollo de una página web profesional para una empresa de consultoría financiera, destacando sus servicios, equipo y testimonios.',
            languages: ['HTML', 'CSS', 'JavaScript'],
            images: [
                'assets/images/projects/consultoria-financiera/financiera1.webp',
                'assets/images/projects/consultoria-financiera/financiera2.webp',
                'assets/images/projects/consultoria-financiera/financiera3.webp'
            ],
            liveDemo: '#',
            github: 'https://github.com/BrandonUrielEsGa/Financial_Consulting'
        },
        {
            id: 'project3',
            title: 'Portafolio Personal',
            description: 'Mi portafolio profesional, diseñado para mostrar mis habilidades, proyectos y experiencia. Implementado con diseño responsivo para una excelente visualización en cualquier dispositivo.',
            languages: ['HTML', 'CSS', 'JavaScript'],
            images: [
                'assets/images/projects/portafolio/portafolio1.webp',
                'assets/images/projects/portafolio/portafolio2.webp',
                'assets/images/projects/portafolio/portafolio3.webp'
            ],
            liveDemo: 'index.html', // Ya estás en tu portafolio
            github: 'https://github.com/BrandonUrielEsGa/Portafolio_Personal'
        },
        {
            id: 'project4',
            title: 'Juego de Plataformas 2D',
            description: 'Juego de plataformas simple desarrollado en Pygame. El jugador controla un personaje que debe evitar obstáculos y enemigos para llegar al final del nivel.',
            languages: ['Python', 'Pygame'],
            images: [
                'assets/images/projects/juego-plataformas/plataformas1.webp',
                'assets/images/projects/juego-plataformas/plataformas2.webp',
                'assets/images/projects/juego-plataformas/plataformas3.webp'
            ],
            liveDemo: '#',
            github: 'https://github.com/BrandonUrielEsGa/Juego_de_Plataformas_Pygame'
        }
        // Agrega más proyectos aquí
    ];

    // 3. Renderizar Proyectos y Modal
    const projectsContainer = document.getElementById('projects-container');
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalLanguages = document.getElementById('modal-languages');
    const modalProjectImages = document.getElementById('modal-project-images');
    const modalProjectLiveDemo = document.getElementById('modal-project-live-demo');

    function renderProjects() {
        if (!projectsContainer) return; // Salir si el contenedor no existe

        projectsData.forEach(project => {
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            swiperSlide.dataset.projectId = project.id; // Para identificar el proyecto

            swiperSlide.innerHTML = 
                <img src="${project.images[0]}" alt="${project.title}" class="project-thumbnail">
                <div class="project-details">
                    <h3>${project.title}</h3>
                    <p>${project.description.substring(0, 100)}...</p>
                    <div class="project-languages">
                        ${project.languages.map(lang => <span class="language-badge">${lang}</span>).join('')}
                    </div>
                </div>
                <div class="project-links">
                    <button class="btn btn-primary btn-small view-project-btn">Ver Detalles</button>
                </div>
            ;
            projectsContainer.appendChild(swiperSlide);
        });

        // Añadir evento click a cada botón "Ver Detalles"
        document.querySelectorAll('.view-project-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const projectId = event.target.closest('.swiper-slide').dataset.projectId;
                const project = projectsData.find(p => p.id === projectId);
                if (project) {
                    showProjectModal(project);
                }
            });
        });
    }

    function showProjectModal(project) {
        modalProjectTitle.textContent = project.title;
        modalProjectDescription.textContent = project.description;

        modalLanguages.innerHTML = project.languages.map(lang => <span class="language-badge">${lang}</span>).join('');
        
        modalProjectImages.innerHTML = '';
        project.images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = project.title;
            modalProjectImages.appendChild(img);
        });

        // Configurar enlaces (Github y Demo)
        if (project.liveDemo && project.liveDemo !== '#') {
            modalProjectLiveDemo.href = project.liveDemo;
            modalProjectLiveDemo.textContent = 'Ver Demo en Vivo';
            modalProjectLiveDemo.style.display = 'inline-block';
        } else if (project.github) { // Si no hay demo, mostrar GitHub como botón principal
            modalProjectLiveDemo.href = project.github;
            modalProjectLiveDemo.textContent = 'Ver en GitHub';
            modalProjectLiveDemo.style.display = 'inline-block';
        } else {
            modalProjectLiveDemo.style.display = 'none'; // Ocultar si no hay enlaces
        }

        projectModal.show(); // Muestra el modal de Bootstrap
    }

    renderProjects(); // Renderizar proyectos al cargar la página

    // 4. Inicialización de Swiper.js
    if (projectsContainer && projectsContainer.children.length > 0) { // Solo inicializar si hay proyectos
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true, // Habilitar loop para un carrusel continuo
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000, // 5 segundos
                disableOnInteraction: false, // El autoplay no se detiene al interactuar
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }

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
                // Simula una respuesta del bot
                setTimeout(() => {
                    handleBotResponse(userMessage);
                }, 500);
            }
        }

        function displayMessage(message, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat-message', ${sender}-message);
            messageDiv.textContent = message;
            chatbotBody.appendChild(messageDiv);
            // Scroll al final del chat
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
                botResponse = 'Mis habilidades incluyen HTML, CSS, JavaScript, PHP, Python, MySQL, administración de Windows Server y redes. Puedes ver más en la sección de Habilidades.';
            } else if (lowerMessage.includes('proyectos')) {
                botResponse = 'He trabajado en proyectos como un sistema de gestión de clientes, una web de consultoría financiera y un juego 2D en Python. Te invito a explorar la sección de Proyectos.';
            } else if (lowerMessage.includes('contacto')) {
                botResponse = 'Puedes contactarme por email: brandonurielescalonagarcia@gmail.com o por LinkedIn.';
            } else if (lowerMessage.includes('edad')) {
                botResponse = 'Soy un programa de computadora, no tengo edad. 😉';
            } else if (lowerMessage.includes('gracias')) {
                botResponse = 'De nada. ¡Estoy aquí para ayudarte!';
            } else if (lowerMessage.includes('desarrollador')) {
                botResponse = 'Soy un desarrollador junior enfocado en crear soluciones web y optimizar infraestructuras digitales.';
            } else if (lowerMessage.includes('cv') || lowerMessage.includes('curriculum')) {
                botResponse = 'Puedes ver mi CV en el botón "Ver CV" en la sección de Inicio.';
            } else if (lowerMessage.includes('redes') || lowerMessage.includes('networking')) {
                botResponse = 'Tengo experiencia en redes digitales, incluyendo configuración y mantenimiento de infraestructuras de red y redes Cisco.';
            } else if (lowerMessage.includes('servidores')) {
                botResponse = 'Tengo experiencia en administración de servidores, especialmente con Windows Server 2019 e IIS.';
            }
            displayMessage(botResponse, 'bot');
        }
    }
});
