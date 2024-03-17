function renderBondAdvancement() {
	const character = getCharacter();
	character.bond ??= {};

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; flex-grow: 1; gap: 10px;";

	for (level = 0; level <= 12; level++) {
		if (!character.bond?.[0]?.bond && level !== 0) {
			break;
		}
		character.bond[level] ??= {};

		const levelContainer = document.createElement("div");
		levelContainer.style = "display: flex; align-items: center; gap: 20px; width: 100%; padding: 10px 20px; border: 1px solid #666;";

		const levelBox = document.createElement("div");
		levelBox.style.width = "30px";
		levelBox.innerHTML = level + ":";

		const upgradesBox = renderBondLevel(level);
		upgradesBox.style = "display: flex; justify-content: center; align-items: center; gap: 20px; flex-grow: 1;";

		levelContainer.append(levelBox, upgradesBox);

		container.append(levelContainer);
	}

	return container;
}

function renderBondLevel(level) {
	switch (BONDUPGRADES[level]) {
		case "initial": return renderBondInitial();
		case "power": return renderBondUpgradePower(level);
		case "action": return renderBondUpgradeAction(level);
		case "both": return renderBondUpgradeBoth(level);
		case "either": return renderBondUpgradeEither(level);
		default: return document.createElement("div");
	}
}

function renderBondInitial() {
	const container = document.createElement("div");

	container.append(
		renderBondSelect(), 
		renderBondActionSelect(),
		renderBondPowerSelect(0),
		renderBondActionDots(0, 4, true),
	);

	return container;
}

function renderBondUpgradePower(level) {
	const character = getCharacter();

	if (!character.bond[0].bond) {
		return document.createElement("div");
	}

	const container = document.createElement("div");

	container.append(
		renderBondPowerSelect(level),
	);

	return container;
}

function renderBondUpgradeAction(level) {
	const character = getCharacter();

	if (!character.bond[0].bond) {
		return document.createElement("div");
	}

	const container = document.createElement("div");

	container.append(
		renderBondActionDots(level, 1),
	);

	return container;
}

function renderBondUpgradeBoth(level) {
	const character = getCharacter();

	if (!character.bond[0].bond) {
		return document.createElement("div");
	}

	const container = document.createElement("div");

	container.append(
		renderBondPowerSelect(level),
		renderBondActionDots(level, 1),
	);

	return container;
}

function renderBondUpgradeEither(level) {
	const character = getCharacter();

	if (!character.bond[0].bond) {
		return document.createElement("div");
	}

	const container = document.createElement("div");

	container.append(
		"Choose:",
		renderBondPowerSelect(level),
		"or",
		renderBondActionDots(level, 2),
	);

	return container;
}

function renderBondSelect() {
	const character = getCharacter();
	const bond = character.bond[0].bond;

	return renderUpgradeButton(
		bond ? BONDS[bond].name : null,
		"Choose a bond",
		renderBondPopup(),
	);
}

function renderBondPopup() {
	const character = getCharacter();
	const values = character.bond[0];
	let chosenBond = null;

	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; justify-content: space-between;";

	const description = document.createElement("div");
	description.style = "width: 55%; padding-left: 20px;";

	const descriptionTitle = document.createElement("h2");
	descriptionTitle.innerHTML = BONDS[values.bond]?.name ?? "";

	const descriptionContent = document.createElement("div");
	descriptionContent.innerHTML = BONDS[values.bond]?.description ?? "";

	description.append(descriptionTitle, descriptionContent);

	const options = renderBondOptions(Object.keys(BONDS), values.bond, (key) => {
		const bond = BONDS[key];
		chosenBond = key;
		descriptionTitle.innerHTML = bond.name;
		descriptionContent.innerHTML = bond.description;
	});

	popupContent.append(options, description);

	const popup = renderPopup(popupContent, () => values.bond = chosenBond);
	popup.style = "width: 500px;";

	popup.addEventListener("close", () => {
		render();
	});

	return popup;
}

function renderBondOptions(keys, currentBond, callback, width = "45%") {
	const options = document.createElement("div");
	options.style = `display: flex; flex-direction: column; gap: 5px; width: ${width};`;

	for (const key of keys) {
		const bond = BONDS[key];

		const button = document.createElement("button");
		button.innerHTML = bond.name;

		if (key === currentBond) {
			button.className = "active";
		}

		button.addEventListener("click", () => {
			for (active of options.getElementsByClassName("active")) {
				active.className = "";
			}
			button.className = "active";
			callback(key);
		});

		options.append(button);
	}

	return options;
}

function renderBondActionSelect() {
	const character = getCharacter();
	const bond = character.bond[0].bond;

	if (!bond) {
		return "";
	}

	const action = character.bond[0].action;

	return renderUpgradeButton(
		action,
		"Choose an action",
		renderBondActionPopup(),
	);
}

