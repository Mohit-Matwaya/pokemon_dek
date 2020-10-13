export function Pokemon({ id, name, weight, height, experince, abilities }) {
  return Object.freeze({
    id,
    name,
    weight,
    height,
    experince,
    abilities,
    thumb: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  });
}
