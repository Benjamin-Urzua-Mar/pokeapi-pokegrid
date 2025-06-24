globalThis.import = {
  meta: {
    env: {
      VITE_POKEMON_URL: 'https://pokeapi.co/api/v2/pokemon',
      VITE_SPRITES_URL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
    }
  }
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [], count: 0 }),
  })
);
