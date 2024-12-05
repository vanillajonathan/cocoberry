import {createRoot} from 'react-dom/client';
import App from "./App";
import { LocalStorage } from "./localStorage";

const storage = new LocalStorage();
const tags = ["Fruit", "Vegetable", "Activity"];

it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<App storage={storage} tags={tags} seed={[]} />);
    root.unmount();
});
