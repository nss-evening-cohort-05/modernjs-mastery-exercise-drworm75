$(document).ready(function() {

	const marvelArray = [];
	let alphaArray = ["abcde fghij klmno pqrst uvwXy z"];
	let numberArray = ["1234567890"];

	$('.team-btn').click((event) => {
		$('body').addClass('heroPage');
		$('#heroes').html("");
		let currentTeam = ($(event.currentTarget).attr('id'));
		makeDom(marvelArray, currentTeam);
	});


	const makeDom = (myArrayToPrint, team) => {
	let myDomString = "";
	myDomString += `<div class="row">`;
	let cardCount = 0;
	for (let i = 0; i < myArrayToPrint.length; i++) {
		if (myArrayToPrint[i].name !== undefined && myArrayToPrint[i].team_id === parseInt(team)) {
			myDomString += `<div class="col-md-3">`;
			if (myArrayToPrint[i].gender_id === 0) {
				myDomString += `<div class="hero-card female">`;
			} else {
				myDomString += `<div class="hero-card male">`;
			}
			myDomString += `<header><h1>${myArrayToPrint[i].name}</h1></header>`;
			myDomString += `<section><img src="${myArrayToPrint[i].image}">`;
			if (myArrayToPrint[i].description === "" && myArrayToPrint[i].gender_id === 0) {
				myDomString += `<p class="bio">${alphaArray}</p></section>`;
			} if (myArrayToPrint[i].description === "" && myArrayToPrint[i].gender_id === 1) {
				myDomString += `<p class="bio">${numberArray}</p></section>`;
			} else {
				myDomString += `<p class="bio">${myArrayToPrint[i].description}</p></section>`;
			}
			// myDomString += `<footer><h4>${myArrayToPrint[i].info}</h4></footer>`;
			myDomString += `</div></div>`;
			cardCount += 1;
			if (((cardCount) % 4) === 0) {
				myDomString += `</div>`;
				$('#heroes').append(myDomString);
					myDomString = "";
					myDomString += `<div class="row">`;			
				} 
		}
		else if (i === (myArrayToPrint.length - 1)) {
			myDomString += `</div>`;
			$('#heroes').append(myDomString);
		}

}

};

	const charactersJson = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./db/characters.json")
			.done((data1) => {
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
		});
});