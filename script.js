const form = document.getElementById("contactForm");
const responseList = document.getElementById("responseList");
const themeToggle = document.getElementById("toggle-theme");
const body = document.body;

function loadResponses() {
  const responses = JSON.parse(localStorage.getItem("responses") || "[]");
  responseList.innerHTML = "";

  responses.forEach((res) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${res.name}</strong> (${res.email})</p>
      <p>${res.message}</p>
      <p class="timestamp">${res.time}</p>
      <hr/>
    `;
    responseList.appendChild(div);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const time = new Date().toLocaleString();

  if (name && email && message) {
    const newResponse = { name, email, message, time };
    const responses = JSON.parse(localStorage.getItem("responses") || "[]");
    responses.push(newResponse);
    localStorage.setItem("responses", JSON.stringify(responses));
    form.reset();
    loadResponses();
  }
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
  themeToggle.textContent = body.classList.contains("dark") ? "☀" : "🌙";
});

loadResponses();