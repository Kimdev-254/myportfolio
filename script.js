function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Disable button while sending
    submitButton.disabled = true;
    
    fetch('d_mail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showToast('Message sent successfully!', 'success');
            this.reset();
        } else {
            showToast('Failed to send message. Please try again.', 'error');
        }
    })
    .catch(error => {
        showToast('An error occurred. Please try again later.', 'error');
    })
    .finally(() => {
        // Re-enable button after response
        submitButton.disabled = false;
    });
});