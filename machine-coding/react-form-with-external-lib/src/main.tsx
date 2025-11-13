import { StrictMode } from "react";
import { browser, bugs } from "react-dom/package.json";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

console.log("browser", browser);
console.log("bugs", bugs);

const root = createRoot(document.getElementById("root")!);

root.render(<>Hello</>);

root.unmount();
