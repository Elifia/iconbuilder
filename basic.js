function renderBasic() {
	const character = getCharacter();
	if (!character.chapter) {
		character.chapter = 1;
	}

	const container = document.createElement("div");
	container.style = "display: flex; justify-content: space-between;";

	const infoContainer = document.createElement("div");
	infoContainer.style = "width: 45%";

	const levelInputs = document.createElement("div");
	levelInputs.style = "display: flex; gap: 5px;";

	levelInputs.append(
		renderNumberInput("chapter", "Chapter", 3, (value) => document.querySelector("input[name=level]").max = value * 4),
		renderNumberInput("level", "Level", character.chapter * 4),
		renderNumberInput("xp", "XP", 15),
	);

	infoContainer.append(
		renderInput("name", "Name"),
		renderInput("kin", "Kin"),
		renderInput("culture", "Culture"),
		renderBio(),
		levelInputs,
		renderNumberInput("dust", "Dust", 8),
	);

	const imageContainer = document.createElement("div");
	imageContainer.style = "width: 45%";
	imageContainer.append(renderImage());

	container.append(infoContainer, imageContainer);

	return container;
}

function renderInput(key, label) {
	const character = getCharacter();

	const element = document.createElement("label");
	element.innerHTML = label;

	const input = document.createElement("input");
	input.name = key;
	input.setAttribute("value", character[key] ?? "");
	input.addEventListener("change", (event) => {
		character[key] = event.target.value;
		update();
	});

	element.append(input);

	return element;
}

function renderNumberInput(key, label, max, callback = null) {
	const character = getCharacter();

	const element = document.createElement("label");
	element.innerHTML = label;

	const input = document.createElement("input");
	input.name = key;
	input.type = "number";
	input.min = 0;
	input.max = max;
	input.setAttribute("value", character[key] ?? 0);
	input.addEventListener("change", (event) => {
		const value = event.target.value
		if (value < 0) {
			character[key] = +character[key] + +value;
		} else {
			character[key] = +value;
		}

		update();

		if (callback) {
			callback(character[key]);
		}
	});
	input.addEventListener("focus", () => input.select());

	element.append(input);

	return element;
}

function renderBio() {
	const character = getCharacter();

	const element = document.createElement("label");
	element.style.width = "100%";
	element.innerHTML = "Biography";

	const input = document.createElement("textarea");
	input.name = "bio";
	input.style.height = "200px";
	input.innerHTML = character.bio ?? "";
	input.addEventListener("change", (event) => {
		character.bio = event.target.value;
		update();
	});

	element.append(input);
	return element;
}

function renderImage() {
	const character = getCharacter();

	const container = document.createElement("div");
	container.style = "padding-top: 125%; border: 2px solid #555; position: relative;";

	const image = document.createElement("div");
	image.style = "position: absolute; inset: 0; background: center / cover; cursor: pointer;";

	if (character.image) {
		image.style.backgroundImage = `url('${character.image}')`;
	} else {
		image.style.display = "flex";
		image.style.justifyContent = "center";
		image.style.alignItems = "center";
		image.innerHTML = "Upload Image";
	}

	image.addEventListener("click", () => {
		upload((content) => {
			character.image = content;
			update();
			render();
		}, "data", ".jpg, .png, .webp, .gif");
	});

	container.append(image);

	return container;
}