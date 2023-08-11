import { WebComponent } from "../webComponent";
import { Box } from "../box/box";
import { theme } from "../../app-state/theme";

const tag = "onbotgo-chatmessage";
export class chatMessage extends WebComponent {
  messageBox = new Box();

  constructor(message) {
    super();
    this.setStyles({
      width: "100%",
      display: "flex",
      minHeight: "max(45px, fit-content)",
      justifyContent:
        message.type === "userMessage" ? "flex-end" : "flex-start",
    });

    const classes = {
      userMessage: "from-user",
      apiMessage: "from-chatbot",
      loadingMessage: "loading-api-message",
    };

    this.messageBox.setStyles({
      width: "fit-content",
      height: "fit-content",
      borderRadius: "6px",
      alignItems: "center",
      padding: "15px 15px",
      fontFamily: theme.typography.primary,
      color: message.type === "userMessage" ? "white" : "black",
    });

    this.messageBox.classList.add(classes[message.type]);

    if (message.type === "userMessage")
      this.messageBox.innerText = message.message;
    else if (message.type === "loadingMessage") {
      this.messageBox.appendChild(this.loadingMessageElement);
      this.messageBox.appendChild(this.createSoftBackgroundColor());
    } else {
      this.messageBox.innerHTML = message.message;
      this.messageBox.appendChild(this.createSoftBackgroundColor());
    }

    this.appendChild(this.messageBox);
  }

  get loadingMessageElement() {
    const container = new Box();
    const dot1 = new Box();
    const dot2 = new Box();
    const dot3 = new Box();

    container.setStyles({
      alignItems: "center",
      display: "flex",
      height: "17px",
      gap: "5px",
    });

    [dot1, dot2, dot3].forEach((dot) =>
      dot.setStyles({
        transform: "translateY(2px)",
        backgroundColor: theme.colors.primary,
        borderRadius: "50px",
        height: "10px",
        verticalAlign: "middle",
        width: "10px",
        display: "inline-block",
      })
    );

    [dot1, dot2, dot3].forEach(
      (dot, index) =>
        console.log(index, index * 200) ||
        dot.animate([{ transform: "translateY(-5px)", opacity: 0.2 }], {
          direction: "alternate",
          delay: index * 200,
          duration: 500,
          iterations: Infinity,
        })
    );

    container.appendChild(dot2);
    container.appendChild(dot3);
    container.appendChild(dot1);

    return container;
  }

  createSoftBackgroundColor() {
    const chatbotBackground = new Box();
    chatbotBackground.classList.add("bg-semi-transp");
    return chatbotBackground;
  }
}

chatMessage.tag = tag;

export const getChatMessageStyles = (theme) => ({
  [`${tag} > .from-chatbot`]: {
    width: "100%",
    content: "",
    overflow: "hidden",
    position: "relative",
    "max-width": "75%",
    "z-index": 1,
  },
  [`${tag} .bg-semi-transp`]: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: ".1",
    top: 0,
    "z-index": "-1",
    left: 0,
    "background-color": theme.colors.primary,
  },
  [`${tag} > .from-user`]: {
    "margin-right": "15px",
    "max-width": "70%",
    "background-color": theme.colors.primary,
  },
  [`${tag} > .loading-api-message`]: {
    position: "relative",
    "z-index": 1,
    overflow: "hidden",
  },
});
