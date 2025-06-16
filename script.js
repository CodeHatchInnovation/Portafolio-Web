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
              'assets/images/projects/project6-full1.jpg'
            ],
            liveDemo: '#',
            github: '#',
            thumbnail: 'assets/images/projects/project6-thumb.jpg'
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

    // 3. Renderizar Proyectos y Modal
    const projectsContainer = document.getElementById('projects-container');
    // Asegúrate de que bootstrap.Modal esté disponible (verifica orden de scripts en HTML)
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalLanguages = document.getElementById('modal-languages');
    const modalProjectImages = document.getElementById('modal-project-images');
    const modalProjectLiveDemo = document.getElementById('modal-project-live-demo');

    function renderProjects() {
        if (!projectsContainer) {
            console.error('El elemento #projects-container no se encontró en el DOM.');
            return; // Salir si el contenedor no existe
        }

        projectsData.forEach(project => {
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            swiperSlide.dataset.projectId = project.id; // Para identificar el proyecto

            // *** ESTA ES LA CORRECCIÓN CRÍTICA: TODA LA CADENA HTML DEBE ESTAR ENTRE BACKTICKS (`) ***
            swiperSlide.innerHTML = `
                <img src="<span class="math-inline">\{project\.thumbnail\}" alt\="</span>{project.title}" class="project-thumbnail">
                <div class="project-details">
                    <h3><span class="math-inline">\{project\.title\}</h3\>
<p\></span>{project.description.substring(0, 100)}...</p>
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

        // Añadir evento click a cada botón "Ver Detalles" (delegación de eventos)
        // Se adjunta el listener al contenedor principal para manejar clics en elementos dinámicos
        document.querySelector('#projects-container').addEventListener('click', (event) => {
            if (event.target.classList.contains('view-project-btn')) {
                const projectId = event.target.closest('.swiper-slide').dataset.projectId;
                const project = projectsData.find(p => p.id === projectId);
                if (project) {
                    showProjectModal(project);
                }
            }
        });
    }

    function showProjectModal(project) {
        modalProjectTitle.textContent = project.title;
        modalProjectDescription.textContent = project.description;

        // *** CORRECCIÓN ADICIONAL PARA EL MODAL: TAMBIÉN AQUÍ USAR BACKTICKS PARA EL MAP DE LENGUAJES ***
        modalLanguages.innerHTML = project.languages.map(lang => `<span class="language-badge">${lang}</span>`).join('');
        
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
        } else if (project.github && project.github !== '#') { // Si no hay demo, mostrar GitHub como botón principal
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
    // Añadir un pequeño retraso para asegurar que los slides estén en el DOM antes de inicializar Swiper
    setTimeout(() => {
        const swiperContainerElement = document.querySelector('.swiper-container');
        // Solo inicializar Swiper si el contenedor existe y tiene slides
        if (swiperContainerElement && swiperContainerElement.querySelector('.swiper-wrapper').children.length > 0) {
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
        } else {
            console.warn('Swiper no se inicializó porque no se encontraron proyectos en el contenedor o el contenedor Swiper no existe.');
        }
    }, 100); // Pequeño delay de 100ms para asegurar el renderizado

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
                e.preventDefault(); // Previene el salto de línea o envío de formulario por defecto
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
            // *** CORRECCIÓN ADICIONAL: TAMBIÉN AQUÍ USAR BACKTICKS PARA LA CLASE DINÁMICA ***
            messageDiv.classList.add('chat-message', `${sender}-message`);
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
