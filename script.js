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
            title: 'App Android para Psicólogos y Clientes',
            description: 'Aplicación móvil desarrollada en Kotlin con Android Studio, orientada a facilitar la interacción entre psicólogos y sus pacientes. Incluye funciones de videollamada, envío de archivos y actividades interactivas. Aunque fue cancelada antes del lanzamiento por falta de financiamiento, el prototipo funcional demuestra experiencia en desarrollo móvil y manejo de flujos complejos de usuario.',
            languages: ['Kotlin', 'Android Studio'],
            images: [
              'assets/images/projects/project1-full1.jpg' // Ruta ajustada
            ],
            liveDemo: '#',
            github: '#',
            thumbnail: 'assets/images/projects/project1-thumb.jpg' // Ruta ajustada
          },
          {
            id: 'project2',
            title: 'Punto de Venta Automatizado',
            description: 'Proyecto de automatización en Excel usando VBA para una tienda local. Permite gestionar ventas, inventario y cálculos automáticos mediante una interfaz intuitiva. Incluye menús personalizados, validaciones y generación de reportes, todo dentro de un solo archivo de Excel para facilitar su distribución y uso sin conexión.',
            languages: ['Excel', 'VBA'],
            images: [
              'assets/images/projects/project2-full1.jpg'
            ],
            liveDemo: '#',
            github: '#',
            thumbnail: 'assets/images/projects/project2-thumb.jpg'
          },
          {
            id: 'project3',
            title: 'Gestor de Base de Datos',
            description: 'Sistema de gestión desarrollado en Python con SQLite como base de datos local. Incluye operaciones CRUD completas para clientes y ventas, validaciones de entrada, generación de reportes y una estructura ligera pensada para pequeños negocios. Enfocado en funcionalidad, portabilidad y facilidad de uso.',
            languages: ['Python', 'SQLite'],
            images: [
              'assets/images/projects/project3-full1.jpg'
            ],
            liveDemo: '#',
            github: '#',
            thumbnail: 'assets/images/projects/project3-thumb.jpg'
          },
          {
            id: 'project4',
            title: 'App para Cafetería Escolar',
            description: 'Aplicación Android desarrollada para agilizar el proceso de pedidos en una cafetería escolar. Los estudiantes pueden ver el menú, seleccionar productos y enviar pedidos directamente al encargado. Esto redujo tiempos de atención y mejoró la organización interna del servicio.',
            languages: ['Java', 'Android Studio', 'XML'],
            images: [
              'assets/images/projects/project4-full1.jpg'
            ],
            liveDemo: '#',
            github: '#',
            thumbnail: 'assets/images/projects/project4-thumb.jpg'
          },
          {
            id: 'project5',
            title: 'Portafolio Web Personal',
            description: 'Este portafolio ha sido desarrollado desde cero usando HTML, CSS y JavaScript puro, con una arquitectura basada en JSON para cargar los proyectos dinámicamente. Incluye tarjetas interactivas que se expanden al hacer clic, sliders de imágenes con Swiper.js, navegación fluida, y una estructura modular orientada a mantener el código limpio y escalable. Es tanto una vitrina de mis trabajos como una muestra directa de mis habilidades en desarrollo web frontend.',
            languages: ['HTML', 'CSS', 'JavaScript', 'Swiper.js', 'JSON'],
            images: [
              'assets/images/projects/project5-full1.jpg',
              'assets/images/projects/project5-full2.jpg'
            ],
            liveDemo: '#',
            github: '#',
            thumbnail: 'assets/images/projects/project5-thumb.jpg'
          },
          {
            id: 'project6',
            title: 'Sitio Web para Restaurante',
            description: 'Página web desarrollada con HTML, CSS y JavaScript para un restaurante local. Incluye sistema de reservas con formulario automático, menú digital y un diseño adaptable para móviles. Enfocado en la experiencia del usuario y la conversión de visitantes en clientes.',
            languages: ['HTML', 'CSS', 'JavaScript'],
            images: [
              'Images/CE/CE1.png','Images/CE/CE2.png','Images/CE/CE3.png','Images/CE/CE4.png','Images/CE/CE5.png','Images/CE/CE6.png','Images/CE/CE7.png','Images/CE/CE8.png','Images/CE/CE9.png','Images/CE/CE10.png'
            ],
            liveDemo: '#',
            github: '#',
            thumbnail: 'Images/CE/CE1.png'
          },
          {
            id: 'project7',
            title: 'Sitio Web Informativo para Empresa de Logística',
            description: 'Desarrollado para una empresa de logística, este sitio web ofrece información institucional clara y bien organizada. Secciones como servicios, misión, contacto y ubicación están estructuradas con navegación fluida. El diseño visual se adaptó a la identidad de la marca y es completamente responsivo.',
            languages: ['HTML', 'CSS', 'JavaScript'],
            images: [
              'assets/images/projects/project7-full1.jpg'
            ],
            liveDemo: '#',
            github: '#',
            thumbnail: 'assets/images/projects/project7-thumb.jpg'
          }
        ];

    // 3. Renderizar Proyectos
    const projectsContainer = document.getElementById('projects-container');
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalLanguages = document.getElementById('modal-languages');
    const modalProjectImages = document.getElementById('modal-project-images');
    const modalProjectLiveDemo = document.getElementById('modal-project-live-demo');

    function renderProjects() {
        if (!projectsContainer) return;

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
                if (project) showProjectModal(project);
            });
        });
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

    renderProjects();

    // 4. Inicializar Swiper.js
    if (projectsContainer && projectsContainer.children.length > 0) {
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

    // 5. Chatbot
    const chatbotToggleButton = document.getElementById('chatbot-toggle-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotCloseButton = document.getElementById('chatbot-close-button');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendButton = document.getElementById('chatbot-send-button');
    const chatbotBody = document.getElementById('chatbot-body');

    if (chatbotToggleButton && chatbotWindow && chatbotCloseButton && chatbotInput && chatbotSendButton && chatbotBody) {
        chatbotToggleButton.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
            if (chatbotWindow.classList.contains('open')) chatbotInput.focus();
        });

        chatbotCloseButton.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });

        chatbotSendButton.addEventListener('click', () => {
            sendMessage();
        });

        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        function sendMessage() {
            const userMessage = chatbotInput.value.trim();
            if (userMessage !== '') {
                displayMessage(userMessage, 'user');
                chatbotInput.value = '';
                setTimeout(() => handleBotResponse(userMessage), 500);
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
            const lowerMessage = message.toLowerCase();
            let botResponse = 'Lo siento, no entendí tu pregunta. ¿Puedes reformularla?';

            if (lowerMessage.includes('hola')) {
                botResponse = '¡Hola! ¿En qué puedo ayudarte hoy?';
            } else if (lowerMessage.includes('nombre')) {
                botResponse = 'Mi nombre es Brandon Uriel Escalona Garcia.';
            } else if (lowerMessage.includes('habilidades')) {
                botResponse = 'Mis habilidades incluyen HTML, CSS, JavaScript, PHP, Python, MySQL, y redes.';
            } else if (lowerMessage.includes('proyectos')) {
                botResponse = 'Puedes ver mis proyectos en la sección "Proyectos".';
            } else if (lowerMessage.includes('contacto')) {
                botResponse = 'Contáctame por email: brandonurielescalonagarcia@gmail.com o en LinkedIn.';
            } else if (lowerMessage.includes('edad')) {
                botResponse = 'Soy un bot, no tengo edad 😄';
            } else if (lowerMessage.includes('gracias')) {
                botResponse = '¡De nada! Estoy aquí para ayudarte.';
            } else if (lowerMessage.includes('desarrollador')) {
                botResponse = 'Soy un desarrollador junior enfocado en desarrollo web y sistemas.';
            } else if (lowerMessage.includes('cv') || lowerMessage.includes('curriculum')) {
                botResponse = 'Puedes ver mi CV en la sección de Inicio del portafolio.';
            } else if (lowerMessage.includes('redes')) {
                botResponse = 'Tengo experiencia con redes y configuración de infraestructura digital.';
            } else if (lowerMessage.includes('servidores')) {
                botResponse = 'Sé administrar servidores, especialmente Windows Server e IIS.';
            }

            displayMessage(botResponse, 'bot');
        }
    }
});
