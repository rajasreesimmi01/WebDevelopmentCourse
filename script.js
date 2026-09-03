const mob_nav_element = document.querySelector('.nav-mobile');
const nav_menu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const modalElement = document.getElementById('lightbox-modal');
const projectImages = document.querySelectorAll('#projects article img');
const modalImage = document.getElementById('lightbox-image');
const modalClose = document.getElementById('lightbox-close');

// function to toggle navigation menu in mobile view
function toggleMenu() {
    nav_menu.classList.toggle('open');
}
mob_nav_element.addEventListener('click', toggleMenu);

//function to enable smoth scrollig when nav links are clicked
navLinks.forEach(link => { 
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behaviour: "smooth"
        });
    });
});

//function to close the modal
function closeModal() {
    modalElement.style.display = 'none';
}

//function to open modal when image is clicked
function openModal(e) {
    modalImage.src = e.target.src;
    modalElement.style.display = 'flex';
}
projectImages.forEach(img => {
    img.addEventListener('click', openModal);
});

//attach listener to close the modal
modalClose.addEventListener('click', closeModal);

//close the modal when clicking outside the modal
modalElement.addEventListener('click', function (e) {
    if (e.target === modalElement) {
        closeModal();
    }
});

//contact form validation
const contactName = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
function showError(input, message) {
    const parent = input.parentElement;
    let error = parent.querySelector(".error-msg");
    if (!error) {
        error = document.createElement("small");
        error.classList.add("error-msg");
        parent.appendChild(error);
    }
    error.textContent = message;
    input.classList.add("invalid");
    isValid = false;
}
function clearError(input) {
    const parent = input.parentElement;
    let error = parent.querySelector(".error-msg");
    if (error) {
        error.textContent = "";
    }
    input.classList.remove("invalid");
}

function validateName() {
    let isValid = true;
    if (contactName.value.trim() === "") {
        showError(contactName, "Name is required");
        return !isValid;
    } else {
        clearError(contactName);
        return isValid;
    }
}
function validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid = true;
    if (!emailPattern.test(email.value.trim())) {
        showError(email, "Enter valid email address");
        return !isValid;
    } else {
        clearError(email);
        return isValid;
    }
}
function validateSubject() {
    let isValid = true;
    if (subject.value.trim() === "") {
        showError(subject, "Subject is required");
        return !isValid;
    } else {
        clearError(subject);
        return isValid;
    }
}
function validateMessage() {
    let isValid = true;
    if (message.value.trim().length < 10) {
        showError(message, "Message must be at least 10 characters long.");
        return !isValid;
    } else {
        clearError(message);
        return isValid;
    }
}
contactName.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
subject.addEventListener("input", validateSubject);
message.addEventListener("input", validateMessage);
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
    if (!validateName() ||
        !validateEmail() ||
        !validateSubject() ||
        !validateMessage()) {
        e.preventDefault();
    }
});


//filter projects
const filterButtons = document.querySelectorAll(".filter-buttons button");
const projectCards = document.querySelectorAll("#projects article");
filterButtons.forEach(button => { 
    button.addEventListener("click", function () { 
        const filter = button.getAttribute("data-filter");
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        projectCards.forEach(card => { 
            const cardCategory = card.getAttribute("data-category");
            if (filter === "all" || filter === cardCategory) {
                card.style.display = "block";
                card.classList.add(".fade-in");
            } else {
                card.style.display = "none";
            }
        });
    });
    
});