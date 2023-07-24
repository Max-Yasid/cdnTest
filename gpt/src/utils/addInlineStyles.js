function transformStyles_from_object_to_string(
  elementSelector,
  elementStyles = {}
) {
  const props = Object.keys(elementStyles);
  const values = Object.values(elementStyles);
  let result = `${elementSelector}{`;
  props.forEach((p, i) => (result += `${p}:${values[i]};`));
  return result + "}";
}

function transformStyles(styles) {
  const cssSelectors = Object.keys(styles);
  let result = "";
  cssSelectors.forEach(
    (cssSelector) =>
      (result += transformStyles_from_object_to_string(
        cssSelector,
        styles[cssSelector]
      ))
  );
  const styleElement = document.createElement("style");
  styleElement.innerHTML = result;
  return styleElement;
}

export function addInlineStylesToElement({ element, styles }) {
  const mergedStyles = styles.reduce(
    (acc, stylesGroupedBySelector) => ({
      ...acc,
      ...stylesGroupedBySelector,
    }),
    {}
  );
  element.prepend(transformStyles(mergedStyles));
}
