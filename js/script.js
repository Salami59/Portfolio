const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('button[type="submit"]');
const successMsg = document.getElementById('ok');
const errorMsg = document.getElementById('err');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    if (!name || !email || !message) {
        errorMsg.textContent = "❗Please fill in ALL required fields before sending!❗";
        errorMsg.style.display = 'block';
        return;
    }

    const formData = new FormData(form);
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            successMsg.textContent = "✅ Message sent — thank you!";
            successMsg.style.display = 'block';
            form.reset();
        } else {
            errorMsg.textContent = "❌ Something went wrong: " + data.message;
            errorMsg.style.display = 'block';
        }

    } catch (error) {
        errorMsg.textContent = "❌ Something went wrong. Please try again.";
        errorMsg.style.display = 'block';
        console.error(error);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
