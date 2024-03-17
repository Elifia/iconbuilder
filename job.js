function renderJob() {
	const stats = getJobStats();

	const container = document.createElement("div");

	if (!stats) {
		container.style.marginTop = "20px";
		container.innerHTML = "No job has been chosen yet. Choose a job in the job advancement tab."

		return container;
	}

	const title = document.createElement("h2");
	title.style.color = stats.color;
	title.innerHTML = stats.job;

	const subContainer1 = document.createElement("div");
	subContainer1.style = "display: flex; justify-content: space-between;";

	const leftContainer1 = document.createElement("div");
	leftContainer1.style = "width: 45%";

	const rightContainer1 = document.createElement("div");
	rightContainer1.style = "width: 45%";

	leftContainer1.append(
		renderStats(),
	);

	rightContainer1.append(
		renderHP(),
	);

	const subContainer2 = document.createElement("div");
	subContainer2.style = "display: flex; justify-content: space-between;";

	const leftContainer2 = document.createElement("div");
	leftContainer2.style = "width: 45%";

	const rightContainer2 = document.createElement("div");
	rightContainer2.style = "width: 45%";

	leftContainer2.append(
		renderTraits(),
	);

	rightContainer2.append(
		renderJobLimitBreak(),
		renderJobSpecialMechanics(),
		renderJobSummons(),
		renderJobAbilities(),
	);

	subContainer1.append(leftContainer1, rightContainer1);
	subContainer2.append(leftContainer2, rightContainer2);
	container.append(title, subContainer1, subContainer2);

	return container;
}

function renderStats() {
	const stats = getJobStats();

	const container = document.createElement("table");

	for (const [key, name] of Object.entries(STATS)) {
		const stat = document.createElement("tr");

		const label = document.createElement("td");
		label.style = "font-weight: bold; padding: 3px 10px 3px 0;"
		label.innerHTML = name + ":";

		const value = document.createElement("td");
		value.innerHTML = stats[key];

		stat.append(label, value);
		container.append(stat);
	}

	return container;
}

function renderTraits() {
	const character = getCharacter();
	const stats = getJobStats();

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 10px;";

	const title = document.createElement("h3");
	title.style = "margin-bottom: 0;";
	title.innerHTML = "Traits";

	container.append(title);

	for (const trait of stats.traits) {
		const element = document.createElement("div");

		const name = document.createElement("b");
		name.style = "margin-right: 5px;";
		name.innerHTML = trait.name + ":";

		const text = document.createElement("span");
		text.innerHTML = trait.description;

		element.append(name, text);

		if (trait.subAbility) {
			const subAbility = renderSubAbility(trait.subAbility, stats.color);
			subAbility.style.marginTop = "5px";
			element.append(subAbility);
		}

		container.append(element);
	}

	return container;
}

function renderHP() {
	const character = getCharacter();
	const stats = getJobStats();
	const hp = character.hp ?? stats.hp;
	const vigor = character.vigor ?? 0;
	const wounds = character.wounds ?? 0;

	const container = document.createElement("div");

	const bar = document.createElement("div");
	bar.style = "position: relative; height: 50px; width: 100%; border: 2px solid #666;";

	const hpBar = document.createElement("div");
	hpBar.style = "position: absolute; top: 0; bottom: 0; left: 0; background: #F77474; border-right: 2px solid #633; transition: width 1s;";

	const vigorBar = document.createElement("div");
	vigorBar.style = "position: absolute; top: 0; bottom: 0; left: 0; border-right: 2px solid white; transition: width 1s;";
	vigorBar.style.backgroundImage = "repeating-linear-gradient(45deg, white, cyan 5px, cyan 15px, white 20px)";
	vigorBar.style.backgroundSize = "28px 100%";
	vigorBar.style.animation = "2s vigor infinite linear";

	const woundsBar = document.createElement("div");
	woundsBar.style = "position: absolute; top: 0; bottom: 0; right: 0; border-left: 2px solid #666; transition: width 1s;";
	woundsBar.style.backgroundImage = "repeating-linear-gradient(-45deg, white, #444 2px, #444 18px, white 20px)";

	bar.append(hpBar, vigorBar, woundsBar);

	for (let i = 0; i <= 4; i++) {
		const interval = document.createElement("div");
		interval.style = "position: absolute; top: 0; bottom: 0; width: 4px; background: #666;"
		interval.style.left = `calc(${25 * i}% - 2px)`;

		bar.append(interval);
	}

	const inputs = document.createElement("div");
	inputs.style = "display: flex; gap: 5px;";

	const setHp = (value) => {
		hpBar.style.width = `${100 * value / stats.hp}%`;
	}

	const setVigor = (value) => {
		vigorBar.style.width = `${100 * value / stats.hp}%`;
	}

	const setWounds = (value) => {
		woundsBar.style.width = `${100 * value / 4}%`;

		const hpInput = inputs.querySelector("input[name=hp]");
		const maxHp = getMaxHp();
		hpInput.max = maxHp;

		if (character.hp > maxHp) {
			hpInput.value = maxHp;
			hpInput.dispatchEvent(new Event("change"));
		}
	}

	inputs.append(
		renderNumberInput("hp", "HP", getMaxHp(), setHp),
		renderNumberInput("vigor", "Vigor", stats.vit, setVigor),
		renderNumberInput("wounds", "Wounds", 4, setWounds),
	);

	setHp(hp);
	setVigor(vigor);
	setWounds(wounds);

	container.append(bar, inputs);

	return container;
}

