document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const form = document.getElementById("calc-form");
  if (!form) return;

  const preset = document.getElementById("appliance");
  const powerInput = document.getElementById("watts");
  const hoursInput = document.getElementById("hours");
  const priceInput = document.getElementById("price");
  const inputs = [powerInput, hoursInput, priceInput];
  const resultElements = {
    daily: document.getElementById("result-daily"),
    monthly: document.getElementById("result-monthly"),
    yearly: document.getElementById("result-yearly"),
    cost: document.getElementById("result-cost"),
  };
  let hasSubmitted = false;

  function calculate(showErrors = false) {
    let isValid = true;

    inputs.forEach((input) => {
      const error = document.getElementById(`${input.id}-error`);
      const value = input.value.trim();
      let message = "";

      if (value === "") {
        message = "This field is required.";
      } else if (!Number.isFinite(Number(value))) {
        message = "Enter a valid number.";
      } else if (Number(value) < Number(input.min)) {
        message = `Value must be at least ${input.min}.`;
      } else if (Number(value) > Number(input.max)) {
        message = `Value must be no more than ${input.max}.`;
      } else if (input.validity.stepMismatch) {
        message = `Use increments of ${input.step}.`;
      }

      error.textContent = showErrors ? message : "";
      if (message) isValid = false;
    });

    if (!isValid) {
      Object.values(resultElements).forEach((element) => {
        element.textContent = "–";
      });
      return;
    }

    const watts = Number(powerInput.value);
    const hoursPerDay = Number(hoursInput.value);
    const priceCents = Number(priceInput.value);
    const dailyEnergy = (watts * hoursPerDay) / 1000;
    const monthlyEnergy = dailyEnergy * 30;
    const yearlyEnergy = dailyEnergy * 365;
    const annualCost = (yearlyEnergy * priceCents) / 100;

    resultElements.daily.textContent = `${dailyEnergy.toFixed(2)} kWh`;
    resultElements.monthly.textContent = `${monthlyEnergy.toFixed(2)} kWh`;
    resultElements.yearly.textContent = `${yearlyEnergy.toFixed(2)} kWh`;
    resultElements.cost.textContent = `$${annualCost.toFixed(2)}`;
    document.getElementById("result-note").textContent =
      "Estimate uses a 30-day month and 365-day year; actual costs may vary.";
  }

  if (preset.value !== "custom") {
    powerInput.value = preset.value;
    powerInput.readOnly = true;
  }
  calculate();

  preset.addEventListener("change", () => {
    if (preset.value === "custom") {
      powerInput.value = "";
      powerInput.readOnly = false;
    } else {
      powerInput.value = preset.value;
      powerInput.readOnly = true;
    }

    calculate(hasSubmitted);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hasSubmitted = true;
    calculate(true);
  });

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      calculate(hasSubmitted);
    });
  });
});