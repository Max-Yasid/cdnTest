import { ChatInput } from "./chatInput";
import { WebComponent } from "../webComponent";
import { Box } from "../box/box";
import { chatMessage } from "./chatMessage";
import { sendMessage } from "../../api/sendMessage";
import { CustomScrollBar } from "../scrollbar/customScrollbar";
import { theme } from "../../app-state/theme";
import { logoSVG } from "../../assets/logo";

const tag = "onbotgo-chatcontainer";
export class ChatContainer extends WebComponent {
  messagesHistory = [
    {
      message: "¡Hola! ¿En qué puedo ayudarte hoy?",
      type: "apiMessage",
    },
  ];
  scrollableContainer = new Box();
  messagesContainer = new Box();
  scrollBar = new CustomScrollBar();

  chatInput = new ChatInput();

  footer = new Box();

  defaultStyles = {
    bottom: "60px",
    right: "10px",
    position: "absolute",
    display: "flex",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 5px 40px",
    flexDirection: "column",
    width: "400px",
    gap: "10px",
    maxWidth: "calc(100vw - 90px)",
    maxHeight: "704px",
    height: "70vh",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "10px 20px",
  };

  constructor() {
    super();
    this.classList.add("hidden");
    this.setStyles(this.defaultStyles);

    this.messagesContainer.id = "onbotgo-messageContainer";
    this.scrollBar["data-target-id"] = "scrollableElement";
    this.scrollBar.style.visibility = "hidden";
    this.scrollableContainer.appendChild(this.scrollBar);
    this.scrollableContainer.appendChild(this.messagesContainer);
    this.scrollableContainer.setStyles({
      height: "85%",
      position: "relative",
      overflow: "hidden",
      marginBottom: "15px",
    });

    this.messagesContainer.setStyles({
      height: "calc(100% - 1.5rem)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      position: "relative",
      padding: "1rem",
    });

    this.chatInput.onSubmit(this.onSubmit.bind(this));

    this.footer.setStyles({
      width: '100%',
      color: '#a1a1a1',
      display: "flex",
      alignItems: "center",
      fontFamily: theme.typography.primary,
      fontSize: "10px",
      justifyContent: "flex-end",
      gap:'5px'
    });
    this.footer.innerHTML = `Powered by ONBOTGO LLC. ${logoSVG}`;

    this.appendChild(this.scrollableContainer);
    this.appendChild(this.chatInput);
    this.appendChild(this.footer);

    this.renderMessages(this.messagesHistory);
  }

  onSubmit(message) {
    message = message.trim();
    if (!message) return;
    const history = structuredClone(this.messagesHistory);
    history.splice(0, 1);
    const payload = {
      history,
      question: message,
    };

    this.addMessages([{ message: message, type: "userMessage" }]);
    this.renderMessages([{ type: "loadingMessage" }]);
    this.updateScrollbar();

    sendMessage(payload)
      .then((apiMessage) => {
        if (!apiMessage.success) throw new Error(apiMessage.msg);

        if (apiMessage.data.process.length)
          apiMessage.data.process.forEach((process) => {
            this.addMessages([
              {
                type: process.role,
                name: process.name,
                content: process.content,
              },
            ]);
          });

        this.addMessages([
          { message: apiMessage.data.answer, type: "apiMessage" },
        ]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.messagesContainer
          .querySelectorAll(".loading-api-message")
          ?.forEach((node) => node.remove());
        this.updateScrollbar();
      });
  }

  toggle() {
    if (this.classList.contains("hidden")) {
      this.scrollBar.style.visibility = "hidden";
      this.classList.remove("hidden");
    } else {
      this.classList.add("hidden");

      if (this.messagesContainer.scrollTop > 0)
        this.scrollBar.style.visibility = "visible";
    }
  }

  renderMessages(messages) {
    messages.forEach(
      (m) =>
        !["dataMessage"].includes(m.type) &&
        this.messagesContainer.appendChild(new chatMessage(m))
    );
  }

  addMessages(messages, { updateScrollbar } = { updateScrollbar: false }) {
    this.messagesHistory = this.messagesHistory.concat(messages);
    this.renderMessages(messages);
    if (updateScrollbar) this.updateScrollbar();
  }

  updateScrollbar() {
    this.scrollBar.setScrollThumbHeight();
    this.messagesContainer.scrollTo(0, this.messagesContainer.scrollHeight);
    if (
      this.messagesContainer.scrollTop > 0 &&
      this.scrollBar.style.visibility === "hidden"
    )
      this.scrollBar.style.visibility = "visible";
  }
}
export const getChatContainerStyles = () => ({
  [`${tag}.hidden`]: {
    visibility: "hidden",
  },
});

ChatContainer.tag = tag;
