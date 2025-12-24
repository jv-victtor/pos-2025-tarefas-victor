// Elementos DOM
const elements = {
    pokemonList: document.getElementById('pokemon-list'),
    pokemonDetail: document.getElementById('pokemon-detail'),
    listContainer: document.getElementById('list-container'),
    detailContainer: document.getElementById('detail-container'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    pageInfo: document.getElementById('page-info'),
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    backBtn: document.getElementById('back-btn'),
    loading: document.getElementById('loading')
};

// Estado da aplicação
let currentPage = 1;
let currentOffset = 0;

// Mostrar/ocultar loading
function showLoading() {
    elements.loading.classList.remove('hidden');
}

function hideLoading() {
    elements.loading.classList.add('hidden');
}

// Mostrar lista de Pokémon
function showPokemonList() {
    elements.pokemonList.classList.remove('hidden');
    elements.pokemonDetail.classList.add('hidden');
}

// Mostrar detalhes do Pokémon
function showPokemonDetail() {
    elements.pokemonList.classList.add('hidden');
    elements.pokemonDetail.classList.remove('hidden');
}

// Renderizar lista de Pokémon
function renderPokemonList(pokemonList) {
    elements.listContainer.innerHTML = '';
    
    pokemonList.results.forEach(pokemon => {
        const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
        
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" 
                 alt="${pokemon.name}" 
                 onerror="this.src='https://via.placeholder.com/96?text=?'">
            <h3>${pokemon.name}</h3>
            <div class="id">#${pokemonId}</div>
        `;
        
        card.addEventListener('click', () => loadPokemonDetail(pokemon.name));
        elements.listContainer.appendChild(card);
    });
    
    // Atualizar controles de paginação
    updatePaginationControls(pokemonList);
}

// Atualizar controles de paginação
function updatePaginationControls(pokemonList) {
    elements.pageInfo.textContent = `Página ${currentPage}`;
    
    elements.prevBtn.disabled = !pokemonList.previous;
    elements.nextBtn.disabled = !pokemonList.next;
}

// Renderizar detalhes do Pokémon
function renderPokemonDetail(pokemon, species, evolutionChain) {
    elements.detailContainer.innerHTML = '';
    
    // Cores para tipos de Pokémon
    const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
    };
    
    // Header com imagem e nome
    const detailHeader = document.createElement('div');
    detailHeader.className = 'detail-header';
    detailHeader.innerHTML = `
        <h2>${pokemon.name} <span class="id">#${pokemon.id}</span></h2>
        <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
             alt="${pokemon.name}">
        <div class="types">
            ${pokemon.types.map(type => 
                `<span class="type-badge" style="background-color: ${typeColors[type.type.name]}">${type.type.name}</span>`
            ).join('')}
        </div>
    `;
    elements.detailContainer.appendChild(detailHeader);
    
    // Informações detalhadas
    const detailInfo = document.createElement('div');
    detailInfo.className = 'detail-info';
    
    // Estatísticas
    const statsCard = document.createElement('div');
    statsCard.className = 'info-card';
    statsCard.innerHTML = `
        <h3>Estatísticas</h3>
        ${pokemon.stats.map(stat => `
            <div>
                <strong>${stat.stat.name}:</strong> ${stat.base_stat}
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${Math.min(stat.base_stat, 100)}%">${stat.base_stat}</div>
                </div>
            </div>
        `).join('')}
    `;
    detailInfo.appendChild(statsCard);
    
    // Habilidades
    const abilitiesCard = document.createElement('div');
    abilitiesCard.className = 'info-card';
    abilitiesCard.innerHTML = `
        <h3>Habilidades</h3>
        <ul>
            ${pokemon.abilities.map(ability => 
                `<li>${ability.ability.name} ${ability.is_hidden ? '(Oculta)' : ''}</li>`
            ).join('')}
        </ul>
    `;
    detailInfo.appendChild(abilitiesCard);
    
    // Informações da espécie
    if (species) {
        const speciesCard = document.createElement('div');
        speciesCard.className = 'info-card';
        
        // Encontrar descrição em português
        const ptDescription = species.flavor_text_entries.find(entry => 
            entry.language.name === 'pt' || entry.language.name === 'en'
        );
        
        speciesCard.innerHTML = `
            <h3>Informações da Espécie</h3>
            <p><strong>Gênero:</strong> ${species.gender_rate === -1 ? 'Sem gênero' : 
                `♀ ${(8 - species.gender_rate) * 12.5}% / ♂ ${species.gender_rate * 12.5}%`}</p>
            <p><strong>Taxa de Captura:</strong> ${species.capture_rate}/255</p>
            <p><strong>Habitat:</strong> ${species.habitat ? species.habitat.name : 'Desconhecido'}</p>
            <p><strong>Cor:</strong> ${species.color.name}</p>
            <p><strong>Descrição:</strong> ${ptDescription ? ptDescription.flavor_text : 'N/A'}</p>
        `;
        detailInfo.appendChild(speciesCard);
    }
    
    // Cadeia de evolução (simplificada)
    if (evolutionChain) {
        const evolutionCard = document.createElement('div');
        evolutionCard.className = 'info-card';
        
        // Função para extrair informações da cadeia de evolução
        function extractEvolutionInfo(chain) {
            let evolutions = [];
            
            function traverseChain(chain) {
                evolutions.push({
                    name: chain.species.name,
                    url: chain.species.url
                });
                
                if (chain.evolves_to.length > 0) {
                    chain.evolves_to.forEach(evolution => traverseChain(evolution));
                }
            }
            
            traverseChain(chain);
            return evolutions;
        }
        
        const evolutions = extractEvolutionInfo(evolutionChain.chain);
        
        evolutionCard.innerHTML = `
            <h3>Cadeia de Evolução</h3>
            <div class="evolution-chain">
                ${evolutions.map(evo => `
                    <div class="evolution-item">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.url.split('/').filter(Boolean).pop()}.png" 
                             alt="${evo.name}">
                        <span>${evo.name}</span>
                    </div>
                `).join('')}
            </div>
        `;
        detailInfo.appendChild(evolutionCard);
    }
    
    elements.detailContainer.appendChild(detailInfo);
}

// Tratamento de erros
function showError(message) {
    alert(`Erro: ${message}`);
}