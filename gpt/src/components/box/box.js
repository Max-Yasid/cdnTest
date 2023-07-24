import { WebComponent } from "../webComponent";

export class Box extends WebComponent {
  constructor() {
    super();
    this.setStyles({ display: "inline-block", width: "100%" });
  }
}
Box.tag = "onbotgo-box";
