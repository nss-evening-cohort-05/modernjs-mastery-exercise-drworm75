$(document).ready(function() {

	const marvelArray = [];

	const makeDom = (myArrayToPrint) => {
	let myDomString = "";
	myDomString += `<div class="row">`
	for (let i = 0; i < myArrayToPrint.length; i++) {
		if (myArrayToPrint[i].name !== undefined && myArrayToPrint[i].team_id !== undefined) {
		myDomString += `<div class="heroCard col-md-3">`;
		myDomString += `<header><h1>${myArrayToPrint[i].name}</h1></header>`;
		myDomString += `<section><img src="${myArrayToPrint[i].image}">`;
		myDomString += `<p class="bio">${myArrayToPrint[i].description}</p></section>`;
		// myDomString += `<footer><h4>${myArrayToPrint[i].info}</h4></footer>`;
		myDomString += `</div>`
	if (((i + 1) % 4) === 0) {
		myDomString += `</div>`
		$('#heroes').append(myDomString);
			myDomString = "";
			myDomString += `<div class="row">`			
		}
	}

}

}

	const charactersJson = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./db/characters.json")
			.done((data1) => {
				console.log(data1);
				resolve(data1.characters);
			})
			.fail((error) => {
				reject(error);
			});

		});
	};

	const gendersJson = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./db/genders.json")
			.done((data2) => {
				console.log(data2);
				resolve(data2.genders);
			})
			.fail((error) => {
				reject(error);
			});

		});
	};


	const teamsJson = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./db/teams.json")
			.done((data3) => {
				console.log(data3);
				resolve(data3.teams);
			})
			.fail((error) => {
				reject(error);
			});

		});
	};

	Promise.all([charactersJson(), gendersJson(), teamsJson()])
		.then((result) => {
			result.forEach((ajaxCalls) => {
				ajaxCalls.forEach((marvel) => {
					marvelArray.push(marvel);
				});
			});
			console.log(marvelArray);
			makeDom(marvelArray);
		});
});