import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps extends Pokemon {
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = (props) => {
    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "whosthatpokemon.jpeg";
    };

    return (
        <div className="group border max-w-full rounded-lg p-4 text-center hover:cursor-pointer hover:bg-amber-400 transition-colors" onClick={props.handlePokedex}>
            <div className="flex justify-end mb-1">
                {props.onToggleFavorite && (
                    <button
                        type="button"
                        className={
                            `ml-2 border-2 align-middle rounded-full w-11 h-11 border-amber-400 absolute text-4xl text-amber-400 group-hover:text-white group-hover:border-white hover:text-white hover:border-white hover:cursor-pointer focus:outline-none mt-0 mr-0 ${props.isFavorite ? 'text-[25px]' : 'text-4xl'}`
                        }
                        onClick={e => {
                            e.stopPropagation();
                            props.onToggleFavorite?.();
                        }}
                    >
                        {props.isFavorite ? "❤" : "♡"}
                    </button>
                )}
            </div>
            <div>
                <img src={props.sprite} onError={handleImgError} className="w-full aspect-auto object-contain" />
            </div>
            <hr />
            <span className="font-bold">#{props.id} {props.name}</span>
        </div>
    );
}

export default PokemonCard;
