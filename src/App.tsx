import "./App.css";
import { Menu } from "./components";
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/400.css"; // Specify weight
import "@fontsource/inter/400-italic.css"; // Specify weight and style

function App() {
  return (
    <div className="outer-container">
      <Menu />
    </div>
  );
}

export default App;
