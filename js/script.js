// year
document.getElementById("year").textContent = new Date().getFullYear();

// smooth scroll + active nav
document.querySelectorAll("nav a, .gallery-link").forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });

      document.querySelectorAll("nav a").forEach(x => x.classList.remove("active"));
      a.classList.add("active");
    }
  });
});

// contact form (fake backend simulation)
const form = document.getElementById("contactForm");
const err = document.getElementById("err");
const ok = document.getElementById("ok");

form.addEventListener("submit", async e => {
  e.preventDefault();
  err.style.display = "none";
  ok.style.display = "none";

  const name = form.name.value.trim();
  const email = form.email.value.trim();

  if (!name || !email) {
    err.textContent = "Please enter your name and a valid email address.";
    err.style.display = "block";
    return;
  }

  const emailRe = /^[^@]+@[^@]+\.[^@]+$/;
  if (!emailRe.test(email)) {
    err.textContent = "Please enter a valid email address.";
    err.style.display = "block";
    return;
  }

  // simulate sending
  try {
    await new Promise(res => setTimeout(res, 600));
    if (Math.random() < 0.85) {
      ok.style.display = "block";
      form.reset();
    } else {
      throw new Error("server");
    }
  } catch {
    err.textContent = "Something went wrong... Please contact me directly via email.";
    err.style.display = "block";
  }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    .then(function() {
      alert('Message sent successfully!');
    }, function(error) {
      alert('Oops… something went wrong: ' + JSON.stringify(error));
    });
});
