let clickCount = 0;
const whatsappBtn = document.getElementById("whatsappBtn");
const clickCounter = document.getElementById("clickCounter");
const shareCompleteMessage = document.getElementById("shareCompleteMessage");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const thankYouMessage = document.getElementById("thankYouMessage");

// Check if already submitted (prevent resubmission)
if (localStorage.getItem("submitted") === "true") {
  disableForm();
  thankYouMessage.style.display = "block";
}

// WhatsApp Share button logic
whatsappBtn.addEventListener("click", () => {
  if (clickCount < 5) {
    clickCount++;
    clickCounter.innerText = `Click count: ${clickCount} / 5`;

    // Pre-written WhatsApp message
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");

    // If 5 clicks are done, show green message and enable submit
    if (clickCount === 5) {
      shareCompleteMessage.style.display = "block";
      submitBtn.disabled = false;
    }
  }
});

// Form submission logic
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (clickCount < 5) {
    alert("Please complete WhatsApp sharing before submitting.");
    return;
  }

  // Show fake success (until Google Sheet is ready)
  alert("Submitting form...");

  // Simulate successful submission
  setTimeout(() => {
    disableForm();
    thankYouMessage.style.display = "block";
    localStorage.setItem("submitted", "true");
  }, 1000);
});

// Disable the form
function disableForm() {
  const inputs = form.querySelectorAll("input, button, select");
  inputs.forEach((el) => {
    el.disabled = true;
  });
}
