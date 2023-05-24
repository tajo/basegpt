import React from "react";
import ReactDOM from "react-dom/client";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightThemeMove, BaseProvider } from "baseui";
import App from "./App.tsx";

const engine = new Styletron();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightThemeMove}>
        <App />
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>
);
