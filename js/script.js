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
        alert("❗Please fill in all required fields before sending❗");
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
            successMsg.style.display = 'block';
            form.reset();
        } else {
            errorMsg.style.display = 'block';
            console.error("Error:", data.message);
        }

    } catch (error) {
        errorMsg.style.display = 'block';
        console.error(error);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
