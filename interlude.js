function renderInterlude() {
	const container = document.createElement("div");
	const subContainer = document.createElement("div");
	subContainer.style = "display: flex; justify-content: space-between;";

	const title = document.createElement("h2");
	title.innerHTML = "Interlude";

	const leftContainer = document.createElement("div");
	leftContainer.style = "width: 45%";

	const rightContainer = document.createElement("div");
	rightContainer.style = "width: 45%";

	leftContainer.append(
		renderAmbitions(),
		renderActionBonuses(),
	);

	rightContainer.append(
		renderPrimaryJob(),
		renderCurrentAbilities(),
	);

	subContainer.append(leftContainer, rightContainer);
	container.append(title, subContainer);

	return container;
}

function renderAmbitions() {
	const character = getCharacter();

	if (!character.ambitions) {
		character.ambitions = [];
	}

	const container = document.createElement("div");

	const title = document.createElement("h3");
	title.innerHTML = "Ambitions";

	container.append(title);

	for (const ambition of character.ambitions) {
		container.append(renderClock(ambition, "ambitions"));
	}

	if (character.ambitions.length < 3) {
		const addContainer = document.createElement("span");

		const button = document.createElement("button");
		button.innerHTML = "Add Ambition";

		const popup = renderClockPopup((values) => {
			if (!values.name || !values.length) {
				return false;
			}

			character.ambitions.push({
				name: values.name,
				value: 0,
				max: values.length,
			});
		}, "ambitions", "Ambition");

		button.addEventListener("click", () => {
			popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
		});

		addContainer.append(button, popup);
		container.append(addContainer);
	}

	return container;
}

function renderActionBonuses() {
	const character = getCharacter();

	if (!character.actionBonuses) {
		character.actionBonuses = [];
	}

	const container = document.createElement("div");

	const title = document.createElement("h3");
	title.innerHTML = "Action Bonuses";

	container.append(title);

	for (const bonus of character.actionBonuses) {
		container.append(renderActionBonus(bonus));
	}

	const addContainer = document.createElement("span");

	const button = document.createElement("button");
	button.innerHTML = "Add Bonus";

	const popup = renderActionBonusPopup();

	button.addEventListener("click", () => {
		popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
	});

	addContainer.append(button, popup);
	container.append(addContainer);

	return container;
}

function renderActionBonus(bonus) {
	const container = document.createElement("div");
	container.style = "display: flex; align-items: center; gap: 10px; padding: 10px 20px; border: 1px solid #666; margin-bottom: 10px;"

	const label = document.createElement("div");
	label.innerHTML = `${bonus.name} (${bonus.action} +1)`;

	const removeButton = document.createElement("button");
	removeButton.style = "margin-left: auto;";
	removeButton.innerHTML = "🗑️";

	removeButton.addEventListener("click", () => {

		update();
		render();
	});

	container.append(
		label,
		removeButton,
	);

	return container;
}

function renderActionBonusPopup() {
	const character = getCharacter();
	const actions = getBondStats()?.actions ?? {};
	const has4Rating = Object.values(actions).some((rating) => rating >= 4);

	let chosenName = "";
	let chosenAction = "";

	const popupContent = document.createElement("div");

	const labelStyle = "display: flex; flex-direction: column; line-height: 2; margin-bottom: 10px;";

	const nameLabel = document.createElement("div");
	nameLabel.style = labelStyle;
	nameLabel.innerHTML = "Bonus Name";

	const nameInput = document.createElement("input");
	nameInput.name = "bonus-name";
	nameInput.addEventListener("change", (event) => {
		chosenName = event.target.value;
	});

	nameLabel.append(nameInput);
	popupContent.append(nameLabel);

	const actionLabel = document.createElement("div");
	actionLabel.style = labelStyle;
	actionLabel.innerHTML = "Action";

	const actionOptions = document.createElement("div");
	actionOptions.style = "display: flex; flex-wrap: wrap; gap: 10px;";

	const availableActions = ACTIONS.filter((action) => {
		return (actions[action] ?? 0) < (has4Rating ? 3 : 4);
	});

	for (const action of availableActions) {
		const button = document.createElement("button");
		button.innerHTML = `${action} (${actions[action] ?? 0})`;

		button.addEventListener("click", () => {
			for (active of actionOptions.getElementsByClassName("active")) {
				active.className = "";
			}
			button.className = "active";

			chosenAction = action;
		});

		actionOptions.append(button);
	}

	actionLabel.append(actionOptions);	
	popupContent.append(actionLabel);

	return renderPopup(popupContent, () => {
		if (!chosenName || !chosenAction) {
			return false;
		}

		character.actionBonuses.push({
			name: chosenName,
			action: chosenAction,
		});
	});
}

function renderPrimaryJob() {
	const character = getCharacter();
	const stats = getJobStats();

	if (!stats?.job) {
		return "";
	}

	const container = document.createElement("div");

	const title = document.createElement("h3");
	title.innerHTML = "Primary Job";

	button = renderUpgradeButton(
		stats.job,
		null,
		renderJobPopup(
			stats, 
			stats.availableJobs,
			(chosenJob) => {
				character.primaryJob = chosenJob;
				character.hp = getMaxHp();
			},
		),
		stats.color,
	);

	container.append(title, button);

	return container;
}

function renderCurrentAbilities() {
	const character = getCharacter();
	const stats = getJobStats();
	character.abilities ??= [];

	if (!stats?.job) {
		return "";
	}

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px;";

	const title = document.createElement("h3");
	title.innerHTML = "Current Abilities";

	container.append(title);

	for (let i = 0; i < 6; i++) {
		const index = i;
		const ability = getAbilityFullName(character.abilities?.[index], stats.availableAbilities);
		container.append(renderCurrentAbilitySelect(index, ability));
	}

	return container;
}

function renderCurrentAbilitySelect(index, chosenAbility) {
	const character = getCharacter();
	const stats = getJobStats();
	const job = getAbilityJob(chosenAbility);

	let abilities = stats.availableAbilities;
	const primaryClassAbilities = abilities.filter((ability) => {
		const job = getAbilityJob(ability);
		return job.class === stats.class;
	});

	const primaryLength = primaryClassAbilities.filter((ability) => ability !== chosenAbility).length;
	const currentLength = character.abilities.filter((ability) => ability !== chosenAbility).length;

	if (primaryLength <= currentLength / 2) {
		abilities = primaryClassAbilities;
	}

	abilities = abilities.filter((ability) => ability === chosenAbility || !character.abilities.includes(ability));

	const container = renderUpgradeButton(
		chosenAbility,
		"Choose an ability",
		renderAvailableAbilityPopup(chosenAbility, (ability) => character.abilities[index] = ability, abilities),
		job ? CLASSES[job.class].color : null,
	);

	container.style = "display: flex; flex-direction: column; width: 70%;";

	return container;
}