function renderJobLimitBreak() {
	const stats = getJobStats();

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px;";

	const title = document.createElement("h3");
	title.innerHTML = "Limit Break";

	container.append(title);

	const element = document.createElement("div");

	const button = document.createElement("button");
	button.style = "width: 100%";
	button.style.color = stats.color;
	button.innerHTML = stats.limitBreak.name;

	const popupContent = document.createElement("div");
	popupContent.append(renderLimitBreakDescription());
	const popup = renderPopup(popupContent);

	button.addEventListener("click", () => {
		popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
	});

	element.append(button, popup);
	container.append(element);

	return container;
}

function renderLimitBreakDescription() {
	const character = getCharacter();
	const stats = getJobStats();

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px;";

	const title = document.createElement("h2");
	title.style.color = stats.color;
	title.style.marginBottom = 0;
	title.innerHTML = stats.limitBreak.name;

	const resolve = document.createElement("div");
	resolve.innerHTML = `${stats.limitBreak.resolve} Resolve`;

	const action = document.createElement("div");
	action.innerHTML = `${stats.limitBreak.action.join(", ")}`;

	const tags = document.createElement("div");
	tags.style.marginBottom = "20px";
	tags.innerHTML = `${stats.limitBreak.tags.join(", ")}`;

	const description = document.createElement("div");
	description.style.fontStyle = "italic";
	description.innerHTML = stats.limitBreak.description;

	const effects = document.createElement("div");
	effects.style = "display: flex; flex-direction: column; gap: 5px;";

	for (const effect of stats.limitBreak.effects) {
		const element = document.createElement("div");
		element.innerHTML = effect.type ? `<b>${effect.type}:</b> ${effect.effect}` : effect.effect;

		effects.append(element);

		if (effect.subAbility) {
			effects.append(renderSubAbility(effect.subAbility, stats.color));
		}
	}

	container.append(
		title,
		resolve,
		action, 
		tags,
		description,
		effects,
	);

	if (character.chapter >= 3) {
		const ultimate = document.createElement("div");
		ultimate.innerHTML = `<h3>Ultimate: ${stats.limitBreak.ultimateName}</h3> ${stats.limitBreak.ultimateEffect}`;

		container.append(ultimate);
	}

	return container;
}

function renderJobSpecialMechanics() {
	const stats = getJobStats();

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px;";

	const title = document.createElement("h3");
	title.innerHTML = "Special Mechanics";

	container.append(title);

	for (const [className, special] of Object.entries(stats.specials)) {
		const element = document.createElement("div");

		const button = document.createElement("button");
		button.style = "width: 100%";
		button.style.color = CLASSES[className].color;
		button.innerHTML = special.name;

		const popupContent = document.createElement("div");

		const popupTitle = document.createElement("h2");
		popupTitle.style.color = CLASSES[className].color;
		popupTitle.innerHTML = special.name;

		const description = document.createElement("div");
		description.innerHTML = special.description;

		popupContent.append(popupTitle, description);
		const popup = renderPopup(popupContent);

		button.addEventListener("click", () => {
			popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
		});

		element.append(button, popup);
		container.append(element);
	}

	return container;
}

function renderJobSummons() {
	const stats = getJobStats();

	if (Object.keys(stats.summons).length === 0) {
		return "";
	}

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px;";

	const title = document.createElement("h3");
	title.innerHTML = "Summons";

	container.append(title);

	for (const [jobName, summons] of Object.entries(stats.summons)) {
		const className = JOBS[jobName].class;
		const element = document.createElement("div");

		const button = document.createElement("button");
		button.style = "width: 100%";
		button.style.color = CLASSES[className].color;
		button.innerHTML = jobName;

		const popupContent = document.createElement("div");
		popupContent.style = "display: flex; flex-direction: column; gap: 10px;";

		const popupTitle = document.createElement("h2");
		popupTitle.style.color = CLASSES[className].color;
		popupTitle.style.marginBottom = 0;
		popupTitle.innerHTML = `${jobName} Summons`;

		const description = document.createElement("div");
		description.innerHTML = summons.description;

		const summonDescriptions = summons.summons.map((summon) => renderSubAbility(summon, CLASSES[className].color));

		popupContent.append(popupTitle, description, ...summonDescriptions);
		const popup = renderPopup(popupContent);

		button.addEventListener("click", () => {
			popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
		});

		element.append(button, popup);
		container.append(element);
	}

	return container;
}

