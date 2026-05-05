const userForm = document.getElementById("myForm") as HTMLFormElement;
const content = document.getElementById("content") as HTMLElement;
const formCard = document.getElementById("formCard") as HTMLElement;
const optOut = document.getElementById("optOut") as HTMLButtonElement;

function onSubmit(event: Event) {
  event.preventDefault();
  // grab DOM elements first and infer input element
  let fname = document.getElementById("fname") as HTMLInputElement;
  let lname = document.getElementById("lname") as HTMLInputElement;
  let uname = document.getElementById("uname") as HTMLInputElement;
  let dobelement = document.getElementById("DoB") as HTMLInputElement;
  // Concatenate the value and infer it as type string
  let fullName: string = fname.value + " " + lname.value;
  let username: string = uname.value;
  let DoB = dobelement.value;

  const user_data = { fullName, username, DoB };
  localStorage.setItem("userData", JSON.stringify(user_data));
  location.reload();
}

userForm.addEventListener("submit", onSubmit);
// TODO Encapsulate login validation and dom display data
interface UserData {
  fullName: string;
  username: string;
  DoB: string;
}

const rawData = localStorage.getItem("userData");

const savedData = rawData ? (JSON.parse(rawData) as UserData) : null;

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
interface FoodItem {
  foodName: string;
  calCount: number;
}
const foodString = localStorage.getItem("foods");
let foods: FoodItem[] = foodString ? JSON.parse(foodString) : [];
const addForm = document.getElementById("addFood") as HTMLFormElement;
function addFood(event: Event) {
  event.preventDefault();
  // grab DOM elements first
  const foodNameElement = document.getElementById(
    "newFood",
  ) as HTMLInputElement;
  const calCountElement = document.getElementById(
    "newFoodCals",
  ) as HTMLInputElement;

  let foodName = foodNameElement.value.trim();
  let calCount = Number(calCountElement.value.trim());
  const newFood = { foodName, calCount };
  if (!foodName || !calCount) return;

  foods.push(newFood);

  localStorage.setItem("foods", JSON.stringify(foods));
  addForm.reset();
  renderFoods();
}

addForm.addEventListener("submit", addFood);

function renderFoods() {
  const container = document.getElementById("foodsContainer") as HTMLElement;
  const totalDisplay = document.getElementById("totalCals") as HTMLElement;
  container.innerHTML = "";

  let total = 0;

  foods.forEach(({ foodName, calCount }, index) => {
    const div = document.createElement("div");
    div.className =
      "grid grid-cols-5 h-16 w-auto outline outline-1 items-center rounded-xl my-1";

    div.innerHTML = `
      <span class="col-span-3 m-1 border-r border-black pr-2">${foodName}</span>
      <span class="col-span-1 m-1 text-center">${calCount}</span>
      <button class="col-span-1 outline-2 hover:cursor-pointer rounded-md px-2 py-1 mx-2 " data-index="${index}">
        Del
      </button>
    `;

    container.appendChild(div);

    total += Number(calCount);
  });
  totalDisplay.textContent = String(total);
  // attach delete listeners
  document.querySelectorAll("[data-index]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const i = Number(target.dataset.index);
      foods.splice(i, 1); // remove 1 item at that index
      localStorage.setItem("foods", JSON.stringify(foods));
      renderFoods(); // re-render
    });
  });
}
window.addEventListener("DOMContentLoaded", renderFoods);
