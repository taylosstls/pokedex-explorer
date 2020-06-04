function request(url, callback) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		// Resposta com sucesso
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			callback(response);
		}
	}

	// Abrir a conexão
	xmlhttp.open('GET', url, true);
	// Envia a requisição
	xmlhttp.send();
}



var PokeService = {
	url: 'https://dev.treinaweb.com.br/pokeapi/',
	list: [],
	// Toda função precisa de um callback
	listAll: function (callback) {
		if (this.list.length) {
			// Retorna todo o conteúdo da lista
			callback(this.list);
		} else {
			// Retorna apenas 1
			var that = this;

			request(this.url + 'pokedex/1', function (response) {
				var pkmList = response.pokemon;

				pkmList = pkmList.map(function (pokemon) {
					var number = that.getNumberFromURL(pokemon.resource_uri);
					pokemon.number = number;
					return pokemon;
				})

					// Apenas primeira geração
					.filter(function (pokemon) {
						return (pokemon.number < 152)
					})
					// Organizar pokémons pela agenda
					.sort(function (a, b) {
						// Comparação em arrowFunction
						return (a.number > b.number ? 1 : -1);
					})

					.map(function (pokemon) {
						// Puxa 3 zeros e concatena com até 3 digitos.
						pokemon.number = ('000' + pokemon.number).slice(-3); 
						return pokemon;
					})

				that.list = pkmList;
				callback(pkmList);
			})
		}
	},

	// Expressão regular
	getNumberFromURL: function (url) {
		return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
	}
}