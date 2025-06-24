export interface PokeApiResponse {
    status: 'OK' | 'WARNING' | 'ERROR';
    msg: string;
    count?: number;
    data?: PokemonResult | PokemonResult[];
}

export interface PokemonResult {
    id: string;
    name: string;
    url: string;
    sprite: string;
    height: number;
    weight: number;
    description: string;
    genus:string;
    types?: string[];
}


