import * as React from "react";
import { Textarea } from "baseui/textarea";
import { Button, SIZE } from "baseui/button";
import { Spinner } from "baseui/spinner";
import { Heading, HeadingLevel } from "baseui/heading";
import View from "./view";

import "./App.css";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [initialCode, setInitialCode] = React.useState(``);

  return (
    <HeadingLevel>
      <Heading styleLevel={5} $style={{ marginTop: 0 }}>
        BaseGPT
      </Heading>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Describe the user interface you want to build..."
        clearOnEscape
        overrides={{
          InputContainer: {
            style: () => ({
              height: "70px",
            }),
          },
        }}
      />
      <Button
        onClick={() => {
          setLoading(true);
          fetch("http://localhost:5000", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: value }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              setInitialCode(data.response);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error:", error);
              setLoading(false);
            });
        }}
        size={SIZE.mini}
        overrides={{
          BaseButton: {
            style: () => ({ marginTop: "0.5rem" }),
          },
        }}
      >
        Generate response
      </Button>
      {initialCode === "" && !loading ? null : loading ? (
        <div style={{ width: "120px", margin: "0px auto", paddingTop: "1rem" }}>
          <Spinner $size={SIZE.large} />
        </div>
      ) : (
        <View initialCode={initialCode} />
      )}
    </HeadingLevel>
  );
}

export default App;
