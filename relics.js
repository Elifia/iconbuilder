function renderRelics() {
	const stats = getJobStats();

	const container = document.createElement("div");

	if (!stats?.relics) {
		container.style.marginTop = "20px";
		container.innerHTML = "This character does not yet have any relics."

		return container;
	}

	container.style = "display: flex; flex-direction: column; gap: 10px;";

	for (const relic of stats.relics) {
		const element = document.createElement("div");
		element.style = "padding: 10px 20px; border: 1px solid #666;";

		const title = document.createElement("h3");
		title.style.color = CLASSES[RELICS[relic.name].class].color;
		title.innerHTML = relic.name;

		element.append(
			renderRelicDescription(
				relic.name,
				relic.dust ?? 0,
				relic.level ?? 1,
				relic.aspected ?? false,
				"margin: 5px 0;",
				true,
				(key, value) => {
					relic[key] = value;
					if (key === "level" && value < 3) {
						relic.aspected = false;
					}
					update();
					render();
				},
			),
		);
		container.append(element);
	}
	
	return container;
}

function renderRelicDescription(relicName, relicDust = null, relicLevel = null, isAspected = true, titleStyle = "margin-bottom: 0;", includeEdit = false, callback = null) {
	if (!relicName) {
		return "";
	}

	const relic = RELICS[relicName];

	const container = document.createElement("div");
	container.style = "display: flex; flex-direction: column; gap: 5px;";

	const title = document.createElement("h2");
	title.style = titleStyle;
	title.style.color = CLASSES[relic.class].color;
	title.innerHTML = relicName;

	const description = document.createElement("div");
	description.style.fontStyle = "italic";
	description.innerHTML = relic.description;

	const levels = document.createElement("div");

	for (const [index, level] of ["I", "II", "III"].entries()) {
		const element = document.createElement("div");
		element.style = "display: flex; margin: 5px 0;";

		if (relicLevel && relicLevel < index + 1) {
			element.style.color = "#888";
		}
		
		const label = document.createElement("div");
		label.style.minWidth = "25px";
		label.innerHTML = `${level}:`;
		
		const text = document.createElement("div");
		text.innerHTML = relic[level];

		element.append(label, text);
		levels.append(element);
	}

	const aspected = document.createElement("div");
	aspected.style = "margin-top: 10px;";
	aspected.innerHTML = `<b>Aspected:</b> ${relic.aspected}`;

	if (!isAspected) {
		aspected.style.color = "#888";
	}

	const quest = document.createElement("div");
	quest.innerHTML = `<b>Aspect Quest:</b> ${relic.quest}`;

	if (relicLevel && (relicLevel < 3 || isAspected)) {
		quest.style.color = "#888";
	}

	container.append(
		title,
		description,
		levels,
		aspected,
		quest,
	);

	if (includeEdit) {
		const inputs = document.createElement("div");
		inputs.style = "display: flex; align-items: end; gap: 5px;";
		
		for (
			let [key, label, value, min, max] of [
				["dust", "Dust", relicDust, 0, relicLevel >= 3 ? (isAspected ? 0 : 12) : 6],
				["level", "Level", relicLevel, 1, 3]
			]
		) {
			const element = document.createElement("label");
			element.style.width = "70px";
			element.innerHTML = label;

			const input = document.createElement("input");
			input.name = key;
			input.type = "number";
			input.min = min;
			input.max = max;
			input.setAttribute("value", value);
			input.addEventListener("change", (event) => {
				if (event.target.value < 0) {
					value = +value + +event.target.value;
				} else {
					value = +event.target.value;
				}
				callback(key, value);
			});
			input.addEventListener("focus", () => input.select());

			element.append(input);
			inputs.append(element);
		}

		const aspectedButton = document.createElement("button");
		aspectedButton.style = "margin: 10px 0;";
		aspectedButton.innerHTML = "Aspected";

		if (isAspected) {
			aspectedButton.className = "active";
		} else {
			aspectedButton.style.color = "#999";
		}

		aspectedButton.addEventListener("click", () => {
			if (relicLevel >= 3) {
				callback("aspected", !isAspected);
			}
		});

		inputs.append(aspectedButton);

		container.append(inputs);
	}

	return container;
}