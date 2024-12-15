const pokeContainer = document.getElementById('poke-container')
const searchBtn = document.getElementById('btn')
const searchInput = document.getElementById('poke-search')

const pokeCount = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors)


const fetchPokemons = async () => {
   for(i = 1; i <= pokeCount; i++){
        await getPokemon(i)
   }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()

    pokemonCard(data)
}    


    
const pokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3,0)
    const weigth = pokemon.weight
    
    const pokeTypes = pokemon.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const cardShow = `
        <div class="image-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Type: <span>${type}</span></small>
                <small class="weigth" id="weigth">Weight: ${weigth}</small>
            </div>
    `
    pokemonEl.innerHTML = cardShow
    pokeContainer.appendChild(pokemonEl)
}

searchBtn.addEventListener('click', e => {
    const pokeNames = document.querySelectorAll('.pokemon');
    const search = searchInput.value.toLowerCase()
    

    pokeNames.forEach((pokemon) => {
        pokemon.style.display = 'block';

        if(!pokemon.innerHTML.toLowerCase().includes(search)) {
            pokemon.style.display = 'none'
        }
    })
    
})


fetchPokemons()
