import { VITE_POKEMON_URL, VITE_SPRITES_URL } from '../env';
import type { PokeApiResponse, PokemonResult } from "../types/pokeapi";

const POKEMON_URL = VITE_POKEMON_URL;
const SPRITES_URL = VITE_SPRITES_URL;

export async function getAll(page: number): Promise<PokeApiResponse> {
    try {
        const fetchResource = await fetch(`${POKEMON_URL}?limit=30&offset=${page * 30}`);
        if (!fetchResource.ok) {
            console.info('Error en respuesta api obteniendo lista pokemon (funcion getAll):', fetchResource.statusText);
            return {
                status: 'WARNING',
                msg: "Inconvenientes al obtener la lista de Pokémon"
            };
        }

        let data = await fetchResource.json();

        data.results = data.results.map((pokemon: PokemonResult) => ({
            id: pokemon.url.split('/').slice(-2, -1)[0],
            name: pokemon.name.replace(pokemon.name[0], pokemon.name[0].toUpperCase()),
            url: pokemon.url,
            sprite: `${SPRITES_URL}${pokemon.url.split('/').slice(-2, -1)[0]}.png`
        }));

        return {
            status: 'OK',
            msg: 'Pokémon obtenidos correctamente',
            count: data.count,
            data: data.results as PokemonResult[]
        };
    } catch (error: any) {
        console.info("Error al obtener la lista de Pokémon (funcion getAll):", error.message);
        return {
            status: 'ERROR',
            msg: 'Inconvenientes al obtener la lista de Pokémon'
        };
    }
}

export async function getByIdOrName(idOrName: string): Promise<PokeApiResponse> {
    try {
        const fetchResource = await fetch(`${POKEMON_URL}/${idOrName}`);

        if (!fetchResource.ok) {
            console.info('Error en respuesta api obteniendo pokemon (funcion getById):', fetchResource.statusText);
            return {
                status: 'WARNING',
                msg: "Inconvenientes al obtener el Pokémon"
            };
        }

        const pokemonResult = await fetchResource.json();

        let data = {
            id: pokemonResult.id,
            name: pokemonResult.name.replace(pokemonResult.name[0], pokemonResult.name[0].toUpperCase()),
            sprite: pokemonResult.sprites.front_default,
            height: pokemonResult.height,
            weight: pokemonResult.weight,
            types: pokemonResult.types.map((type: any) => type.type.name)
        } as PokemonResult;

        const fetchSpeciesResource = await fetch(pokemonResult.species.url);

        if (!fetchSpeciesResource.ok) {
            console.info('Error en respuesta api obteniendo pokemon (funcion getById):', fetchSpeciesResource.statusText);
            return {
                status: 'WARNING',
                msg: "Inconvenientes al obtener el Pokémon"
            };
        }
        const speciesResult = await fetchSpeciesResource.json();

        data = {
            ...data,
            description: speciesResult.flavor_text_entries.find((entry: any) => entry.language.name === 'es')?.flavor_text || '',
            genus: speciesResult.genera.find((genus: any) => genus.language.name === 'es')?.genus || ''
        }

        return {
            status: 'OK',
            msg: 'Pokémon obtenido correctamente',
            data: data as PokemonResult
        };
    } catch (error: any) {
        console.info("Error al obtener el Pokémon (funcion getById):", error.message);
        return {
            status: 'ERROR',
            msg: 'Error desconocido al obtener el Pokémon'
        };
    }
}