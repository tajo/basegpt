import * as React from "react";
import { Textarea } from "baseui/textarea";
import { Button, SIZE } from "baseui/button";
import { Spinner } from "baseui/spinner";
import { Heading, HeadingLevel } from "baseui/heading";
import View from "./view";

import "./App.css";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(
    "Use BaseWeb to implement a slider that has marks and 20 steps."
  );
  const [initialCode, setInitialCode] =
    React.useState(`import { Slider } from 'baseui/slider';

  export default () => {
    const [value, setValue] = React.useState([10]);
    return (
      <Slider
        value={value}
        onChange={({ value }) => setValue(value)}
        onFinalChange={({ value }) => console.log(value)}
        min={0}
        max={20}
        step={1}
        marks={Array.from({length: 21}, (_, i) => i)}
      />
    );
  }
  `);

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
      {loading ? (
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
