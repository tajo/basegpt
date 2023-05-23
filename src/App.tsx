import * as React from "react";
import { Textarea } from "baseui/textarea";
import { Button, SIZE } from "baseui/button";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Spinner } from "baseui/spinner";
import { Heading, HeadingLevel } from "baseui/heading";
import View from "./view";

import "./App.css";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [initialCode, setInitialCode] = React.useState(``);
  const [model, setModel] = React.useState("gpt-3.5-turbo");

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
      <div style={{ display: "flex" }}>
        <Button
          onClick={() => {
            setLoading(true);
            fetch("http://localhost:5000", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt: value, model }),
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
        <div style={{ paddingTop: 6, marginLeft: "1rem" }}>
          <RadioGroup
            value={model}
            onChange={(e) => setModel(e.currentTarget.value)}
            name="model"
            align={ALIGN.horizontal}
          >
            <Radio value="gpt-4">GPT4</Radio>
            <Radio value="gpt-3.5-turbo" checked>
              GPT3.5
            </Radio>
          </RadioGroup>
        </div>
      </div>

      {initialCode === "" && !loading ? (
        <span />
      ) : loading ? (
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