function renderBondActionPopup() {
	const character = getCharacter();
	const values = character.bond[0];
	let chosenAction = null;

	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; gap: 10px;";

	for (const action of BONDS[values.bond].actions) {
		const button = document.createElement("button");
		button.innerHTML = action;
		
		if (action === values.action) {
			button.className = "active";
		}

		button.addEventListener("click", () => {
			for (active of popupContent.getElementsByClassName("active")) {
				active.className = "";
			}
			button.className = "active";
			chosenAction = action;
		});

		popupContent.append(button);
	}

	return renderPopup(popupContent, () => values.action = chosenAction);
}

function renderBondPowerSelect(level) {
	const character = getCharacter();
	const bond = character.bond[0].bond;

	if (!bond) {
		return "";
	}

	const power = character.bond[level].power;
	const button = renderUpgradeButton(
		power,
		"Choose a power",
		renderBondPowerPopup(level),
	);

	if (power !== BONDS[bond].gambit) {
		return button;
	}

	const container = document.createElement("div");
	container.style = "display: flex; gap: 10px;";

	const gambit = character.gambit;

	container.append(
		button, 
		renderUpgradeButton(
			gambit,
			"Choose a gambit",
			renderBondGambitPopup(),
		)
	);

	return container;
}

function renderBondPowerPopup(level) {
	const character = getCharacter();
	const bond = character.bond[0].bond;
	const values = character.bond[level];
	const stats = getBondStats(level - 1);

	const availablePowers = Object.keys(BONDS[bond].powers)
		.filter(power => !stats.powers.includes(power))
		.reduce((obj, power) => {
			return {
				...obj,
				[power]: BONDS[bond].powers[power]
			};
		}, {});

	if (level >= 4 && !stats.powers.includes(BONDS[bond].gambit)) {
		availablePowers[BONDS[bond].gambit] = "Take a power from another Bond";
	}

	let chosenPower = values.power ?? "";

	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; justify-content: space-between;";

	const description = document.createElement("div");
	description.style = "width: 65%; padding-left: 20px;";

	const descriptionTitle = document.createElement("h2");
	descriptionTitle.innerHTML = chosenPower;

	const descriptionContent = document.createElement("div");
	descriptionContent.innerHTML = availablePowers[chosenPower] ?? "";

	description.append(descriptionTitle, descriptionContent);

	const powerOptions = document.createElement("div");
	powerOptions.style = "display: flex; flex-direction: column; gap: 5px; width: 35%;";

	const options = getBondPowerOptions(availablePowers, values.power, (name, description) => {
		chosenPower = name;
		descriptionTitle.innerHTML = name;
		descriptionContent.innerHTML = description;
	});

	powerOptions.append(...options);

	popupContent.append(powerOptions, description);

	const popup = renderPopup(popupContent, () => {
		if (!chosenPower) {
			return false;
		}

		if (BONDUPGRADES[level] === "either") {
			character.bond[level] = {
				power: chosenPower,
			}

			return;
		}

		values.power = chosenPower;
	});
	popup.style = "width: 600px;";

	return popup;
}

function getBondPowerOptions(availablePowers, currentPower, callback) {
	const options = [];

	for (const [name, description] of Object.entries(availablePowers)) {
		const button = document.createElement("button");
		button.innerHTML = name;

		if (name === currentPower) {
			button.className = "active";
		}

		button.addEventListener("click", () => {
			for (const active of button.parentElement.getElementsByClassName("active")) {
				active.className = "";
			}
			button.className = "active";
			callback(name, description);
		});

		options.push(button);
	}

	return options;
}

function renderBondGambitPopup() {
	const character = getCharacter();
	const bond = character.bond[0].bond;
	const values = character.bond[level];
	let chosenGambitBond = character.gambitBond ?? "";
	let chosenGambit = character.gambit ?? "";
	let availablePowers = chosenGambitBond ? BONDS[chosenGambitBond].powers : {};

	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; justify-content: space-between;";

	const description = document.createElement("div");
	description.style = "width: 45%";

	const descriptionTitle = document.createElement("h2");
	descriptionTitle.innerHTML = chosenGambit;

	const descriptionContent = document.createElement("div");
	descriptionContent.innerHTML = availablePowers[chosenGambit] ?? "";

	description.append(descriptionTitle, descriptionContent);

	const powerOptions = document.createElement("div");
	powerOptions.style = "display: flex; flex-direction: column; gap: 5px; width: 25%;";

	const powerCallback = (name, description) => {
		chosenGambit = name;
		descriptionTitle.innerHTML = name;
		descriptionContent.innerHTML = description;
	};

	const bondOptions = renderBondOptions(Object.keys(BONDS).filter((b) => b !== bond), chosenGambitBond, (key) => {
		if (chosenGambitBond === key) {
			return;
		}

		chosenGambitBond = key;
		chosenGambit = "";
		descriptionTitle.innerHTML = "";
		descriptionContent.innerHTML = "";
		availablePowers = BONDS[chosenGambitBond].powers;

		powerOptions.innerHTML = "";
		powerOptions.append(...getBondPowerOptions(availablePowers, chosenGambit, powerCallback));
	}, "25%");

	powerOptions.append(...getBondPowerOptions(availablePowers, chosenGambit, powerCallback));

	popupContent.append(
		bondOptions,
		powerOptions,
		description,
	);

	const popup = renderPopup(popupContent, () => {
		if (!chosenGambit) {
			return false;
		}

		character.gambitBond = chosenGambitBond;
		character.gambit = chosenGambit;
	});
	popup.style = "width: 600px;";

	return popup;
}

