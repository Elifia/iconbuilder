function renderBond() {
	const character = getCharacter();

	const container = document.createElement("div");

	if (!character.bond?.[0]?.bond) {
		container.style.marginTop = "20px";
		container.innerHTML = "No bond has been chosen yet. Choose a bond in the bond advancement tab."
		
		return container;
	}

	const subContainer = document.createElement("div");
	subContainer.style = "display: flex; justify-content: space-between;";

	const bond = BONDS[character.bond[0].bond];

	const title = document.createElement("h2");
	title.innerHTML = bond.name;

	const leftContainer = document.createElement("div");
	leftContainer.style = "width: 45%";

	const rightContainer = document.createElement("div");
	rightContainer.style = "width: 45%";

	leftContainer.append(
		renderBondDescription(),
		renderBondAbilities(),
		renderBondPowers(),
	);

	rightContainer.append(
		renderEffortStrain(),
		renderBondActions(),
		renderBurdens(),
	);

	subContainer.append(leftContainer, rightContainer);
	container.append(title, subContainer);

	return container;
}

function renderBondDescription() {
	const character = getCharacter();
	const bond = BONDS[character.bond[0].bond];

	const container = document.createElement("div");
	container.style = "margin-bottom: 30px;";

	const description = document.createElement("p");
	description.style = "margin-top: 9px;"
	description.innerHTML = bond.description;

	const idealsTitle = document.createElement("h3");
	idealsTitle.innerHTML = "Ideals";

	const ideals = document.createElement("ul");

	for (const ideal of bond.ideals) {
		const item = document.createElement("li");
		item.innerHTML = ideal;
		ideals.append(item);
	}

	container.append(description, idealsTitle, ideals);

	return container;
}

function renderBondAbilities() {
	const character = getCharacter();
	const bond = BONDS[character.bond[0].bond];

	const container = document.createElement("div");
	container.style = "margin-bottom: 10px;";

	const secondWindTitle = document.createElement("h3");
	secondWindTitle.innerHTML = "Second Wind";

	const secondWindDescription = document.createElement("div");
	secondWindDescription.innerHTML = bond.secondWind;

	const specialTitle = document.createElement("h3");
	specialTitle.innerHTML = "Special Ability";

	const specialDescription = document.createElement("div");
	specialDescription.innerHTML = bond.special;

	container.append(
		secondWindTitle,
		secondWindDescription,
		specialTitle,
		specialDescription,
	);

	return container;
}

function renderBondPowers() {
	const character = getCharacter();
	const bond = BONDS[character.bond[0].bond];
	const stats = getBondStats();

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px;";

	const title = document.createElement("h3");
	title.innerHTML = "Powers";

	container.append(title);

	for (const power of stats.powers) {
		const isGambit = power === bond.gambit;
		if (isGambit && !character.gambit) {
			continue;
		}
		
		const element = document.createElement("div");

		const button = document.createElement("button");
		button.style = "width: 100%";
		button.innerHTML = isGambit ? `${power}: ${character.gambit}` : power;

		const popupContent = document.createElement("div");
		popupContent.innerHTML = isGambit ? BONDS[character.gambitBond].powers[character.gambit] : bond.powers[power];
		const popup = renderPopup(popupContent);

		button.addEventListener("click", () => {
			popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
		});

		element.append(button, popup);
		container.append(element);
	}

	return container;
}

function renderEffortStrain() {
	const character = getCharacter();
	const bond = BONDS[character.bond[0].bond];

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px;";

	container.append(
		renderEffortStrainInput("effort", "Effort", bond.effort),
		renderEffortStrainInput("strain", "Strain", bond.strain),
	);

	return container;
}

function renderEffortStrainInput(key, text, max) {
	const character = getCharacter();

	const container = document.createElement("div");
	container.style = "display: flex; align-items: center; gap: 10px;";

	const label = document.createElement("div");
	label.style = "width: 60px;";
	label.innerHTML = text + ":";

	const input = document.createElement("input");
	input.name = key;
	input.style = "width: 60px; padding-right: 10px;";
	input.type = "number";
	input.max = max;
	input.setAttribute("value", character[key] ?? 0);
	input.addEventListener("change", (event) => {
		character[key] = event.target.value;
		update();
	});
	input.addEventListener("focus", () => input.select());

	const maxLabel = document.createElement("div");
	maxLabel.innerHTML = "/ " + max;

	container.append(
		label,
		input,
		maxLabel,
	);

	return container;
}

