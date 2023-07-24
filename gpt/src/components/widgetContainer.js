import { transformStyles } from "../utils/transformStyles";
import { WebComponent } from "./webComponent";

class widgetContainer extends WebComponent {
  tag = widgetContainer.tag;

  componentStyles = {
    display: "inline-block",
    position: "absolute",
    bottom: "20px",
    right: "20px",
  };

  constructor() {
    super();
    this.addStyles({ [this.tag]: this.componentStyles });
  }

  addStyles(styles) {
    const selectors = Object.keys(styles);
    let result = "";
    selectors.forEach((s) => (result += transformStyles(s, styles[s])));
    let styleElement = document.createElement("style");
    styleElement.innerHTML = result;
    this.prepend(styleElement);
  }
  connectedCallback() {}
}

widgetContainer.tag = "onbotgo-chatbot";

export default widgetContainer;
