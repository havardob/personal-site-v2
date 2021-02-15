const html = document.querySelector("html");
const themeToggle = document.getElementById("themeToggle");
const themeOptions = document.getElementById("themeOptions");

themeToggle.addEventListener("click", function () {
	themeOptions.classList.toggle("is-open");
	themeToggle.classList.toggle("is-open");  
});

var themeButtons = document.getElementsByClassName("theme-picker");

for (var i = 0; i < themeButtons.length; i++) {
	themeButtons[i].onclick = changeTheme;
}

function changeTheme(clicked) {
	html.className = "";
	themeToggle.classList.remove('is-open');
	if (!html.classList.contains(this.id)) {
		html.classList.add(this.id);
		localStorage.setItem("theme", this.id);
	} else {
		html.classList.remove(this.id); 
	} 
}

function setStoredTheme() {
	var storedTheme = localStorage.getItem("theme");
	html.classList.add(storedTheme);
}

document.onload = setStoredTheme();