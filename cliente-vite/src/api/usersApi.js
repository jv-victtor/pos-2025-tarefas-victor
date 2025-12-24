const BASE_URL = 'https://pokeapi.co/api/v2/';

export const typeColors = {
  grass: 'bg-green-200 border-green-400',
  fire: 'bg-red-200 border-red-400',
  water: 'bg-blue-200 border-blue-400',
  electric: 'bg-yellow-200 border-yellow-400',
  normal: 'bg-gray-200 border-gray-400',
};

export const tipoTraducao = {
  fogo: 'fire',
  água: 'water',
  grama: 'grass',
  elétrico: 'electric',
  normal: 'normal',
};

export async function fetchPokemonData(name) {
  const resp = await fetch(`${BASE_URL}pokemon/${name}`);
  if (!resp.ok) throw new Error('Erro ao buscar Pokémon');
  return await resp.json();
}

export async function fetchPokemonSpecies(name) {
  const resp = await fetch(`${BASE_URL}pokemon-species/${name}`);
  if (!resp.ok) throw new Error('Erro ao buscar espécie');
  return await resp.json();
}

export async function fetchEvolutionChain(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Erro ao buscar cadeia evolutiva');
  return await resp.json();
}

export async function getEvolutionChainNames(chain) {
  const evoChain = [];
  let evoData = chain;

  do {
    evoChain.push(evoData.species.name);
    evoData = evoData.evolves_to[0];
  } while (evoData);

  return evoChain;
}