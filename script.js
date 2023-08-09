const getSchemeBtn = document.querySelector("#get-scheme-btn");

getSchemeBtn.addEventListener("click", () => {
  const inputColor = document.querySelector("#input-color").value.slice(1);
  const selectedScheme = document
    .querySelector("#select-scheme")
    .value.toLowerCase();
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${inputColor}&format=json&mode=${selectedScheme}&count=5`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = data.colors
        .map(
          (color) => `
          <section>
           <div id="color" style="background-color: ${color.hex.value}"> 
             </div>
           <p id="name-color">${color.hex.value}</p>
      </section>`
        )
        .join("");

      document.querySelector("#color-scheme").innerHTML += html;
    });
});

/////////////////////___________________________________________
//::::::::::::::::::::alert
const confirmDisplay = document.querySelector("#confirm");
const confirmMessage = document.querySelector(".mesage");

document.body.addEventListener("click", function (event) {
  if (document.querySelector("#color-scheme").contains(event.target)) {
    let colorCopied = event.target.nextElementSibling.innerText;
    navigator.clipboard.writeText(colorCopied);
    confirmMessage.textContent = `Copied the color: ${colorCopied}`;
    confirmMessage.style.color = colorCopied;
    confirmDisplay.style.visibility = "visible";
    confirmDisplay.style.backgroundColor = colorCopied;
  }
});

//-__________________________________________
document.querySelector("#confirm-btn").addEventListener("click", () => {
  confirmDisplay.style.visibility = "hidden";
});

document.querySelector("#input-color").addEventListener("click", () => {
  document.querySelector("#color-scheme").innerHTML = "";
});
