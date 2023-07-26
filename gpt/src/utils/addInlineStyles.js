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

function transformAnimations_from_object_to_string(
  elementSelector,
  elementStyles = {}
) {
  const props = Object.keys(elementStyles);
  const values = Object.values(elementStyles);
  let result = `${elementSelector}{`;
  props.forEach((p, i) => (result += `${p}${values[i]};`));
  return result + "}";
}

function transformStyles(styles, type = false) {
  const cssSelectors = Object.keys(styles);
  let result = "";
  cssSelectors.forEach(
    (cssSelector) =>
      (result +=
        type === "animation"
          ? transformAnimations_from_object_to_string(
              cssSelector,
              styles[cssSelector]
            )
          : transformStyles_from_object_to_string(
              cssSelector,
              styles[cssSelector]
            ))
  );

  return result;
}

export function addInlineStylesToElement({ element, styles, animations }) {
  const mergedStyles = styles.reduce(
    (acc, stylesGroupedBySelector) => ({
      ...acc,
      ...stylesGroupedBySelector,
    }),
    {}
  );
  const mergedAnimations = animations.reduce(
    (acc, stylesGroupedBySelector) => ({
      ...acc,
      ...stylesGroupedBySelector,
    }),
    {}
  );

  const styleElement = document.createElement("style");

  const anim = transformStyles(mergedAnimations, "animation");
  const style = transformStyles(mergedStyles);
  styleElement.innerHTML = style + anim;
  element.prepend(styleElement);
}
