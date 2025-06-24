export type Pokemon = {
    id?: string;
    name?: string;
    url?: string;
    sprite?: string;
    height?: number;
    weight?: number;
    description?: string;
    genus?: string;
    types?: string[];
    handlePokedex?: () => any;
}

export const TypeColor = {
    fire: 'bg-red-300',
    water: 'bg-cyan-300',
    flying: 'bg-blue-300',
    grass: 'bg-green-300',
    electric: 'bg-yellow-300',
    ground: 'bg-yellow-800',
    rock: 'bg-stone-400',
    fairy: 'bg-pink-300',
    poison: 'bg-purple-400',
    bug: 'bg-lime-400',
    normal: 'bg-gray-300',
    psychic: 'bg-pink-400',
    fighting: 'bg-orange-700',
    ice: 'bg-cyan-100',
    dragon: 'bg-indigo-400',
    ghost: 'bg-violet-400',
    steel: 'bg-gray-400',
    unknown: 'bg-gray-300'
} as const;