function getDefaultCharacter() {
	return {
		name: "Icon",
	}
}

function getCharacters() {
	try {
		return (JSON.parse(localStorage.getItem("characters")) ?? [getDefaultCharacter()]).filter((a) => a);
	} catch {
		return [getDefaultCharacter()];
	}
}

const characters = getCharacters();
let currentCharacter = localStorage.getItem("currentCharacter") ?? 0;
let currentTab = "basic";

function getCharacter() {
	return characters[currentCharacter];
}

function init() {
	initMenu();
	renderMenu();
	renderCharacterList();
	render();
}

function update(refresh = false) {
	validateBond();

	localStorage.setItem("characters", JSON.stringify(characters));
	localStorage.setItem("currentCharacter", currentCharacter);
	renderMenu();
	renderCharacterList();

	if (refresh) {
		currentTab = "basic";
		render();
	}
}

function render() {
	renderTabs();

	const page = document.getElementById("page");
	page.innerHTML = null;

	switch(currentTab) {
		case "basic":
			page.append(renderBasic());
			break;
		case "interlude":
			page.append(renderInterlude());
			break;
		case "bond":
			page.append(renderBond());
			break;
		case "gear":
			page.append(renderGear());
			break;
		case "job":
			page.append(renderJob());
			break;
		case "relics":
			page.append(renderRelics());
			break;
		case "bond-adv":
			page.append(renderBondAdvancement());
			break;
		case "job-adv":
			page.append(renderJobAdvancement());
			break;
	}
}

function renderTabs() {
	const container = document.getElementById("tabs");
	container.innerHTML = null;

	container.append(
		renderTab("basic", "Basic"),
		renderTab("interlude", "Interlude"),
		renderTab("bond", "Bond"),
		renderTab("gear", "Gear"),
		renderTab("job", "Job"),
		renderTab("relics", "Relics"),
		renderTab("bond-adv", "Bond Adv."),
		renderTab("job-adv", "Job Adv."),
	);
}

function renderTab(key, label) {
	const tab = document.createElement("button");
	tab.innerHTML = label;
	tab.addEventListener("click", () => {
		currentTab = key;
		render();
	});

	if (currentTab === key) {
		tab.className = "active";
	}

	return tab;
}

function upload(callback, type = "data", accept = null) {
	const input = document.createElement("input");
	input.type = "file";

	if (accept) {
		input.accept = accept;
	}

	input.addEventListener("change", (event) => {
		const file = event.target.files[0]; 
		const reader = new FileReader();
		
		reader.onload = (readerEvent) => {
			const content = readerEvent.target.result;

			if (!content) {
				alert("Invalid file");
				return;
			}

			callback(content);
		};

		switch (type) {
			case "text":
				reader.readAsText(file, "UTF-8");
				break;
			case "data":
				reader.readAsDataURL(file);
				break;
		}
	});

	input.click();
}

function renderPopup(content, callback = null) {
	const popup = document.createElement("div");
	popup.className = "popup";
	popup.setAttribute("visible", "false");
	popup.addEventListener("close", () => {
		render();
	});

	popup.append(
		content, 
		renderPopupButtons(callback)
	);

	return popup;
}

function renderPopupButtons(callback) {
	const container = document.createElement("div");
	container.className = "popup-buttons";

	const ok = document.createElement("button");
	ok.innerHTML = "Ok";

	if (callback) {
		ok.addEventListener("click", () => {
			if (callback() === false) {
				return;
			}

			update();
			render();
		});

		const cancel = document.createElement("button");
		cancel.innerHTML = "Cancel";
		cancel.addEventListener("click", () => {
			render();
		});

		container.append(ok, cancel);
	} else {
		ok.addEventListener("click", () => {
			render();
		});

		container.append(ok);
	}

	return container;
}

function renderUpgradeButton(label, labelFallback, popup, color = null) {
	const container = document.createElement("div");

	const button = document.createElement("button");
	button.innerHTML = label ?? labelFallback;

	if (color) {
		button.style.color = color;
	} else if (!label) {
		button.style.color = "#999";
	}

	button.addEventListener("click", () => {
		const wasVisible = popup.getAttribute("visible") !== "false";
		popup.setAttribute("visible", wasVisible ? "false" : "true");
		if (wasVisible) {
			popup.dispatchEvent(new Event("close"));
		}
	});

	container.append(button, popup);

	return container;
}

