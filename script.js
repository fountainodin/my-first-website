// ---------- Interactive buttons ----------

function changeMessage() {
    document.getElementById("message").textContent =
        "Amazing! You are learning web development!";
}

function changeBackground() {
    const colours = ["lightyellow", "lightgreen", "lightblue", "lavender"];

    const randomIndex = Math.floor(Math.random() * colours.length);

    document.body.style.backgroundColor = colours[randomIndex];
}

function greetVisitor() {
    const name = document.getElementById("visitorName").value.trim();

    if (name === "") {
        document.getElementById("greeting").textContent =
            "Please enter your name first!";
    } else {
        document.getElementById("greeting").textContent =
            "Hello, " + name + "! Welcome to my website.";
    }
}

// ---------- Skill progress bars ----------
// Sets each bar's width from its data-progress value.

document.querySelectorAll(".skill-progress").forEach(function (bar) {
    const progress = Number(bar.dataset.progress) || 0;
    bar.style.width = progress + "%";
});

// ---------- Contact form (sent through Formspree) ----------

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function setFormStatus(message) {
    if (formStatus) {
        formStatus.textContent = message;
    }
}

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");
        const name = document.getElementById("contactName").value.trim();

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        setFormStatus("");

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                contactForm.reset();
                setFormStatus(
                    "Thank you, " + name + "! Your message has been sent."
                );
            } else {
                setFormStatus("Something went wrong. Please try again.");
            }
        } catch (error) {
            setFormStatus(
                "Could not send. Check your connection and try again."
            );
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    });
}

// ---------- Typing effect ----------

const typingText = document.getElementById("typing-text");

const phrases = [
    "Aspiring Software Engineer",
    "Future Developer",
    "Learning HTML, CSS & JavaScript"
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentPhrase.substring(0, characterIndex);

    let speed = deleting ? 50 : 100;

    if (!deleting && characterIndex === currentPhrase.length) {
        deleting = true;
        speed = 1500;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

if (typingText) {
    typeEffect();
}