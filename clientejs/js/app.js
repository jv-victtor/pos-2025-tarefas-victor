// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    // Carregar lista inicial de Pokémon
    loadPokemonList();
    
    // Configurar event listeners
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    // Paginação
    elements.prevBtn.addEventListener('click', () => {
        currentOffset -= POKEMON_PER_PAGE;
        currentPage--;
        loadPokemonList();
    });
    
    elements.nextBtn.addEventListener('click', () => {
        currentOffset += POKEMON_PER_PAGE;
        currentPage++;
        loadPokemonList();
    });
    
    // Busca
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Voltar para a lista
    elements.backBtn.addEventListener('click', () => {
        showPokemonList();
    });
}

// Carregar lista de Pokémon
async function loadPokemonList() {
    showLoading();
    try {
        const pokemonList = await fetchPokemonList(currentOffset);
        renderPokemonList(pokemonList);
        showPokemonList();
    } catch (error) {
        showError('Não foi possível carregar a lista de Pokémon');
    } finally {
        hideLoading();
    }
}

// Carregar detalhes do Pokémon
async function loadPokemonDetail(nameOrId) {
    showLoading();
    try {
        // Buscar informações básicas do Pokémon
        const pokemon = await fetchPokemonDetail(nameOrId);
        
        // Buscar informações da espécie em paralelo
        const speciesPromise = fetchPokemonSpecies(nameOrId);
        
        // Buscar cadeia de evolução se disponível
        let evolutionChain = null;
        if (pokemon.species && pokemon.species.url) {
            const speciesData = await speciesPromise;
            if (speciesData.evolution_chain && speciesData.evolution_chain.url) {
                evolutionChain = await fetchEvolutionChain(speciesData.evolution_chain.url);
            }
        }
        
        const species = await speciesPromise;
        
        renderPokemonDetail(pokemon, species, evolutionChain);
        showPokemonDetail();
    } catch (error) {
        showError('Não foi possível carregar os detalhes do Pokémon');
        console.error(error);
    } finally {
        hideLoading();
    }
}

// Manipular busca
function handleSearch() {
    const query = elements.searchInput.value.trim().toLowerCase();
    
    if (query) {
        loadPokemonDetail(query);
    } else {
        showError('Por favor, digite um nome ou ID de Pokémon');
    }
}