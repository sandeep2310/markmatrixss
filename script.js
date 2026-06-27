const year = document.querySelector("#year");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
const detailButtons = document.querySelectorAll(".details-toggle");
const clientButtons = document.querySelectorAll(".client-more");
const enquiryForm = document.querySelector("#enquiryForm");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const details = button.parentElement.querySelector(".details");
    const isHidden = details.classList.toggle("hidden");
    button.textContent = isHidden ? "View Details" : "Hide Details";
  });
});

clientButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const extra = button.parentElement.querySelector(".client-extra");
    const isHidden = extra.classList.toggle("hidden");
    button.textContent = isHidden ? "Show More" : "Show Less";
  });
});

function setError(fieldName, message) {
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);

  if (error) {
    error.textContent = message;
  }
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = "";
  });
}

function getFormData(form) {
  return {
    name: form.name.value.trim(),
    mobile: form.mobile.value.trim(),
    purpose: form.purpose.value,
    otherInfo: form.otherInfo.value.trim(),
  };
}

function validateEnquiry(data) {
  let isValid = true;

  clearErrors();

  if (!data.name) {
    setError("name", "Name is mandatory.");
    isValid = false;
  }

  if (!data.mobile) {
    setError("mobile", "Mobile/contact number is mandatory.");
    isValid = false;
  }

  return isValid;
}

function simulateDelivery(data) {
  const formStatus = document.querySelector("#formStatus");
  const deliveryLog = document.querySelector("#deliveryLog");

  formStatus.textContent = "Thank you. We will connect with you shortly.";

  deliveryLog.replaceChildren();

  [
    ["Name", data.name],
    ["Mobile", data.mobile],
    ["Purpose", data.purpose],
    ["Other Info", data.otherInfo || "Not provided"],
	["Status", "Submitted"],
  ].forEach(([label, value]) => {
    const line = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    line.append(strong, value);
    deliveryLog.append(line);
  });

  console.info("Test enquiry submitted:", {
    enquiry: data,
  });
}

if (enquiryForm) {
  enquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = getFormData(enquiryForm);

    if (!validateEnquiry(data)) {
      return;
    }

    const formStatus = document.querySelector("#formStatus");
    const submitButton = enquiryForm.querySelector(".submit-button");

    if (formStatus) {
      formStatus.textContent = "Sending your enquiry...";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const formData = new FormData(enquiryForm);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        if (formStatus) {
          formStatus.textContent = "Thank you. Your enquiry has been submitted successfully.";
        }

        simulateDelivery(data);
        enquiryForm.reset();
      } else {
        if (formStatus) {
          formStatus.textContent = result.message || "Submission failed. Please try again.";
        }
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = "Something went wrong. Please try again later.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      }
    }
  });
}
