function renderGear() {
	const character = getCharacter();

	const container = document.createElement("div");

	if (!character.bond?.[0]?.bond) {
		container.style.marginTop = "20px";
		container.innerHTML = "No bond has been chosen yet. Choose a bond in the bond advancement tab."
		
		return container;
	}

	container.style = "display: flex; justify-content: space-between;";

	container.append(renderCurrentGear(), renderGearSelection());

	return container;
}

function renderCurrentGear() {
	const character = getCharacter();
	const bondName = character.bond[0].bond;
	const bond = BONDS[bondName];

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px; width: 47%;";

	const title = document.createElement("h3");
	title.style = "display: flex; justify-content: space-between; align-items: center; gap: 5px;";
	title.innerHTML = "Current Gear";

	const add = document.createElement("div");
	add.style = "margin-left: auto;";

	const addButton = document.createElement("button");
	addButton.innerHTML = "Add";

	const addInput = document.createElement("input");
	addInput.name = "add-gear";

	const addPopup = renderPopup(addInput, () => {
		if (!addInput.value) {
			return false;
		}

		character.gear.push(addInput.value);
		character.looseGear.push(addInput.value);
	});

	addButton.addEventListener("click", () => {
		addPopup.setAttribute("visible", addPopup.getAttribute("visible") === "false" ? "true" : "false");
		addPopup.querySelector("input").focus();
	});

	add.append(addButton, addPopup);

	const restockButton = document.createElement("button");
	restockButton.innerHTML = "Restock";
	restockButton.addEventListener("click", () => {
		const adventurersKits = Object.values(bond.adventurersKit ?? ADVENTURERSKIT);
		const chosenKits = Object.values(character.kits ?? []).map((kit) => kit === "Custom" ? character.customKit : bond.gear[kit]);
		const looseGear = character.currentLooseGear ?? [];

		character.gear = [];
		for (const kit of [...adventurersKits, ...chosenKits, looseGear]) {
			character.gear.push(...kit);
		}

		update();
		render();
	});

	title.append(add, restockButton);
	container.append(title);

	for (const [index, gear] of character.gear?.entries() ?? []) {
		const item = document.createElement("div");
		item.style = "display: flex; justify-content: space-between; border: 1px solid #666;";

		const name = document.createElement("div");
		name.style = "padding: 10px 20px;";
		name.innerHTML = gear;

		const removeButton = document.createElement("button");
		removeButton.innerHTML = "🗑️";

		removeButton.addEventListener("click", () => {
			character.gear.splice(index, 1);
			update();
			render();
		});

		item.append(name, removeButton);

		container.append(item);
	}

	return container;
}

