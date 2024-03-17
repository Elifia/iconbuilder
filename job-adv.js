function renderJobAdvancement() {
	const character = getCharacter();
	character.job ??= {};

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; flex-grow: 1; gap: 10px;";

	for (level = 0; level <= 12.5; level += 0.5) {
		if (!character.job?.[0]?.job && level !== 0) {
			break;
		}

		if (level === 0.5) {
			continue;
		}

		character.job[level] ??= {};
	
		const levelContainer = document.createElement("div");
		levelContainer.style = "display: flex; align-items: center; gap: 20px; width: 100%; padding: 10px 20px; border: 1px solid #666;";

		const levelBox = document.createElement("div");
		levelBox.style.width = "30px";
		levelBox.innerHTML = level + ":";

		const upgradesBox = renderJobLevel(level);
		upgradesBox.style = "display: flex; justify-content: center; align-items: center; gap: 20px; flex-grow: 1;";

		levelContainer.append(levelBox, upgradesBox);

		container.append(levelContainer);
	}

	return container;
}

function renderJobLevel(level) {
	if (level % 1 === 0.5) {
		return renderJobUpgradeAP(level);
	}

	switch (JOBUPGRADES[level]) {
		case "limitBreak": return renderJobUpgradeLimitBreak(level);
		case "relic": return renderJobUpgradeRelic(level);
		case "mastery": return renderJobUpgradeMastery(level);
		case "job": return renderJobUpgradeJob(level);
		case "ap": return renderJobUpgradeAP(level);
		default: return document.createElement("div");
	}
}

function renderJobUpgradeJob(level) {
	const container = document.createElement("div");

	container.append(renderJobSelect(level));

	const character = getCharacter();
	const job = character.job[level].job;

	if (job) {
		const previousJobs = getJobStats(level - 1)?.availableJobs ?? [];

		if (previousJobs.includes(job)) {
			container.append(renderMasterySelect(level));
		} else {
			container.append(
				renderAbilitySelect(level, 0),
				renderAbilitySelect(level, 1),
			);
		}
	}

	return container;
}

function renderJobUpgradeLimitBreak(level) {
	const container = document.createElement("div");

	container.append(
		renderAbilitySelect(level, 0),
		renderAbilitySelect(level, 1),
	);

	return container;
}

function renderJobUpgradeRelic(level) {
	const container = document.createElement("div");

	container.append(renderRelicSelect(level));

	return container;
}

function renderJobUpgradeMastery(level) {
	const container = document.createElement("div");

	container.append(renderMasterySelect(level));

	return container;
}

function renderJobUpgradeAP(level) {
	const container = document.createElement("div");

	container.append(renderAbilitySelect(level, 0));

	return container;
}

function renderJobSelect(level) {
	const character = getCharacter();
	const job = character.job[level].job;

	return renderUpgradeButton(
		job,
		"Choose a job",
		renderJobPopup(
			character.job[level], 
			Object.keys(JOBS),
			(chosenJob) => {
				if (character.job[level].job !== chosenJob) {
					character.job[level] = { job: chosenJob };
					character.hp = getMaxHp();
				}
			},
		),
		job ? CLASSES[JOBS[job].class].color : null,
	);
}

function renderJobPopup(values, jobOptions, callback) {
	let chosenJob = null;

	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; justify-content: space-between;";

	const description = document.createElement("div");
	description.style = "width: 65%; padding-left: 20px;";

	const descriptionTitle = document.createElement("h2");
	descriptionTitle.style = "margin-bottom: 0;";
	descriptionTitle.innerHTML = values.job ?? "";

	const descriptionSubtitle = document.createElement("h3");
	descriptionSubtitle.style = "margin: 0.25em 0 1em;";
	descriptionSubtitle.innerHTML = JOBS[values.job]?.subtitle ?? "";

	const descriptionContent = document.createElement("div");
	descriptionContent.innerHTML = JOBS[values.job]?.description ?? "";

	description.append(descriptionTitle, descriptionSubtitle, descriptionContent);

	const options = renderJobOptions(jobOptions, values.job, (key) => {
		const job = JOBS[key];
		chosenJob = key;
		descriptionTitle.innerHTML = key;
		descriptionSubtitle.innerHTML = job.subtitle;
		descriptionContent.innerHTML = job.description;
	});

	popupContent.append(options, description);

	const popup = renderPopup(popupContent, () => callback(chosenJob));
	popup.style = "width: 600px;";

	popup.addEventListener("close", () => {
		render();
	});

	return popup;
}

