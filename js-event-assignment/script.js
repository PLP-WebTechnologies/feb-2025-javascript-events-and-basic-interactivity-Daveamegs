// Event Handling Section
document.addEventListener('DOMContentLoaded', () => {
    // Click event
    const clickBox = document.getElementById('click-box');
    clickBox.addEventListener('click', () => {
        clickBox.style.backgroundColor = getRandomColor();
        clickBox.querySelector('p').textContent = "You clicked me!";
    });

    // Hover events
    const hoverBox = document.getElementById('hover-box');
    hoverBox.addEventListener('mouseenter', () => {
        hoverBox.style.transform = 'scale(1.05)';
        hoverBox.querySelector('p').textContent = "Hello there!";
    });
    hoverBox.addEventListener('mouseleave', () => {
        hoverBox.style.transform = 'scale(1)';
        hoverBox.querySelector('p').textContent = "Hover over me!";
    });

    // Keypress event
    const keypressBox = document.getElementById('keypress-box');
    keypressBox.setAttribute('tabindex', '0'); // Make it focusable
    keypressBox.addEventListener('keydown', (e) => {
        keypressBox.style.backgroundColor = getRandomColor();
        keypressBox.querySelector('p').textContent = `You pressed: ${e.key}`;
    });

    // Secret events (double-click and long press)
    const secretBox = document.getElementById('secret-box');
    const secretMessage = document.getElementById('secret-message');

    let pressTimer;
    secretBox.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            secretMessage.classList.remove('hidden');
            secretBox.style.backgroundColor = 'gold';
            setTimeout(() => secretMessage.classList.add('hidden'), 2000);
        }, 1000);
    });

    secretBox.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });

    secretBox.addEventListener('dblclick', () => {
        secretMessage.classList.remove('hidden');
        secretBox.style.backgroundColor = 'purple';
        secretBox.querySelector('p').textContent = "Secret unlocked!";
        setTimeout(() => secretMessage.classList.add('hidden'), 2000);
    });

    // Interactive Elements Section
    // Color changer
    const colorButton = document.getElementById('color-button');
    const colorDisplay = document.getElementById('color-display');

    colorButton.addEventListener('click', () => {
        const newColor = getRandomColor();
        colorDisplay.style.backgroundColor = newColor;
        colorDisplay.textContent = newColor;
    });

    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;

    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });

    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 3000);

    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update contents
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Form Validation Section
    const form = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const formSuccess = document.getElementById('form-success');

    // Real-time validation
    nameInput.addEventListener('input', () => {
        validateField(nameInput, nameInput.value.trim() !== '', 'Name is required');
    });

    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(emailInput, emailRegex.test(emailInput.value), 'Please enter a valid email');
    });

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const hasMinLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        // Update password rules display
        updatePasswordRule('length', hasMinLength);
        updatePasswordRule('number', hasNumber);
        updatePasswordRule('special', hasSpecialChar);

        validateField(passwordInput, hasMinLength && hasNumber && hasSpecialChar, 'Password does not meet requirements');
    });

    function updatePasswordRule(rule, isValid) {
        const ruleElement = document.querySelector(`.rule[data-rule="${rule}"]`);
        ruleElement.textContent = `${isValid ? '✅' : '❌'} ${ruleElement.textContent.slice(2)}`;
    }

    function validateField(field, isValid, errorMessage) {
        const errorElement = field.nextElementSibling;
        if (!isValid && field.value) {
            field.classList.add('invalid');
            errorElement.textContent = errorMessage;
        } else {
            field.classList.remove('invalid');
            errorElement.textContent = '';
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;

        if (nameInput.value.trim() === '') {
            validateField(nameInput, false, 'Name is required');
            isValid = false;
        }

        if (emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            validateField(emailInput, false, 'Please enter a valid email');
            isValid = false;
        }

        const password = passwordInput.value;
        if (password && !(password.length >= 8 && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password))) {
            validateField(passwordInput, false, 'Password does not meet requirements');
            isValid = false;
        }

        if (isValid) {
            form.reset();
            formSuccess.classList.remove('hidden');
            setTimeout(() => formSuccess.classList.add('hidden'), 3000);
        }
    });

    // Helper function for random colors
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});