function renderBondActions() {
	const character = getCharacter();
	const bond = BONDS[character.bond[0].bond];
	const burdenActions = character.burdens?.flatMap((burden) => burden.actions) ?? [];

	const container = document.createElement("div");
	container.style = "margin-bottom: 30px;";

	const title = document.createElement("h3");
	title.innerHTML = "Actions";

	container.append(title);

	for (const action of ACTIONS) {
		const rating = getBondStats().actions[action] ?? 0;
		const burdenRating = burdenActions.filter((burden) => burden === action).length;

		const element = document.createElement("div");
		element.style = "display: flex; align-items: center; margin-bottom: 10px;";

		const name = document.createElement("div");
		name.style = "width: 100px; margin-top: 1px;";
		name.innerHTML = action + ":";

		const dice = document.createElement("div");
		dice.style = "display: flex;";
		for (let i = 1; i <= rating; i++) {
			const die = document.createElement("span");
			die.style = "text-align: center; width: 30px";

			if (rating - i >= burdenRating) {
				die.style.fontSize = "2em";
				die.style.lineHeight = "0.5";
				die.innerHTML = "⚅"
			} else {
				die.style.color = "red";
				die.innerHTML = "X"
			}

			dice.append(die);
		}

		element.append(name, dice);
		container.append(element);
	}

	return container;
}

function renderBurdens() {
	const character = getCharacter();

	if (!character.burdens) {
		character.burdens = [];
	}

	const container = document.createElement("div");

	const title = document.createElement("h3");
	title.innerHTML = "Burdens";

	container.append(title);

	for (const burden of character.burdens) {
		container.append(renderClock(burden, "burdens"));
	}

	if (character.burdens.length < 3) {
		const addContainer = document.createElement("span");

		const button = document.createElement("button");
		button.innerHTML = "Add Burden";

		const popup = renderClockPopup((values) => {
			const includeActions = !(character.bond[0].bond === "wolf" && values.length == 4);
			if (!values.name || (values.actions.length < 2 && includeActions) || !values.length) {
				return false;
			}

			character.burdens.push({
				name: values.name,
				actions: includeActions ? values.actions : [],
				value: values.length,
				max: values.length,
			});
		}, "burdens", "Burden", true);

		button.addEventListener("click", () => {
			popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
		});

		addContainer.append(button, popup);
		container.append(addContainer);
	}

	return container;
}

function getBondStats(level = null) {
	const character = getCharacter();

	if (!character.bond) {
		return null;
	}

	if (level === null) {
		level = character.level ?? 0;
	}

	let actions = {};
	let powers = [];
	for (let i = 0; i <= level; i++) {
		const upgrades = character.bond[i];

		if (!upgrades) {
			continue;
		}

		if (upgrades.action) {
			actions[upgrades.action] = (actions[upgrades.action] ?? 0) + 2;
		}

		if (upgrades.power) {
			powers.push(upgrades.power);
		}

		if (upgrades.dots) {
			for (const dot of upgrades.dots) {
				actions[dot] = (actions[dot] ?? 0) + 1;
			}
		}
	}

	for (const bonus of character.actionBonuses ?? []) {
		actions[bonus.action] = (actions[bonus.action] ?? 0) + 1;
	}

	return { actions, powers };
}

function validateBond() {
	const character = getCharacter();

	if (!character.bond) {
		return;
	}

	const bond = BONDS[character.bond[0].bond];

	for (const [level, upgrades] of Object.entries(character.bond)) {
		const previousStats = getBondStats(level - 1);
		const currentStats = getBondStats(level);

		if (upgrades.action && !bond.actions.includes(upgrades.action)) {
			delete upgrades.action;
		}

		if (upgrades.power && (
			previousStats.powers.includes(upgrades.power) ||
			!(Object.keys(bond.powers).includes(upgrades.power) || (level >= 4 && upgrades.power === bond.gambit))
		)) {
			delete upgrades.power;
		}

		if (upgrades.dots) {
			const dot4 = Object.values(currentStats.actions).filter((rating) => rating > 3);
			const dot5 = Object.values(currentStats.actions).filter((rating) => rating > 4);
			if (
				level == 0 && dot4.length > 0 || 
				level > 0 && (dot4.length > 1 || dot5 > 0)
			) {
				delete upgrades.dots;
			}
		}
	}

	if (character.kits) {
		const maxChosenKits = getMaxChosenKits();
		character.kits.splice(maxChosenKits);
		for (const [index, kit] of character.kits.entries()) {
			if ((kit !== "Custom" || getCustomKitSize() === 0) && !Object.keys(bond.gear).includes(kit)) {
				delete character.kits[index];
			}
		}
	}

	if (character.looseGear) {
		character.looseGear = character.looseGear.filter((item) => item);
	}
}