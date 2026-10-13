function changeMessage() {
    document.getElementById("message").textContent =
        "Amazing! You are learning web deveplopment!";
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
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value;

    alert("Thank you, " + name + "! Your message has been received.");
});
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

document.querySelectorAll(".skill-progress").forEach(function (bar) {
    const progress = bar.dataset.progress;
    bar.style.width = progress + "%";
});