function renderGearSelection() {
	const character = getCharacter();
	const bondName = character.bond[0].bond;
	const bond = BONDS[bondName];
	const maxChosenKits = getMaxChosenKits();

	for (const prop of ["kits", "customKit", "looseGear", "currentLooseGear"]) {
		if (!character[prop]) {
			character[prop] = [];
		}
	}

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px; width: 47%;";

	const title = document.createElement("h3");
	title.style = "display: flex; justify-content: space-between; align-items: center; height: 38px;";
	title.innerHTML = "Kits";

	container.append(title);

	for (const [kit, gear] of Object.entries(bond.adventurersKit ?? ADVENTURERSKIT)) {
		const item = document.createElement("div");
		item.style = "padding: 1px 0;";

		const button = document.createElement("button");
		button.style = "width: 100%;";
		button.innerHTML = `${kit} Kit`;

		const popupContent = document.createElement("div");
		popupContent.style = "display: grid; grid-template-columns: auto auto; gap: 10px 50px; padding: 10px;";
		popupContent.innerHTML = "<span>" + gear.join("</span><span>") + "</span>";
		const popup = renderPopup(popupContent);

		button.addEventListener("click", () => {
			popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
		});

		item.append(button, popup);
		container.append(item);
	}

	for (let i = 0; i < maxChosenKits; i++) {
		const index = i;
		const item = document.createElement("div");
		item.style = "padding: 1px 0;";

		const button = document.createElement("button");
		button.style = "width: 100%;";
		button.innerHTML = character.kits[index] ? `${character.kits[index]} Kit` : "Choose a kit";

		if (!character.kits[index]) {
			button.style.color = "#999";
		}

		const popup = renderChooseKit(index);

		button.addEventListener("click", () => {
			popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
		});

		item.append(button, popup);
		container.append(item);
	}

	if (maxCustom = getCustomKitSize()) {
		const customTitle = document.createElement("h3");
		customTitle.innerHTML = "Custom Kit";

		container.append(customTitle);

		for (let i = 0; i < maxCustom; i++) {
			const index = i;
			const item = document.createElement("div");
			item.style = "padding: 1px 0;";

			const button = document.createElement("button");
			button.style = "width: 100%;";
			button.innerHTML = character.customKit[index] ?? "Choose an item";

			if (!character.customKit[index]) {
				button.style.color = "#999";
			}

			const popup = renderChooseItem(
				index, 
				Object.values(bond.gear).flat(), 
				character.customKit[index],
				(chosenItem) => { character.customKit[index] = chosenItem; },
			);

			button.addEventListener("click", () => {
				popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
			});

			item.append(button, popup);
			container.append(item);
		}
	}

	const looseTitle = document.createElement("h3");
	looseTitle.innerHTML = "Carried Loose Gear";
	
	container.append(looseTitle);

	for (let i = 0; i < getLooseGearSize(); i++) {
		const index = i;
		const item = document.createElement("div");
		item.style = "padding: 1px 0;";

		const button = document.createElement("button");
		button.style = "width: 100%;";
		button.innerHTML = character.currentLooseGear[index] ?? "Choose an item";

		if (!character.currentLooseGear[index]) {
			button.style.color = "#999";
		}

		const popup = renderChooseItem(
			index, 
			character.looseGear.filter((item) => !character.currentLooseGear.includes(item) || item === character.currentLooseGear[index]), 
			character.currentLooseGear[index],
			(chosenItem) => { character.currentLooseGear[index] = chosenItem; },
		);

		button.addEventListener("click", () => {
			popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
		});

		item.append(button, popup);
		container.append(item);
	}

	const inventoryTitle = document.createElement("h3");
	inventoryTitle.style = "display: flex; justify-content: space-between; align-items: center; gap: 5px;";
	inventoryTitle.innerHTML = "Stored Loose Gear";

	const add = document.createElement("div");
	add.style = "margin-left: auto;";

	const addButton = document.createElement("button");
	addButton.innerHTML = "Add";

	const addInput = document.createElement("input");
	addInput.name = "add-gear";

	const addPopup = renderPopup(addInput, () => {
		if (!addInput.value) {
			return false;
		}
		
		character.looseGear.push(addInput.value);
	});

	addButton.addEventListener("click", () => {
		addPopup.setAttribute("visible", addPopup.getAttribute("visible") === "false" ? "true" : "false");
		addPopup.querySelector("input").focus();
	});

	add.append(addButton, addPopup);
	inventoryTitle.append(add);

	const inventory = document.createElement("div");

	const inventoryButton = document.createElement("button");
	inventoryButton.style = "width: 100%;";
	inventoryButton.innerHTML = "Inventory";

	const inventoryPopup = renderInventory();

	inventoryButton.addEventListener("click", () => {
		inventoryPopup.setAttribute("visible", inventoryPopup.getAttribute("visible") === "false" ? "true" : "false");
	});
	
	inventory.append(inventoryButton, inventoryPopup);
	container.append(inventoryTitle, inventory);

	return container;
}

