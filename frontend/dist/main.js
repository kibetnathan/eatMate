"use strict";
const userForm = document.getElementById("myForm");
const content = document.getElementById("content");
const formCard = document.getElementById("formCard");
const optOut = document.getElementById("optOut");
function onSubmit(event) {
    event.preventDefault();
    // grab DOM elements first and infer input element
    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let uname = document.getElementById("uname");
    let dobelement = document.getElementById("DoB");
    // Concatenate the value and infer it as type string
    let fullName = fname.value + " " + lname.value;
    let username = uname.value;
    let DoB = dobelement.value;
    const user_data = { fullName, username, DoB };
    localStorage.setItem("userData", JSON.stringify(user_data));
    location.reload();
}
userForm.addEventListener("submit", onSubmit);
const rawData = localStorage.getItem("userData");
const savedData = rawData ? JSON.parse(rawData) : null;
if (savedData) {
    formCard.classList.add("hidden");
    formCard.classList.remove("flex");
    content.classList.add("flex");
    content.classList.remove("hidden");
}
optOut.addEventListener("click", () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("foods");
    alert("Data has been cleared!");
    location.reload();
});
const foodString = localStorage.getItem("foods");
let foods = foodString ? JSON.parse(foodString) : [];
const addForm = document.getElementById("addFood");
function addFood(event) {
    event.preventDefault();
    // grab DOM elements first
    const foodNameElement = document.getElementById("newFood");
    const calCountElement = document.getElementById("newFoodCals");
    let foodName = foodNameElement.value.trim();
    let calCount = Number(calCountElement.value.trim());
    const newFood = { foodName, calCount };
    if (!foodName || !calCount)
        return;
    foods.push(newFood);
    localStorage.setItem("foods", JSON.stringify(foods));
    addForm.reset();
    renderFoods();
}
addForm.addEventListener("submit", addFood);
function renderFoods() {
    const container = document.getElementById("foodsContainer");
    const totalDisplay = document.getElementById("totalCals");
    container.innerHTML = "";
    let total = 0;
    if (foods.length === 0) {
        const empty = document.createElement("div");
        empty.className = "p-6 text-center font-bold opacity-70";
        empty.textContent = "No foods yet. Add one →";
        container.appendChild(empty);
    }
    foods.forEach(({ foodName, calCount }, index) => {
        const div = document.createElement("div");
        div.className = "food-row";
        const safeName = String(foodName).replace(/[<>&"']/g, (c) => ({
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#39;",
        })[c]);
        div.innerHTML = `
      <span class="font-semibold truncate pr-2">${safeName}</span>
      <span class="brut-chip">${calCount}</span>
      <button
        class="brut-btn brut-btn-danger text-sm px-3 py-1"
        data-index="${index}"
        aria-label="Delete ${safeName}"
      >Del</button>
    `;
        container.appendChild(div);
        total += Number(calCount);
    });
    totalDisplay.textContent = String(total);
    // attach delete listeners
    document.querySelectorAll("[data-index]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const target = e.target;
            const i = Number(target.dataset.index);
            foods.splice(i, 1); // remove 1 item at that index
            localStorage.setItem("foods", JSON.stringify(foods));
            renderFoods(); // re-render
        });
    });
}
window.addEventListener("DOMContentLoaded", renderFoods);
