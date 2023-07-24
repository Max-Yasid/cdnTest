export function transformStyles(elementSelector, styles = {}) {
  const props = Object.keys(styles);
  const values = Object.values(styles);
  let result = `${elementSelector}{`;
  props.forEach((p, i) => (result += `${p}:${values[i]};`));
  return result + "}";
}