function renderJobOptions(keys, currentJob, callback, width = "35%") {
	const options = document.createElement("div");
	options.style = `display: flex; flex-direction: column; gap: 5px; width: ${width};`;

	for (const key of keys) {
		const button = document.createElement("button");
		button.style.color = CLASSES[JOBS[key].class].color;
		button.innerHTML = key;

		if (key === currentJob) {
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

function renderRelicSelect(level) {
	const character = getCharacter();
	const relic = character.job[level].relic?.name;

	return renderUpgradeButton(
		relic ? `Relic: ${relic}` : null,
		"Choose a relic",
		renderRelicPopup(level, relic),
		relic ? CLASSES[RELICS[relic].class].color : null,
	);
}

function renderRelicPopup(level) {
	const character = getCharacter();
	let chosenRelic = character.job[level].relic?.name ?? "";
	const previousRelics = getJobStats().relics.map((relic) => relic.name).filter((relic) => relic !== chosenRelic);

	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; justify-content: space-between; height: 500px;";

	const description = document.createElement("div");
	description.style = "width: 65%; overflow: auto; margin-right: -20px; padding-right: 20px;";

	description.append(renderRelicDescription(chosenRelic));

	const options = document.createElement("div");
	options.style = "display: flex; flex-direction: column; gap: 5px; overflow: auto; padding-right: 10px; width: 35%;";

	for (const relicName of Object.keys(RELICS).filter((r) => !previousRelics.includes(r))) {
		const relic = RELICS[relicName];
		const button = document.createElement("button");
		button.style.color = CLASSES[relic.class].color;
		button.innerHTML = relicName;

		if (relicName === chosenRelic) {
			button.className = "active";
		}

		button.addEventListener("click", () => {
			for (active of options.getElementsByClassName("active")) {
				active.className = "";
			}
			button.className = "active";
			
			chosenRelic = relicName;
			description.innerHTML = "";
			description.append(renderRelicDescription(relicName));
		});

		options.append(button);
	}

	popupContent.append(options, description);

	const popup = renderPopup(popupContent, () => {
		if (!chosenRelic) {
			return false;
		}

		if (character.job[level].relic?.name !== chosenRelic) {
			character.job[level].relic = {
				name: chosenRelic,
			};
		}
	});
	popup.style = "width: 600px;";

	return popup;
}

function renderAbilitySelect(level, index) {
	const character = getCharacter();
	const ability = character.job[level].abilities?.[index];
	const job = getAbilityJob(ability);

	return renderUpgradeButton(
		ability,
		"Choose an ability",
		renderAbilityPopup(level, index, job?.jobName, ability),
		job ? CLASSES[job.class].color : null,
	);
}

function renderMasterySelect(level) {
	const character = getCharacter();
	const stats = getJobStats(level);
	const mastery = character.job[level].mastery;
	const job = getAbilityJob(mastery);

	const masteryFullName = stats.availableAbilities.find((ability) => ability.startsWith(mastery));
	const abilities = stats.availableAbilities.filter(
		(ability) => ability === masteryFullName || !stats.masteredAbilities.includes(extractTalent(ability).ability)
	);

	return renderUpgradeButton(
		mastery ? `Mastery: ${masteryFullName}` : null,
		"Choose a mastery",
		renderAvailableAbilityPopup(
			masteryFullName, 
			(chosenAbility) => character.job[level].mastery = extractTalent(chosenAbility).ability, 
			abilities, 
			false,
		),
		job ? CLASSES[job.class].color : null,
	);
}

function renderAbilityPopup(level, index, chosenJob, chosenAbility) {
	const character = getCharacter();
	const stats = getJobStats(level, false);
	const allowTalents = level !== 0;
	character.job[level].abilities ??= [];
	chosenJob ??= "";
	chosenAbility ??= "";

	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; justify-content: space-between; gap: 20px;";

	const description = document.createElement("div");
	description.style = "width: 400px; flex-grow: 1; height: 500px; overflow: auto; margin-right: -20px; padding-right: 20px;";

	description.append(renderAbilityDescription(chosenAbility, false));

	const abilityOptions = document.createElement("div");
	abilityOptions.style = "display: flex; flex-direction: column; gap: 5px; width: 180px;";

	const renderAbilityOptions = (jobName) => {
		const job = JOBS[jobName];
		const abilities = Object.keys(job.abilities)
			.filter((ability) => ability && (ability === chosenAbility || !stats.availableAbilities?.includes(ability)))
			.filter((ability) => {
				const chapter = getAbility(ability).chapter;
				return chapter <= (character.chapter ?? 1) || chapter <= (level + 3) / 4
			});
		
		if (allowTalents) {
			const talents = Object.keys(job.abilities).filter((ability) => {
				return (
					ability !== chosenAbility 
					&& stats.availableAbilities?.includes(ability)
					&& !stats.availableAbilities?.includes(ability + " I")
					&& !stats.availableAbilities?.includes(ability + " II")
				) || (
					extractTalent(chosenAbility).talent
					&& ability === extractTalent(chosenAbility).ability
				);
			});

			for (const talent of talents) {
				abilities.push(
					talent + " I",
					talent + " II",
				);
			}
		}
		
		abilityOptions.innerHTML = "";
		for (const ability of abilities) {
			const button = document.createElement("button");
			button.style.color = CLASSES[job.class].color;
			button.innerHTML = ability;

			if (ability === chosenAbility) {
				button.className = "active";
			}

			button.addEventListener("click", () => {
				for (active of abilityOptions.getElementsByClassName("active")) {
					active.className = "";
				}
				button.className = "active";

				chosenAbility = ability;
				description.innerHTML = "";
				description.append(renderAbilityDescription(chosenAbility, false));
			});

			abilityOptions.append(button);
		}
	};

	if (stats.availableJobs.length > 1) {
		const jobOptions = document.createElement("div");
		jobOptions.style = "display: flex; flex-direction: column; gap: 5px; width: 180px;";

		for (const job of stats.availableJobs) {
			const button = document.createElement("button");
			button.style.color = CLASSES[JOBS[job].class].color;
			button.innerHTML = job;

			if (job === chosenJob) {
				button.className = "active";
			}

			button.addEventListener("click", () => {
				for (active of jobOptions.getElementsByClassName("active")) {
					active.className = "";
				}
				button.className = "active";

				chosenJob = job;
				renderAbilityOptions(chosenJob);
			});

			jobOptions.append(button);
		}

		popupContent.append(jobOptions);
	} else {
		chosenJob = stats.availableJobs[0];
		renderAbilityOptions(chosenJob);
	}

	popupContent.append(abilityOptions, description);

	const popup = renderPopup(popupContent, () => {
		if (!chosenAbility) {
			return false;
		}

		character.job[level].abilities[index] = chosenAbility;
	});
	popup.style.width = stats.availableJobs.length > 1 ? "900px" : "700px";
	popup.style.maxWidth = stats.availableJobs.length > 1 ? "900px" : "700px";

	return popup;
}

function renderAvailableAbilityPopup(chosenAbility, callback, availableAbilities, filterUpgrades = true) {
	chosenAbility ??= "";

	const popupContent = document.createElement("div");
	popupContent.style = "display: flex; justify-content: space-between; gap: 20px;";

	const description = document.createElement("div");
	description.style = "width: 400px; flex-grow: 1; height: 500px; overflow: auto; margin-right: -20px; padding-right: 20px;";

	description.append(renderAbilityDescription(chosenAbility, filterUpgrades));

	const abilityOptions = document.createElement("div");
	abilityOptions.style = "display: flex; flex-direction: column; gap: 5px; width: 180px;";
	
	for (const ability of availableAbilities) {
		const job = getAbilityJob(ability);

		const button = document.createElement("button");
		button.style.color = CLASSES[job.class].color;
		button.innerHTML = ability;

		if (ability === chosenAbility) {
			button.className = "active";
		}

		button.addEventListener("click", () => {
			for (active of abilityOptions.getElementsByClassName("active")) {
				active.className = "";
			}
			button.className = "active";

			chosenAbility = ability;
			description.innerHTML = "";
			description.append(renderAbilityDescription(chosenAbility, filterUpgrades));
		});

		abilityOptions.append(button);
	}

	popupContent.append(abilityOptions, description);

	const popup = renderPopup(popupContent, () => {
		if (!chosenAbility) {
			return false;
		}

		callback(chosenAbility);
	});
	popup.style.width = "700px";
	popup.style.maxWidth = "700px";

	return popup;
}

function renderAbilityDescription(abilityName, filterUpgrades = true) {
	if (!abilityName) {
		return "";
	}

	const job = getAbilityJob(abilityName);
	const ability = getAbility(abilityName, filterUpgrades);

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px;";

	const title = document.createElement("h2");
	title.style.color = CLASSES[job.class].color;
	title.style.marginBottom = 0;
	title.innerHTML = abilityName;

	const action = document.createElement("div");
	action.innerHTML = `${ability.action.join(", ")}`;

	const tags = document.createElement("div");
	tags.style.marginBottom = "20px";
	tags.innerHTML = `${ability.tags.join(", ")}`;

	const description = document.createElement("div");
	description.style.fontStyle = "italic";
	description.innerHTML = ability.description;

	const effects = document.createElement("div");
	effects.style = "display: flex; flex-direction: column; gap: 5px;";

	for (const effect of ability.effects) {
		const element = document.createElement("div");
		element.innerHTML = effect.type ? `<b>${effect.type}:</b> ${effect.effect}` : effect.effect;

		effects.append(element);

		if (effect.subAbility) {
			effects.append(renderSubAbility(effect.subAbility, CLASSES[job.class].color));
		}
	}

	container.append(
		title,
		action, 
		tags,
		description,
		effects,
	);

	if (ability.talents) {
		const talentsTitle = document.createElement("h3");
		talentsTitle.innerHTML = Object.keys(ability.talents).length > 1 ? "Talents:" : "Talent:";

		const talents = document.createElement("div");

		for (const talent of Object.keys(ability.talents)) {
			const element = document.createElement("div");
			element.style = "display: flex;";
			
			const label = document.createElement("div");
			label.style.minWidth = "25px";
			label.innerHTML = `${talent}:`;
			
			const text = document.createElement("div");
			text.innerHTML = ability.talents[talent];

			element.append(label, text);
			talents.append(element);
		}

		container.append(
			talentsTitle,
			talents,
		);
	}

	if (ability.mastery) {
		const mastery = document.createElement("div");
		mastery.innerHTML = `<h3>Mastery: ${ability.mastery.name}</h3> ${ability.mastery.effect}`;

		container.append(mastery);

		if (ability.mastery.subAbility) {
			container.append(renderSubAbility(ability.mastery.subAbility, CLASSES[job.class].color));
		}
	}

	return container;
}

function renderSubAbility(subAbility, color) {
	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px; padding-left: 30px;";

	const title = document.createElement("h3");
	title.style.color = color;
	title.style.margin = 0;
	title.innerHTML = subAbility.name;

	container.append(title);

	if (subAbility.tags.length > 0) {
		const tags = document.createElement("div");
		tags.innerHTML = `${subAbility.tags.join(", ")}`;

		container.append(tags);
	}

	const effects = document.createElement("div");
	effects.style = "display: flex; flex-direction: column; gap: 5px;";

	for (const effect of subAbility.effects) {
		const element = document.createElement("div");
		element.innerHTML = effect.type ? `<b>${effect.type}:</b> ${effect.effect}` : effect.effect;

		effects.append(element);
	}

	container.append(effects);

	return container;
}

function getAbility(abilityName, filterUpgrades = true) {
	if (!abilityName) {
		return null;
	}

	const { ability, talent } = extractTalent(abilityName);

	for (const job of Object.values(structuredClone(JOBS))) {
		if (job.abilities[ability]) {
			if (talent) {
				job.abilities[ability].talents = {
					[talent]: job.abilities[ability].talents[talent],
				};
			} else if (filterUpgrades) {
				delete job.abilities[ability].talents;
			}

			if (filterUpgrades) {
				const masteries = getJobStats().masteredAbilities;

				if (!masteries.includes(ability)) {
					delete job.abilities[ability].mastery;
				}
			}

			return job.abilities[ability];
		}
	}
}

function getAbilityJob(abilityName) {
	if (!abilityName) {
		return null;
	}

	const { ability } = extractTalent(abilityName);

	for (const [jobName, job] of Object.entries(JOBS)) {
		if (job.abilities[ability]) {
			job.name = jobName;
			return job;
		}
	}
}

function extractTalent(ability) {
	if (ability.endsWith(" I")) {
		return { ability: ability.slice(0, -2), talent: "I" };
	}

	if (ability.endsWith(" II")) {
		return { ability: ability.slice(0, -3), talent: "II" };
	}

	return { ability, talent: false };
}