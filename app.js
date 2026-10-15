"use strict";

// Each table is an object with its own reservation state, like a simple Java class instance.
const tables = ["T1", "T2", "T3", "T4", "T5"].map((tableNumber) => ({
  tableNumber,
  reserved: false,
  customerName: "",
  guests: 0,
}));

const form = document.querySelector("#reservation-form");
const nameInput = document.querySelector("#customer-name");
const tableSelect = document.querySelector("#table-number");
const guestInput = document.querySelector("#guest-count");
const feedback = document.querySelector("#form-feedback");
const tableGrid = document.querySelector("#table-grid");
const bookingList = document.querySelector("#booking-list");
const emptyState = document.querySelector("#empty-state");
const availableCount = document.querySelector("#available-count");
const reservedCount = document.querySelector("#reserved-count");
const bookingCount = document.querySelector("#booking-count");

const tableIcon = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3m12.4 0h3M5.5 5.5l2.1 2.1m8.8 8.8 2.1 2.1m0-13-2.1 2.1m-8.8 8.8-2.1 2.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

function setFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`;
  feedback.hidden = false;
}

function clearFieldErrors() {
  [nameInput, tableSelect, guestInput].forEach((field) => field.removeAttribute("aria-invalid"));
}

function markInvalid(field, message) {
  field.setAttribute("aria-invalid", "true");
  setFeedback(message, "error");
  field.focus();
}

function renderTables() {
  tableGrid.innerHTML = tables.map((table) => `
    <article class="table-card${table.reserved ? " reserved" : ""}" aria-label="Table ${table.tableNumber}, ${table.reserved ? "Reserved" : "Available"}${table.reserved ? ` for ${escapeHtml(table.customerName)}` : ""}">
      <div class="table-card-top"><span class="table-illustration">${tableIcon}</span><span class="table-number">${table.tableNumber}</span></div>
      <span class="table-status"><i aria-hidden="true"></i>${table.reserved ? "Reserved" : "Available"}</span>
    </article>`).join("");
}

function renderBookings() {
  const activeBookings = tables.filter((table) => table.reserved);
  bookingCount.textContent = `${activeBookings.length} ${activeBookings.length === 1 ? "booking" : "bookings"}`;
  emptyState.hidden = activeBookings.length > 0;
  bookingList.innerHTML = activeBookings.map((table) => `
    <tr>
      <td class="booking-table-number">${table.tableNumber}</td>
      <td class="booking-name">${escapeHtml(table.customerName)}</td>
      <td>${table.guests}</td>
      <td><span class="booking-status">Reserved</span></td>
      <td><button class="cancel-button" type="button" data-cancel="${table.tableNumber}" aria-label="Cancel reservation for table ${table.tableNumber}">Cancel</button></td>
    </tr>`).join("");
}

function renderStats() {
  const reserved = tables.filter((table) => table.reserved).length;
  reservedCount.textContent = String(reserved);
  availableCount.textContent = String(tables.length - reserved);
  tableSelect.querySelectorAll("option[value]").forEach((option) => {
    const table = tables.find((item) => item.tableNumber === option.value);
    if (table) option.textContent = `${table.tableNumber} · ${table.reserved ? "Reserved" : "Available"}`;
  });
}

function render() {
  renderStats();
  renderTables();
  renderBookings();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function reserveTable(event) {
  event.preventDefault();
  clearFieldErrors();

  const customerName = nameInput.value.trim();
  const tableNumber = tableSelect.value;
  const guestText = guestInput.value.trim();
  const guests = Number(guestText);

  if (!customerName) return markInvalid(nameInput, "Please enter the customer's name.");
  if (!tables.some((table) => table.tableNumber === tableNumber)) return markInvalid(tableSelect, "Please choose a valid table (T1–T5).");
  if (!guestText || !Number.isInteger(guests) || guests < 1 || guests > 10) {
    return markInvalid(guestInput, "Guest count must be a whole number between 1 and 10.");
  }

  const table = tables.find((item) => item.tableNumber === tableNumber);
  if (table.reserved) return markInvalid(tableSelect, `Sorry! Table ${tableNumber} is already reserved. Choose another table.`);

  table.customerName = customerName;
  table.guests = guests;
  table.reserved = true;
  render();
  setFeedback(`Table ${tableNumber} reserved successfully for ${customerName}.`, "success");
}

function cancelReservation(tableNumber) {
  const table = tables.find((item) => item.tableNumber === tableNumber);
  if (!table || !table.reserved) return;

  table.reserved = false;
  table.customerName = "";
  table.guests = 0;
  render();
  setFeedback(`Reservation for table ${tableNumber} cancelled. The table is available again.`, "success");
}

form.addEventListener("submit", reserveTable);
bookingList.addEventListener("click", (event) => {
  const cancelButton = event.target.closest("[data-cancel]");
  if (cancelButton) cancelReservation(cancelButton.dataset.cancel);
});

render();
