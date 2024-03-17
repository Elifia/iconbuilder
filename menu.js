function initMenu() {
	const menuButtons = document.getElementsByClassName("menu-button");
	for (button of menuButtons) {
		button.addEventListener("click", (event) => {
			const dropdown = event.target.parentElement.querySelector(".dropdown");
			dropdown.setAttribute("visible", dropdown.getAttribute("visible") === "false" ? "true" : "false");
		});
	}

	document.addEventListener("click", (event) => {
		const dropdowns = document.getElementsByClassName("dropdown");
		const popups = document.getElementsByClassName("popup");
		for (element of [...dropdowns, ...popups]) {
			if (!element.parentElement.contains(event.target) && element.getAttribute("visible") !== "false") {
				element.setAttribute("visible", "false");
				element.dispatchEvent(new Event("close"));
			}
		}
	});

	document.getElementById("delete").addEventListener("click", () => {
		document.getElementById("delete-popup").setAttribute("visible", "true");
	});

	document.getElementById("delete-confirm").addEventListener("click", () => {
		document.getElementById("delete-popup").setAttribute("visible", "false");
		characters.splice(currentCharacter, 1);
		if (characters.length === 0) {
			characters.push(getDefaultCharacter());
		}
		currentCharacter = 0;
		update(true);
	});

	const cancelButtons = document.getElementsByClassName("cancel");
	for (button of cancelButtons) {
		button.addEventListener("click", (event) => {
			event.target.closest(".popup").setAttribute("visible", "false");
		});
	}
}

function renderMenu() {
	const container = document.getElementById("menu");
	container.innerHTML = null;

	container.append(renderNewCharacter());
	container.append(renderImport());
	container.append(renderExport());
}

function renderCharacterList() {
	const container = document.getElementById("character-list");
	container.innerHTML = null;
	for (const [index, character] of characters.entries()) {
		const button = document.createElement("button");
		button.innerHTML = character.name;
		button.addEventListener("click", () => {
			currentCharacter = index;
			update(true);
			container.setAttribute("visible", "false");
		});

		container.append(button);
	}
}

function renderNewCharacter() {
	const button = document.createElement("button");
	button.innerHTML = "New Character";
	button.addEventListener("click", () => {
		characters.push({
			name: "Icon",
		});
		currentCharacter = characters.length - 1;
		update(true);
	});

	return button;
}

function renderImport() {
	const button = document.createElement("button");
	button.innerHTML = "Import";
	button.addEventListener("click", () => {
		upload((content) => {
			try {
				const character = JSON.parse(content);
				characters.push(character);
				currentCharacter = characters.length - 1;
				update(true);
			} catch {
				alert("Invalid file");
			}
		}, "text", ".iconchar");
	});

	return button;
}

function renderExport() {
	const button = document.createElement("button");
	button.innerHTML = "Export";
	button.addEventListener("click", () => {
		const character = getCharacter();
		const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(character));
	    const download = document.createElement("a");
	    download.setAttribute("href", data);
	    download.setAttribute("download", character.name + ".iconchar");
	    document.body.appendChild(download);
	    download.click();
	    download.remove();
	});

	return button;
}