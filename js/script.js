const form = document.querySelector(".booking-form");
const bookingsList = document.querySelector("#bookings-list");

async function loadBookings() {
  const response = await fetch("/consultations");
  const bookings = await response.json();

  bookingsList.innerHTML = "";

  bookings.forEach((booking) => {
    const item = document.createElement("div");
    item.className = "booking-item";
    item.innerHTML = `
      <strong>${booking.name}</strong><br>
      Email: ${booking.email || "-"}<br>
      Date: ${booking.date || "-"}<br>
      Time: ${booking.time || "-"}
    `;
    bookingsList.appendChild(item);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll("input");

  const newConsultation = {
    id: Date.now(),
    name: inputs[0].value,
    email: inputs[1].value,
    date: inputs[2].value,
    time: inputs[3].value
  };

  const response = await fetch("/consultations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newConsultation)
  });

  if (response.ok) {
    alert("Запис успішно додано");
    form.reset();
    loadBookings();
  } else {
    alert("Сталася помилка");
  }
});

loadBookings();