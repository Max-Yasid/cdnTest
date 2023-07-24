import { WebComponent } from "../webComponent";
import { Box } from "../box/box";

export class chatMessage extends WebComponent {
  messageBox = new Box();

  constructor(message) {
    super();
    this.setStyles({
      width: "100%",
      display: "flex",
      justifyContent:
        message.type === "userMessage" ? "flex-end" : "flex-start",
    });

    const classes = {
      userMessage: "from-user",
      apiMessage: "from-chatbot",
    };
    this.messageBox.setStyles({
      width: "fit-content",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      padding: "15px 15px",
      maxWidth: "80%",
      color: message.type === "userMessage" ? "white" : "black",
    });
    this.messageBox.classList.add(classes[message.type]);
    this.messageBox.innerText = message.message;
    this.appendChild(this.messageBox);
  }
}

chatMessage.tag = "onbotgo-chatmessage";

export const chatMessageStyles = {
  [`${chatMessage.tag} > .from-chatbot`]: {
    "background-color": "rgba(59, 129, 246,.1)",
  },
  [`${chatMessage.tag} > .from-user`]: {
    "background-color": "rgb(59, 129, 246)",
  },
};
