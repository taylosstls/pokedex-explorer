var listFilter = '',
	listElement = document.getElementById('pokeList'),
	inputElement = document.getElementById('pokeFilter'),
	pokeballElement = document.getElementById('pokeballBack');

inputElement.addEventListener('keyup', function () {
	listFilter = this.value;
	setList();
})

// Rotacionar a pokebola
window.addEventListener('scroll', function () {
	var rotation = 'translateY(-50%) rotateZ(' + (window.scrollY / 25) + 'deg)';
	pokeballElement.style.transform = rotation;
})

// Função exibir lista
function setList() {
	PokeService.listAll(function (pkmList) {
		// Filtra a lista
		var list = filterList(pkmList);
		var template = ListService.createList(list);
		listElement.innerHTML = template;
	});
}

// Função de filtrar
function filterList(pkmList) {
	return pkmList.filter(function (pkm) {
		// Retorna os pokemons listados pelo input
		return pkm.name.indexOf(listFilter.toLowerCase()) !== -1;
	})
}


setList();