function renderJobAbilities() {
	const character = getCharacter();
	const stats = getJobStats();
	const abilities = character.abilities ?? [];

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px;";

	const title = document.createElement("h3");
	title.innerHTML = "Abilities";

	container.append(title);

	for (const ability of abilities) {
		const abilityFullName = getAbilityFullName(ability, stats.availableAbilities);
		const element = document.createElement("div");

		const button = document.createElement("button");
		button.style = "width: 100%";
		button.style.color = CLASSES[getAbilityJob(ability).class].color;
		button.innerHTML = abilityFullName;

		const popupContent = document.createElement("div");
		popupContent.append(renderAbilityDescription(abilityFullName));
		const popup = renderPopup(popupContent);

		button.addEventListener("click", () => {
			popup.setAttribute("visible", popup.getAttribute("visible") === "false" ? "true" : "false");
		});

		element.append(button, popup);
		container.append(element);
	}

	return container;
}

function getJobStats(level = null, filterTalents = true) {
	const character = getCharacter();

	if (!character.job?.[0]?.job) {
		return null;
	}

	if (level === null) {
		level = character.level ?? 0;
		if (character.xp >= 7) {
			level += 0.5;
		}
	}

	const jobName = character.primaryJob ?? character.job[0].job;
	const job = JOBS[jobName];
	const jobClass = CLASSES[job.class];

	const availableJobs = [];
	const availableAbilities = [];
	const masteredAbilities = [];
	const relics = [];
	for (let i = 0; i <= level; i += 0.5) {
		const upgrades = character.job[i];

		if (!upgrades) {
			continue;
		}

		if (upgrades.job && !availableJobs.includes(upgrades.job)) {
			availableJobs.push(upgrades.job);
		}

		if (upgrades.abilities) {
			availableAbilities.push(...upgrades.abilities);
		}

		if (upgrades.mastery) {
			masteredAbilities.push(upgrades.mastery);
		}

		if (upgrades.relic) {
			relics.push(upgrades.relic);
		}
	}

	if (filterTalents) {
		for (let i = availableAbilities.length - 1; i >= 0; i--) {
			if (availableAbilities.includes(availableAbilities[i] + " I") || availableAbilities.includes(availableAbilities[i] + " II")) {
				availableAbilities.splice(i, 1);
			}
		}
	}

	const abilityJobs = [jobName];
	const abilityClasses = [job.class];
	for (const ability of character.abilities ?? []) {
		const abilityJob = getAbilityJob(ability);

		if (!abilityJobs.includes(abilityJob.name)) {
			abilityJobs.push(abilityJob.name);
		}

		if (!abilityClasses.includes(abilityJob.class)) {
			abilityClasses.push(abilityJob.class);
		}
	}

	let traits = [
		...jobClass.traits,
		...job.traits,
	];

	if (character.chapter >= 3) {
		traits.push({
			name: job.ultimateTrait.name,
			description: job.ultimateTrait.effect,
		});
	}

	const specials = {
		[job.class]: jobClass.special
	};

	for (const ac of abilityClasses) {
		if (ac !== job.class) {
			traits.push(...CLASSES[ac].gambit.traits);

			const special = { ...CLASSES[ac].special };
			special.description = CLASSES[ac].gambit.description + "<br><br>" + special.description;

			specials[ac] = special;
		}
	}

	const summons = {};

	for (const aj of abilityJobs) {
		if (JOBS[aj].summons) {
			summons[aj] = JOBS[aj].summons;
		}
	}

	return {
		job: jobName,
		class: job.class,
		color: jobClass.color,
		...jobClass.stats,
		limitBreak: job.limitBreak,
		traits,
		specials,
		summons,
		availableJobs,
		availableAbilities,
		masteredAbilities,
		relics,
	};
}

function getMaxHp() {
	const character = getCharacter();
	const stats = getJobStats();

	return stats.hp - (character.wounds ?? 0) * stats.vit;
}

function getAbilityFullName(abilityName, availableAbilities) {
	return abilityName && availableAbilities ? availableAbilities.find((ability) => ability.startsWith(abilityName)) : null;
}