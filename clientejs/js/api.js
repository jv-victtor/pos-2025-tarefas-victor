// Configurações da API
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_PER_PAGE = 20;

// Função para fazer requisições à API
async function fetchAPI(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}

// Buscar lista de Pokémon com paginação
async function fetchPokemonList(offset = 0) {
    const url = `${POKEAPI_BASE_URL}/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`;
    return await fetchAPI(url);
}

// Buscar detalhes de um Pokémon específico
async function fetchPokemonDetail(nameOrId) {
    const url = `${POKEAPI_BASE_URL}/pokemon/${nameOrId}`;
    return await fetchAPI(url);
}

// Buscar espécie do Pokémon para obter informações adicionais
async function fetchPokemonSpecies(nameOrId) {
    const url = `${POKEAPI_BASE_URL}/pokemon-species/${nameOrId}`;
    return await fetchAPI(url);
}

// Buscar informações de evolução
async function fetchEvolutionChain(url) {
    return await fetchAPI(url);
}