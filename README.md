# Portafolio Personal - Brandon Uriel Escalona Garcia

Este repositorio contiene el código fuente de mi portafolio web personal, diseñado para mostrar mis habilidades y proyectos. Ha sido desarrollado con un enfoque en tecnologías frontend modernas (HTML, CSS, JavaScript) y la integración de componentes interactivos.

## 🚀 Características Principales
* **Diseño Responsivo:** Adaptable a diferentes tamaños de pantalla (escritorio, tablet, móvil).
* **Sección de Proyectos Dinámica:** Los proyectos se cargan desde un archivo JSON (simulado como `projectsData` en `script.js`) y se visualizan en un carrusel interactivo utilizando **Swiper.js**.
* **Modal de Detalles de Proyecto:** Al hacer clic en "Ver Detalles" en una tarjeta de proyecto, se abre un modal con información extendida y galería de imágenes (usando **Bootstrap 5 Modal**).
* **Chatbot Interactivo:** Un chatbot simple implementado en JavaScript puro para responder preguntas frecuentes sobre mi perfil y habilidades.
* **Menú de Navegación Hamburguesa:** Para una experiencia de usuario optimizada en dispositivos móviles.
* **Enfoque en Accesibilidad:** Inclusión de atributos `aria-label` para mejorar la navegación con lectores de pantalla.

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Estructura de la página web.
* **CSS3:** Estilos y diseño responsivo.
* **JavaScript (ES6+):** Lógica interactiva del sitio, carga dinámica de contenido, chatbot.
* **Swiper.js:** Librería para el carrusel de proyectos.
* **Bootstrap 5:** Framework CSS y JS para componentes UI (modal).
* **Font Awesome:** Iconografía.

## 📁 Estructura del Proyecto
.
├── index.html
├── style.css
├── script.js
├── images/
│   ├── css/        
│   ├── images/
└── README.md


## ⚙️ Configuración y Ejecución Local
Para visualizar y probar este proyecto localmente, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://codehatchinnovation.github.io/Portafolio-Web/
    cd Portafolio-Web
    ```
2.  **Abre `index.html`:** Simplemente abre el archivo `index.html` en tu navegador web preferido. No se necesita un servidor local para la funcionalidad básica.

### Dependencias Externas (CDN)

El proyecto utiliza las siguientes librerías a través de CDN, las cuales son cargadas en el `index.html`:

* **Swiper.js:** `https://unpkg.com/swiper/swiper-bundle.min.js`
* **Bootstrap 5:** `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js`
* **Font Awesome:** `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">`

**Nota Importante sobre el orden de los scripts en `index.html`:**

Es crucial que el script de Bootstrap se cargue **antes** de `script.js` y que `script.js` sea el último script cargado. Esto asegura que todas las librerías necesarias estén disponibles antes de que se ejecute el código JavaScript personalizado del portafolio.

```html
    <script src="[https://unpkg.com/swiper/swiper-bundle.min.js](https://unpkg.com/swiper/swiper-bundle.min.js)"></script>
    <script src="[https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js](https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js)"></script>
    <script src="script.js"></script>
</body>
</html>
🐛 Soluciones a Problemas Comunes (Debugging)
Durante el desarrollo de este portafolio, se abordaron varios desafíos comunes de frontend:

Problema: Los datos de los proyectos ({project.title}, {project.description}) no se mostraban correctamente en las tarjetas de Swiper, apareciendo como texto literal.

Causa: Uso incorrecto de las "template literals" (cadenas de plantilla). Faltaban las comillas invertidas (backticks `) que encierran el HTML dinámico o se usaban comillas simples/dobles. Además, la propiedad thumbnail en project.thumbnail no se estaba interpretando correctamente para la vista principal.
Solución: Se aseguró que todo el bloque HTML asignado a swiperSlide.innerHTML esté envuelto en comillas invertidas. Se cambió la fuente de la imagen de la tarjeta principal de project.thumbnail a project.images[0] para garantizar la correcta visualización de las miniaturas.
Problema: Advertencias de accesibilidad en el editor (Buttons must have discernible text).

Causa: Botones que solo contienen íconos no tenían texto alternativo para lectores de pantalla.
Solución: Se añadieron atributos aria-label y title a los botones afectados (ej. el botón del chatbot, botones de cerrar modal) para proporcionar una descripción accesible.
HTML

<button class="chatbot-toggle-button" id="chatbot-toggle-button" aria-label="Abrir Chatbot" title="Abrir Chatbot">
    <i class="fas fa-robot"></i>
</button>
Problema: Errores de sintaxis en style.css (ej. "se esperaba punto y coma", "se esperaba un selector o una regla").

Causa: Declaraciones CSS incompletas (falta de ; al final de las propiedades) o comentarios mal cerrados.
Solución: Revisión y corrección de la sintaxis CSS para asegurar que todas las propiedades terminen con punto y coma y que los comentarios multilinea (/* ... */) estén correctamente formados.
