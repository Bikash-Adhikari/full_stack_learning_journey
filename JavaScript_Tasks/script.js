let modeBtn = document.querySelector("#mode");
let body = document.querySelector("body");
let currMod = "light";

modeBtn.addEventListener("click", () => {
    if (currMod === "light") {
        currMod = "dark";
        body.classList.add("dark");
        body.classList.remove("light")
    } else {
        currMod = "light";
        body.classList.add("light");
        body.classList.remove("dark");
    }

    console.log(currMod);
})



let para = document.querySelector(".para");
let icon = document.querySelector(".icon");

para.addEventListener("mouseover", () => {
    icon.classList.add("iconOpen")
    icon.classList.remove("icon")
})

para.addEventListener("mouseout", () => {
    icon.classList.remove("iconOpen")
})
