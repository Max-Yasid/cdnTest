import { ChatInput } from "./chatInput";
import { WebComponent } from "../webComponent";
import { Box } from "../box/box";
import { chatMessage } from "./chatMessage";
import { sendMessage } from "../../api/sendMessage";

export class ChatContainer extends WebComponent {
  tag = ChatContainer.tag;
  messagesHistory = [
    {
      message: "¡Hola! ¿En qué puedo ayudarte hoy?",
      type: "apiMessage",
    },
  ];

  messagesContainer = new Box();
  chatInput = new ChatInput();

  defaultStyles = {
    visibility: "visible",
    bottom: "60px",
    right: "10px",
    position: "absolute",
    display: "inline-block",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 5px 40px",
    width: "400px",
    maxHeight: "704px",
    height: "70vh",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "10px 20px",
  };

  constructor() {
    super();
    this.setStyles(this.defaultStyles);

    this.messagesContainer.setStyles({
      height: "88%",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "10px 0",
    });

    this.chatInput.onSubmit(this.onSubmit.bind(this));
    this.appendChild(this.messagesContainer);
    this.appendChild(this.chatInput);

    this.renderMessages(this.messagesHistory);
  }

  onSubmit(message) {
    message = message.trim();
    if (!message) return;
    try {
      const history = structuredClone(this.messagesHistory);
      history.splice(0, 1);
      const payload = {
        history,
        question: message,
      };

      this.addMessages([{ message: message, type: "userMessage" }]);

      sendMessage(payload).then((apiMessage) => {
        if (!apiMessage.success) throw new Error(apiMessage.msg);
        if (apiMessage.data.process.length) {
          apiMessage.data.process.forEach((process) => {
            this.addMessages([
              { message: process.content, type: process.role },
            ]);
          });
        }
        this.addMessages([
          { message: apiMessage.data.answer, type: "apiMessage" },
        ]);
      });
    } catch (err) {}
  }

  toggle() {
    this.style.visibility =
      this.style.visibility === "visible" ? "hidden" : "visible";
  }

  renderMessages(messages) {
    messages.forEach(
      (m) =>
        !["dataMessage"].includes(m.type) &&
        this.messagesContainer.appendChild(new chatMessage(m))
    );
  }

  addMessages(messages) {
    this.messagesHistory = this.messagesHistory.concat(messages);
    this.renderMessages(messages);
    console.log(this.messagesHistory);
  }
}

ChatContainer.tag = "onbotgo-chatcontainer";