function renderChooseKit(index) {
	const character = getCharacter();
	const bondName = character.bond[0].bond;
	const bond = BONDS[bondName];
	let chosenKit = character.kits[index] ?? "";

	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; justify-content: space-between;"

	const options = document.createElement("div");
	options.style = "display: flex; flex-direction: column; gap: 5px; width: 35%;";

	const gearList = document.createElement("div");
	gearList.style = "display: flex; flex-direction: column; gap: 10px; margin-top: 10px; width: 65%; padding-left: 20px;";
	gearList.innerHTML = bond.gear[chosenKit] ? "<span>" + bond.gear[chosenKit].join("</span><span>") + "</span>" : "";

	for (const [kit, gear] of Object.entries({ ...bond.gear, "Custom": character.customKit ?? [] })) {
		const button = document.createElement("button");
		button.innerHTML = `${kit} Kit`;

		if (chosenKit === kit) {
			button.className = "active";
		}

		button.addEventListener("click", () => {
			for (active of options.getElementsByClassName("active")) {
				active.className = "";
			}
			button.className = "active";

			chosenKit = kit;
			gearList.innerHTML = "<span>" + gear.join("</span><span>") + "</span>";
		});

		options.append(button);
	}

	popupContent.append(options, gearList);

	const popup = renderPopup(popupContent, () => {
		if (chosenKit === "Custom") {
			character.kits[0] = chosenKit;
			return;
		}

		character.kits[index] = chosenKit;
	});
	popup.style = "display: flex; flex-direction: column; justify-content: space-between; width: 500px; height: 350px;";

	return popup;
}

function renderChooseItem(index, gear, chosenItem, callback) {
	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; justify-content: space-between;"

	const options = document.createElement("div");
	options.style = "display: flex; flex-wrap: wrap; justify-content: center; gap: 5px;";

	for (const item of gear) {
		const button = document.createElement("button");
		button.innerHTML = item;

		if (chosenItem === item) {
			button.className = "active";
		}

		button.addEventListener("click", () => {
			for (active of options.getElementsByClassName("active")) {
				active.className = "";
			}
			button.className = "active";

			chosenItem = item;
		});

		options.append(button);
	}

	popupContent.append(options);

	const popup = renderPopup(popupContent, () => { callback(chosenItem); });

	return popup;
}

function renderInventory() {
	const character = getCharacter();

	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; flex-direction: column; gap: 5px; overflow: auto; height: 350px; margin-right: -20px; padding-right: 20px;"

	function callback() {
		popupContent.innerHTML = "";
		popupContent.append(...renderInventoryItems(callback));
	};

	callback();

	const popup = renderPopup(popupContent);

	return popup;
}

function renderInventoryItems(callback) {
	const character = getCharacter();
	const inventory = [];

	for (const [index, gear] of character.looseGear?.entries() ?? []) {
		const item = document.createElement("div");
		item.style = "display: flex; justify-content: space-between; border: 1px solid #666;";

		const name = document.createElement("div");
		name.style = "padding: 10px 20px; width: 300px;";
		name.innerHTML = gear;

		const removeButton = document.createElement("button");
		removeButton.innerHTML = "🗑️";

		removeButton.addEventListener("click", (e) => {
			e.stopPropagation();
			character.looseGear.splice(index, 1);
			update();
			callback();
		});

		item.append(name, removeButton);

		inventory.push(item);
	}

	return inventory;
}

function getMaxChosenKits() {
	const character = getCharacter();
	const bondName = character.bond[0].bond;

	switch (bondName) {
		case "outsider": return 0;
		case "highborn": return character.kits?.includes("Custom") ? 1 : 2;
		default: return 1;
	}
}

function getCustomKitSize() {
	const character = getCharacter();
	const bondName = character.bond[0].bond;

	switch (bondName) {
		case "outsider": return 0;
		case "highborn": return 5;
		default: return 3;
	}
}

function getLooseGearSize() {
	const character = getCharacter();
	const bondName = character.bond[0].bond;

	switch (bondName) {
		case "outsider": return 4;
		default: return 2;
	}
}