import { useEffect, useState } from 'react';
import PokemonCard from "../components/PokemonCard";
import Pokedex from "../components/Pokedex";
import Loader from '../components/Loader';
import { getAll, getByIdOrName } from '../api/pokeApi';
import type { PokeApiResponse, PokemonResult } from '../types/pokeapi';
import { toastifyError, toastifyWarn } from '../utils/utils';
import type { Pokemon } from '../types/pokemon';
import Paginator from '../components/Paginator';
import Hero from '../components/Hero';
import { useFavorites } from '../contexts/FavoritesContext';

const PokeGridPage = () => {
    const [page, setPage] = useState(0);
    const [pokemons, setPokemons] = useState<PokemonResult[]>([]);
    const [allPokemons, setAllPokemons] = useState<PokemonResult[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPokedex, setShowPokedex] = useState(false);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);
    const [searchResult, setSearchResult] = useState<PokemonResult | null>(null);
    const [searching, setSearching] = useState(false);
    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setPage(newPage - 1);
    }

    useEffect(() => {
        if (!search) {
            setSearchResult(null);
            setSearching(false);
            setIsLoading(true);
            getAll(page).then((response: PokeApiResponse) => {
                setIsLoading(false);
                if (response.status === 'OK' && response.data && response.count) {
                    setCount(response.count);
                    setPokemons(response.data as PokemonResult[]);
                    setAllPokemons(response.data as PokemonResult[]);
                    return;
                }

                if (response.status === 'WARNING') {
                    toastifyWarn(response.msg, {
                        position: "top-center",
                        autoClose: 2500
                    })
                    return;
                }

                toastifyError(response.msg, {
                    position: "top-center",
                    autoClose: 2500
                })
            })
        }
    }, [page, search]);

    const handleSearch = async () => {
        if (!search) {
            setSearchResult(null);
            setSearching(false);
            return;
        }
        setIsLoading(true);
        setSearching(true);

        const response = await getByIdOrName(search.trim().toLowerCase());
        setIsLoading(false);

        if (response.status === 'OK' && response.data) {
            setSearchResult(response.data as PokemonResult);
        } else {
            setSearchResult(null);
            toastifyWarn("Pokémon no encontrado", {
                position: "top-center",
                autoClose: 2500
            });
        }
    };

    useEffect(() => {
        let filtered = allPokemons;
        if (search) {
            filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (showFavorites) {
            filtered = filtered.filter(pokemon => pokemon.id && favorites.includes(pokemon.id));
        }
        setPokemons(filtered);
    }, [search, showFavorites, allPokemons]);

    return (
        <main>
            <button onClick={() => location.href = "#final"} className='fixed bottom-4 right-4 bg-amber-400 text-white font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-amber-500 transition-colors hover:cursor-pointer'>
                Ir al final
            </button>
            <Hero />
            <section className='px-5 sm:p-0 max-w-md mx-auto mb-3 space-y-4'>
                <label htmlFor='searchPokemon' className='mb-1 font-semibold'>Nombre de pokémon</label>
                <div className='flex justify-between gap-2'>
                    <input
                        type='text'
                        placeholder='Escribe para filtrar...'
                        className='border border-neutral-400 rounded-md px-3 py-1.5 w-full'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") handleSearch();
                        }}
                    />
                    <button
                        type='button'
                        className='bg-amber-400 text-white font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-amber-500 transition-colors hover:cursor-pointer'
                        onClick={handleSearch}
                    >
                        Buscar
                    </button>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                    <input
                        id="favorites"
                        type='checkbox'
                        checked={showFavorites}
                        onChange={e => setShowFavorites(e.target.checked)}
                    />
                    <label
                        htmlFor="favorites"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                        Mostrar favoritos s&oacute;lamente
                    </label>
                </div>
            </section>

            {!searching && (
                <Paginator total={count} currentPage={currentPage} onPageChange={onPageChange} />
            )}

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-20 mb-4">
                <Loader isLoading={isLoading} />

                {searching && searchResult ? (
                    <PokemonCard
                        key={searchResult.id}
                        id={searchResult.id}
                        sprite={searchResult.sprite}
                        name={searchResult.name}
                        isFavorite={isFavorite(searchResult.id)}
                        handlePokedex={() => {
                            setIsLoading(true);
                            getByIdOrName(searchResult.id).then((response: PokeApiResponse) => {
                                setIsLoading(false);
                                if (response.status === 'OK' && response.data) {
                                    setSelectedPokemon(response.data as Pokemon);
                                    setShowPokedex(true);
                                    return;
                                }
                                if (response.status === 'WARNING' && response.data) {
                                    toastifyWarn(response.msg, {
                                        position: "top-center",
                                        autoClose: 2500
                                    });
                                    return;
                                }
                                toastifyError(response.msg, {
                                    position: "top-center",
                                    autoClose: 2500
                                });
                            });
                        }}
                        onToggleFavorite={() =>
                            isFavorite(searchResult.id)
                                ? removeFavorite(searchResult.id)
                                : addFavorite(searchResult.id)
                        }
                    />
                ) : !searching && pokemons.map((pokemon) => (
                    (!showFavorites || isFavorite(pokemon.id)) && (
                        <PokemonCard
                            key={pokemon.id}
                            id={pokemon.id}
                            sprite={pokemon.sprite}
                            name={pokemon.name}
                            isFavorite={isFavorite(pokemon.id)}
                            handlePokedex={() => {
                                setIsLoading(true);
                                getByIdOrName(pokemon.id).then((response: PokeApiResponse) => {
                                    setIsLoading(false);
                                    if (response.status === 'OK' && response.data) {
                                        setSelectedPokemon(response.data as Pokemon);
                                        setShowPokedex(true);
                                        return;
                                    }
                                    if (response.status === 'WARNING' && response.data) {
                                        toastifyWarn(response.msg, {
                                            position: "top-center",
                                            autoClose: 2500
                                        });
                                        return;
                                    }
                                    toastifyError(response.msg, {
                                        position: "top-center",
                                        autoClose: 2500
                                    });
                                });
                            }}
                            onToggleFavorite={() =>
                                isFavorite(pokemon.id)
                                    ? removeFavorite(pokemon.id)
                                    : addFavorite(pokemon.id)
                            }
                        />
                    )
                ))}
            </section>

            <div id="final"></div>

            {!searching && (
                <Paginator total={count} currentPage={currentPage} onPageChange={onPageChange} />
            )}

            {showPokedex && (
                <Pokedex pokemon={selectedPokemon} handlePokedex={() => setShowPokedex(false)} />
            )}
        </main>
    );
};

export default PokeGridPage;
