let clickCount = 0;
const whatsappBtn = document.getElementById("whatsappBtn");
const clickCounter = document.getElementById("clickCounter");
const shareCompleteMessage = document.getElementById("shareCompleteMessage");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const thankYouMessage = document.getElementById("thankYouMessage");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwkznqyNxctndOr6WFUDIWm0Q9o3QJsTCFdHrCTLq2CTd8xPJ_fPpM_0CJe-CVoSPOuAQ/exec";


if (localStorage.getItem("submitted") === "true") {
  disableForm();
  thankYouMessage.style.display = "block";
}


whatsappBtn.addEventListener("click", () => {
  if (clickCount < 5) {
    clickCount++;
    clickCounter.innerText = `Click count: ${clickCount} / 5`;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    window.open(`https://wa.me/?text=${message}`, "_blank");

    if (clickCount === 5) {
      shareCompleteMessage.style.display = "block";
      submitBtn.disabled = false;
    }
  }
});


form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (clickCount < 5) {
    alert("Please complete WhatsApp sharing before submitting.");
    return;
  }

  submitBtn.innerText = "Submitting...";
  submitBtn.disabled = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const college = document.getElementById("college").value.trim();
  const fileInput = document.getElementById("screenshot");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload a screenshot/resume.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async function () {
    const base64 = reader.result.split(",")[1]; // remove data:*/*;base64,

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("college", college);
    formData.append("file", base64);
    formData.append("filename", file.name);
    formData.append("mimeType", file.type);

    try {
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      if (result === "Success") {
        localStorage.setItem("submitted", "true");
        disableForm();
        thankYouMessage.style.display = "block";
      } else {
        alert("Submission failed: " + result);
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Registration";
      }
    } catch (err) {
      alert("Error: " + err);
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Registration";
    }
  };

  reader.readAsDataURL(file);
});


function disableForm() {
  const inputs = form.querySelectorAll("input, button, select");
  inputs.forEach((el) => el.disabled = true);
}
