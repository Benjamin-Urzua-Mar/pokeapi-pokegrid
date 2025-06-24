import { TypeColor, type Pokemon } from "../types/pokemon";

interface CardProps {
    pokemon: Pokemon;
    handlePokedex?: () => any;
}

const Card: React.FC<CardProps> = ({ pokemon, handlePokedex }) => {
    if (pokemon.sprite === null || pokemon.sprite === undefined || pokemon.sprite === "") {
        pokemon.sprite = "whosthatpokemon.jpeg";
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm text-center top-0 left-0">
            <div className="bg-white rounded-lg p-4 w-[75%] lg:w-[45%] 2xl:w-[35%] shadow-lg relative">
                <div className="w-full flex justify-between p-1">
                    <div className="flex gap-1 font-extrabold w-11/12 items-center hover:cursor-not-allowed">
                        <div className="w-1/12 ">&laquo;</div>
                        <div className="w-3/12 border-4 rounded-lg border-red-500 text-sm">INFO</div>
                        <div className="w-3/12 border-2 rounded-lg text-sm">AREA</div>
                        <div className="w-3/12 border-2 rounded-lg text-sm">FORMS</div>
                        <div className="w-1/12">&raquo;</div>
                    </div>
                    <div className="w-1/12 flex justify-end">
                        <button
                            className="font-bold hover:cursor-pointer hover:text-amber-300 text-xl"
                            onClick={handlePokedex}
                            aria-label="Cerrar"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                <div className="flex flex-row gap-1">
                    <div className="w-5/12">
                        <img src={pokemon.sprite} className="w-full sm:w-[78%] 2xl:w-[69%] mx-auto aspect-auto object-center" />
                    </div>
                    <div className="w-7/12">
                        <div className="border-2 rounded-md">
                            <div className="flex justify-center bg-red-500 text-white text-shadow-sm text-shadow-black font-bold p-1 items-center gap-2">
                                <img src="pokeball.png" className="w-6"></img>
                                <span>{pokemon.id} {pokemon.name}</span>
                            </div>
                            <div className="bg-gray-50 font-bold p-1">
                                <span>{pokemon.genus}</span>
                            </div>
                        </div>
                        <div className="flex justify-between mt-1">
                            {pokemon.types?.map((type, index) => {
                                const color = TypeColor[type as keyof typeof TypeColor] || TypeColor.unknown;
                                return (
                                    <div
                                        key={index}
                                        className={`border-2 rounded-md py-1 px-1 text-white font-bold w-6/12 ${color}`}
                                    >
                                        <span>{type.toUpperCase()}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="border-2 rounded-md mt-1">
                            <div className="rounded-md py-1 px-3 font-bold">
                                <div className="flex justify-around">
                                    <span>HT</span>
                                    <span>{pokemon.height}</span>
                                </div>
                            </div>
                            <div className="rounded-md py-1 px-3 font-bold">
                                <div className="flex justify-around">
                                    <span>WT</span>
                                    <span>{pokemon.weight}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row border-2 rounded-md p-2 mt-1 font-bold">
                    <p className="text-justify">{pokemon.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
