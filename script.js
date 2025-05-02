// Initialize EmailJS with your public key
(function() {
    emailjs.init("X3oTtsYz2vBL0J58L"); // Add your EmailJS public key here
})();

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    const formStatus = document.getElementById('formStatus');
    
    // Prepare template parameters
    const templateParams = {
        from_name: this.name.value,
        from_email: this.email.value,
        message: this.message.value
    };

    // Send email using EmailJS
    emailjs.send('service_uezhrln', 'template_qr6fin7', templateParams)
        .then(function(response) {
            formStatus.innerHTML = '<p class="success-message">Message sent successfully!</p>';
            document.getElementById('contactForm').reset();
            
            // Fade out and remove message
            setTimeout(() => {
                const message = formStatus.querySelector('.success-message');
                message.classList.add('fade-out');
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 500);
            }, 2500);
        }, function(error) {
            formStatus.innerHTML = '<p class="error-message">Failed to send message. Please try again.</p>';
            
            // Fade out and remove message
            setTimeout(() => {
                const message = formStatus.querySelector('.error-message');
                message.classList.add('fade-out');
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 500);
            }, 2500);
        })
        .finally(function() {
            // Restore button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
});