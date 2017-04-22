$(document).ready(function() {

	const marvelArray = [];

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
		});
});