function renderClock(clock, key) {
	const character = getCharacter();

	const container = document.createElement("div");
	container.style = "padding: 10px 20px; border: 1px solid #666; margin-bottom: 10px;"

	const label = document.createElement("div");
	label.style = "margin-bottom: 10px";
	label.innerHTML = (clock.actions?.length ?? 0) > 0 ? `${clock.name} (${clock.actions.join(" & ")})` : clock.name;

	const inputContainer = document.createElement("div");
	inputContainer.style = "display: flex; align-items: center; gap: 10px;";

	const input = document.createElement("input");
	input.name = `${key}-${clock.max}`;
	input.style = "width: 70px; padding-right: 10px;";
	input.type = "number";
	input.max = clock.max;
	input.setAttribute("value", clock.value);
	input.addEventListener("change", (event) => {
		clock.value = event.target.value;
		update();
	});
	input.addEventListener("focus", () => input.select());

	const maxLabel = document.createElement("div");
	maxLabel.innerHTML = "/ " + clock.max;

	const removeButton = document.createElement("button");
	removeButton.style = "margin-left: auto;";
	removeButton.innerHTML = "🗑️";

	removeButton.addEventListener("click", () => {
		character[key] = character[key].filter((x) => x.max !== clock.max);
		update();
		render();
	});

	inputContainer.append(
		input,
		maxLabel,
		removeButton,
	);

	container.append(
		label,
		inputContainer,
	);

	return container;
}

function renderClockPopup(callback, key, label = "Clock", isBurden = false) {
	const character = getCharacter();
	const availableLengths = [4, 6, 10].filter((n) => !character[key].some((burden) => burden.max === n));
	let clockName = "";
	let chosenActions = [];
	let chosenLength = "";

	const popupContent = document.createElement("div");

	const labelStyle = "display: flex; flex-direction: column; line-height: 2; margin-bottom: 10px;";

	const nameLabel = document.createElement("div");
	nameLabel.style = labelStyle;
	nameLabel.innerHTML = `${label} Name`;

	const nameInput = document.createElement("input");
	nameInput.name = `${label}-name`;
	nameInput.addEventListener("change", (event) => {
		clockName = event.target.value;
	});

	nameLabel.append(nameInput);
	popupContent.append(nameLabel);

	if (isBurden) {
		const actions = getBondStats().actions;
		const burdenActions = character[key]?.flatMap((burden) => burden.actions) ?? [];
		const availableActions = [];
		for (const [action, rating] of Object.entries(actions)) {
			const burdenRating = burdenActions.filter((burden) => burden === action).length;
			if (burdenRating < 2 && burdenRating < rating) {
				availableActions.push(action);
			}
		}

		const actionsContainer = document.createElement("div");
		actionsContainer.style = labelStyle;
		actionsContainer.innerHTML = "Burdened Actions (pick 2)";

		const actionOptions = document.createElement("div");
		actionOptions.style = "display: flex; flex-wrap: wrap; gap: 10px;";

		for (const action of availableActions) {
			const button = document.createElement("button");
			button.innerHTML = action;

			button.addEventListener("click", () => {
				const active = chosenActions.includes(action);

				if (active) {
					chosenActions = chosenActions.filter((a) => a !== action);
					button.className = "";
				} else if (chosenActions.length < 2) {
					chosenActions.push(action);
					button.className = "active";
				}
			});

			actionOptions.append(button);
		}

		actionsContainer.append(actionOptions);	
		popupContent.append(actionsContainer);
	}

	const lengthLabel = document.createElement("div");
	lengthLabel.style = labelStyle;
	lengthLabel.innerHTML = `${label} Length`;

	const lengthContainer = document.createElement("div");
	lengthContainer.style = "display: flex; flex-wrap: wrap; gap: 10px;";

	for (const length of availableLengths) {
		const button = document.createElement("button");
		button.innerHTML = length;

		button.addEventListener("click", () => {
			for (const active of lengthContainer.getElementsByClassName("active")) {
				active.className = null;
			}

			button.className = "active";
			chosenLength = length;
		});

		lengthContainer.append(button);
	}

	lengthLabel.append(lengthContainer);
	popupContent.append(lengthLabel);

	return renderPopup(popupContent, () => {
		const values = {
			name: clockName,
			length: chosenLength,
		}

		if (isBurden) {
			values.actions = chosenActions;
		}

		callback(values);
	});
}