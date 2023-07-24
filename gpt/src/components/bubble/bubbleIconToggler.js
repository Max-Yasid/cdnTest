import { WebComponent } from "../webComponent";

export class BubbleIconToggler extends WebComponent {
  tag = BubbleIconToggler.tag;
  constructor() {
    super();

    this.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    `;
  }
}

BubbleIconToggler.tag = "onbotgo-bubble";

export const BubbleIconTogglerStyles = {
  [BubbleIconToggler.tag]: {
    display: "grid",
    "place-items": "center",
    width: "48px",
    height: "48px",
    "background-color": "rgb(59, 129, 246)",
    fill: "transparent",
    "border-radius": "100px",
    transition: "transform 0.1s linear",
  },

  [`${BubbleIconToggler.tag}:hover`]: {
    transform: "scale(1.1)",
  },

  [`${BubbleIconToggler.tag} > svg`]: {
    width: "28px",
    height: "28px",
    stroke: "white",
    "stroke-width": "2px",
    "border-image-width": "2",
  },
};
