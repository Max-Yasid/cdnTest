import { BubbleIconToggler } from "./bubble/bubbleIconToggler";
import { ChatContainer } from "./chat/chatContainer";

import { WebComponent } from "./webComponent";

class widgetContainer extends WebComponent {
  componentStyles = {
    display: "inline-block",
    position: "absolute",
    bottom: "20px",
    right: "20px",
  };

  constructor() {
    super();
    const chatIconToggler = new BubbleIconToggler();
    const chatContainer = new ChatContainer();

    chatIconToggler.onclick = () => chatContainer.toggle();

    this.appendChild(chatIconToggler);
    this.appendChild(chatContainer);

    this.setStyles(this.componentStyles);
  }

  connectedCallback() {}
}

widgetContainer.tag = "onbotgo-chatbot";

export default widgetContainer;
