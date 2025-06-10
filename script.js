document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - (document.querySelector('header').offsetHeight), // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Projects Section ===
    const projectsContainer = document.getElementById('projects-container');
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal')); // Initialize Bootstrap modal
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalLanguages = document.getElementById('modal-languages');
    const modalProjectImages = document.getElementById('modal-project-images');
    const modalProjectLiveDemo = document.getElementById('modal-project-live-demo');

    let allProjectsData = []; // To store fetched projects for modal lookup

    // Fetch projects data
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allProjectsData = data.projects; // Store data globally for modal
            renderProjects(allProjectsData);
            initSwiper(); // Initialize Swiper AFTER projects are rendered
            // No need to call addProjectDetailsListeners here, as Bootstrap's 'show.bs.modal'
            // event listener is added directly to the modal and uses event.relatedTarget
        })
        .catch(error => console.error('Error fetching projects:', error));

    function renderProjects(projects) {
        projectsContainer.innerHTML = ''; // Clear existing content

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('swiper-slide'); // Keep for consistent styling
            projectCard.innerHTML = `
                <img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail">
                <div class="project-details">
                    <h3>${project.title}</h3>
                    <p>${project.short_description}</p>
                    <div class="project-languages">
                        ${project.languages.map(lang => `<span class="language-badge">${lang}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <button class="btn btn-primary btn-sm view-details-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#projectModal"
                                data-project-id="${project.id}">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }

    // Function to initialize Swiper
    function initSwiper() {
        // Check if Swiper is already initialized on the container
        if (projectsContainer.swiper) {
            projectsContainer.swiper.destroy(true, true); // Destroy old instance
        }
        
        new Swiper('.swiper-container', {
            loop: true, // Optional: Loop through slides
            slidesPerView: 1, // Default: show 1 slide
            spaceBetween: 30, // Space between slides
            grabCursor: true, // Show grab cursor
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            },
            autoplay: { // Optional: Autoplay the slider
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    }

    // Listen for the Bootstrap modal 'show' event (this replaces addProjectDetailsListeners)
    document.getElementById('projectModal').addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        const button = event.relatedTarget;
        // Extract info from data-project-id attribute
        const projectId = button.getAttribute('data-project-id');
        // Find the project from the allProjectsData array
        const project = allProjectsData.find(p => p.id === projectId);

        if (project) {
            modalProjectTitle.textContent = project.title;
            modalProjectDescription.textContent = project.long_description;

            modalLanguages.textContent = 'Tecnologías: ' + project.languages.join(', ');

            modalProjectImages.innerHTML = ''; // Clear previous images
            project.images.forEach(imageSrc => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = project.title;
                modalProjectImages.appendChild(img);
            });

            if (project.live_demo_url || project.github_url) {
                modalProjectLiveDemo.style.display = 'inline-block';
                modalProjectLiveDemo.href = project.live_demo_url || project.github_url;
                modalProjectLiveDemo.textContent = project.live_demo_url ? 'Ver Demo' : 'Ver en GitHub';
            } else {
                modalProjectLiveDemo.style.display = 'none'; // Hide if no link
            }
        }
    });

    // === Chatbot Logic ===
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-button');
    const chatbotCloseBtn = document.getElementById('chatbot-close-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-button');
    const chatbotBody = document.getElementById('chatbot-body');

    if (chatbotToggleBtn && chatbotWindow && chatbotCloseBtn && chatbotInput && chatbotSendBtn && chatbotBody) {
        chatbotToggleBtn.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
        });

        chatbotCloseBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });

        chatbotSendBtn.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    } else {
        console.error("One or more chatbot elements not found. Check your HTML IDs.");
    }

    function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;

        appendMessage(userMessage, 'user-message');
        chatbotInput.value = '';

        // Simple bot response (can be expanded later with actual AI or predefined answers)
        setTimeout(() => {
            appendMessage("Gracias por tu mensaje. Actualmente soy un bot de demostración y no puedo responder preguntas complejas. Puedes contactar a Brandon directamente a través de la sección de Contacto.", 'bot-message');
            chatbotBody.scrollTop = chatbotBody.scrollHeight; // Ensure scroll to bottom after bot message
        }, 800); // Give a slight delay for bot response
    }

    function appendMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', type);
        messageElement.textContent = message;
        chatbotBody.appendChild(messageElement);
        // Scroll to the bottom of the chat body to show the latest message
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
});