import * as ReactDOM from "react-dom";
import App from "./App";
import { LocalStorage } from "./localStorage";

const storage = new LocalStorage();
const tags = ["Fruit", "Vegetable", "Activity"];

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App storage={storage} tags={tags} seed={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
