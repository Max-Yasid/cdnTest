import WidgetContainer from "./components/widgetContainer";

import {
  BubbleIconToggler,
  BubbleIconTogglerStyles,
} from "./components/bubble/bubbleIconToggler";
import {
  ChatContainer,
  chatContainerStyles,
} from "./components/chat/chatContainer";
import { chatMessage, chatMessageStyles } from "./components/chat/chatMessage";
import { ChatInput, ChatInputStyles } from "./components/chat/chatInput";
import { Box } from "./components/box/box";

import { appConfig } from "./app-state/config";
import { theme } from "./app-state/theme";
import { addInlineStylesToElement } from "./utils/addInlineStyles";

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
  setConfig({ chatflow, theme: customTheme }) {
    appConfig.chatflowID = chatflow;

    if (!customTheme) return;
    const { typography, colors } = customTheme;

    if (typography)
      Object.keys(typography).forEach(
        (typo) => (theme.colors[typo] = colors[typo])
      );

    if (colors)
      Object.keys(colors).forEach(
        (color) => (theme.colors[color] = colors[color])
      );
  }

  init() {
    const widgetContainer = new WidgetContainer();

    addInlineStylesToElement({
      element: widgetContainer,
      styles: [
        BubbleIconTogglerStyles,
        chatContainerStyles,
        chatMessageStyles,
        ChatInputStyles,
      ],
    });

    document.body.appendChild(widgetContainer);
  }

  registerComponents(...classComponents) {
    classComponents.forEach((c) => customElements.define(c.tag, c));
  }
}
export default new Chatbot();