function renderBondActionDots(level, dotLimit, isInitial = false) {
	const character = getCharacter();
	const bond = character.bond[0].bond;

	if (!bond) {
		return "";
	}

	const dots = character.bond[level].dots;
	const label = `Actions (${dots?.length ?? 0}/${dotLimit})`;

	return renderUpgradeButton(
		dots?.length ? label : null,
		label,
		renderBondActionDotsPopup(level, dotLimit, isInitial),
	);
}

function renderBondActionDotsPopup(level, dotLimit, isInitial) {
	const character = getCharacter();
	const values = character.bond[level];
	let chosenDots = values.dots ?? [];
	const setChosenDots = (dots) => { chosenDots = dots; };

	const popupContent = document.createElement("div");
	popupContent.append(renderActionDotsSelector(level, dotLimit, isInitial, popupContent, chosenDots, setChosenDots));

	return renderPopup(popupContent, () => {
		if (BONDUPGRADES[level] === "either") {
			character.bond[level] = {
				dots: chosenDots,
			}

			return;
		}

		values.dots = chosenDots;
	});
}

function renderActionDotsSelector(level, dotLimit, isInitial, popupContent, chosenDots, setChosenDots) {
	const character = getCharacter();
	const oldRatings = isInitial ? {
		[character.bond[0].action]: 2,
	} : getBondStats(level - 1).actions;
	const newRatings = { ...oldRatings };
	for (const dot of chosenDots) {
		newRatings[dot] = (newRatings[dot] ?? 0) + 1;
	}
	const has4Rating = Object.values(newRatings).some((rating) => rating >= 4);

	const rerender = () => {
		setChosenDots(chosenDots);
		popupContent.innerHTML = "";
		popupContent.append(renderActionDotsSelector(level, dotLimit, isInitial, popupContent, chosenDots, setChosenDots));
	}

	const container = document.createElement("div");

	const remainingDotsContainer = document.createElement("div");
	remainingDotsContainer.style = "display: flex; align-items: center; gap: 20px; margin-bottom: 10px;"

	const remainingDots = document.createElement("div");
	remainingDots.innerHTML = `Remaining dots: ${dotLimit - chosenDots.length}`;

	const reset = document.createElement("button");
	reset.innerHTML = "Reset";
	reset.addEventListener("click", (e) => {
		e.stopPropagation();
		chosenDots = [];
		rerender();
	});

	remainingDotsContainer.append(remainingDots, reset);
	container.append(remainingDotsContainer);

	for (action of ACTIONS) {
		const currentAction = action;
		const oldRating = oldRatings[action] ?? 0;
		const newRating = newRatings[action] ?? 0;
		const element = document.createElement("div");
		element.style = "display: flex; align-items: center; margin-bottom: 10px;";

		const name = document.createElement("div");
		name.style = "width: 100px; margin-top: 1px;";
		name.innerHTML = currentAction + ":";

		const dots = document.createElement("div");
		dots.style = "display: flex; gap: 10px;";
		const dotsList = [];

		const maxRating = ((isInitial || has4Rating) && newRating < 4) ? 3 : 4;
		for (let i = 1; i <= maxRating; i++) {
			const index = i;
			const dot = document.createElement("div");
			dot.style = "width: 1em; height: 1em; border-radius: 100%; border: 1px solid currentColor;";

			if (index <= oldRating) {
				dot.style.background = "#999";
			} else if (index <= newRating) {
				dot.style.background = "currentColor";
			} else if (isInitial || index === oldRating + 1) {
				dot.addEventListener("mouseenter", () => {
					if ((dotLimit - chosenDots.length) >= (index - newRating)) {
						dot.style.cursor = "pointer";
						for (j = newRating; j < index; j++) {
							dotsList[j].style.background = "currentColor";
						}
					}
				});

				dot.addEventListener("mouseleave", () => {
					dot.style.cursor = null;
					for (j = newRating; j < index; j++) {
						dotsList[j].style.background = null;
					}
				});

				dot.addEventListener("click", (e) => {
					if ((dotLimit - chosenDots.length) >= (index - newRating)) {
						e.stopPropagation();
						for (j = newRating; j < index; j++) {
							dotsList[j].style.background = "#999";
							chosenDots.push(currentAction);
						}

						rerender();
					}
				});
			}

			dotsList.push(dot);
		}

		dots.append(...dotsList);
		element.append(name, dots);
		container.append(element);
	}

	return container;
}