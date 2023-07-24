import WidgetContainer from "./components/widgetContainer";

import {
  BubbleIconToggler,
  BubbleIconTogglerStyles,
} from "./components/bubble/bubbleIconToggler";
import { ChatContainer } from "./components/chat/chatContainer";
import { chatMessage, chatMessageStyles } from "./components/chat/chatMessage";
import { ChatInput, ChatInputStyles } from "./components/chat/chatInput";
import { Box } from "./components/box/box";

import { appConfig } from "./app-state/config";
import { widgetTheme } from "./app-state/theme";

class Chatbot {
  messages = [];
  constructor() {
    this.registerComponents(
      WidgetContainer,
      BubbleIconToggler,
      ChatContainer,
      chatMessage,
      ChatInput,
      Box
    );
  }
  setConfig({ chatflow, theme: { typography, colors } }) {
    appConfig.chatflowID = chatflow;

    if (typography) widgetTheme.typography = typography;
    console.log(chatflow, appConfig);
  }

  init() {
    const widgetContainer = new WidgetContainer();

    const chatIconToggler = new BubbleIconToggler();
    const chatContainer = new ChatContainer();

    this.registerStyles({
      widget: widgetContainer,
      styles: [BubbleIconTogglerStyles, chatMessageStyles, ChatInputStyles],
    });

    chatIconToggler.onclick = () => chatContainer.toggle();

    widgetContainer.appendChild(chatIconToggler);
    widgetContainer.appendChild(chatContainer);

    document.body.appendChild(widgetContainer);
  }

  registerStyles({ widget, styles }) {
    const mergedStyles = styles.reduce((acc, ms) => ({ ...acc, ...ms }), {});
    widget.addStyles(mergedStyles);
  }

  registerComponents(...classComponents) {
    classComponents.forEach((c) => customElements.define(c.tag, c));
  }
}
export const chatbot = new Chatbot();
