// Initialize EmailJS with your public key
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Add your EmailJS public key here
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
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            formStatus.innerHTML = '<p class="success-message">Message sent successfully!</p>';
            // Reset form
            document.getElementById('contactForm').reset();
        }, function(error) {
            formStatus.innerHTML = '<p class="error-message">Failed to send message. Please try again.</p>';
        })
        .finally(function() {
            // Restore button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
});