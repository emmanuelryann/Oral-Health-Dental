const form = document.querySelector('.booking-section');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const occurence = document.getElementById('occurence').value;
    const service = document.getElementById('service').value;
    const provider = document.getElementById('provider').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Validation checks
    if (!name || !phone || !occurence || !service || !provider || !date || !time) {
        showError("Please fill in all fields.");
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError("Name must only contain letters.");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        showError("Phone number must be 10 digits.");
        return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
        showError("Please choose a future date.");
        return;
    }

    // Send data to PHP backend
    const appointmentData = {
        name,
        phone,
        occurence,
        service,
        provider,
        date,
        time
    };

    fetch('appointment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
    })
    .then(response => {
        return response.text().then(text => {
            console.log("Raw response:", text); // Log what was actually received
            return JSON.parse(text);
        });
    })
    .then(data => {
        if (data.status === 'success') {
            successModal.style.display = 'flex';
        } else {
            showError("Failed to save appointment: " + data.message);
        }
    })
    .catch(error => {
        showError("Network error: " + error.message);
    });
});

// Close success modal and redirect
document.getElementById('modalCloseBtn').addEventListener('click', function () {
    successModal.style.display = 'none';
    window.location.href = 'index.html';
});

// Close error modal
document.getElementById('errorCloseBtn').addEventListener('click', function () {
    errorModal.style.display = 'none';
});

function showError(message) {
    errorMsg.textContent = message;
    errorModal.style.display = 'flex';
}

// Handle back button click
document.querySelector('.bi-chevron-left').addEventListener('click', function () {
    window.history.back(); // Navigate to previous page
});