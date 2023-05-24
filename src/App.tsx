import * as React from "react";
import { Textarea } from "baseui/textarea";
import { Button, KIND, SIZE } from "baseui/button";
import { Input } from "baseui/input";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Spinner } from "baseui/spinner";
import { Heading, HeadingLevel } from "baseui/heading";
import { useChatCompletion } from "openai-streaming-hooks";
// @ts-expect-error type issues with package version
import type { Model } from "openai-streaming-hooks/src/types";
import Editor from "./editor";
import Logo from "./logo";

import View from "./view";

import "./App.css";

const initialPrompt =
  "This is base web: https://baseweb.design/. You are a coding assistant that will generate base web react code using existing Base Web components. You will receive a prompt that describes the UI and you will output the code to create the UI. Only output the jsx code; do not explain what you are doing or make other comments. The jsx file should export a single function as the default export. All the variables should be defined in the scope of that function. Here is your first prompt: ";

const models: Model[] = ["gpt-4", "gpt-3.5-turbo"];

function App() {
  const [streaming, setStreaming] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [promptHistory, setPromptHistory] = React.useState([]);
  const [initialCode, setInitialCode] = React.useState(``);
  const [streamingCode, setStreamingCode] = React.useState(``);
  const [model, setModel] = React.useState(models[0]);
  const [apikey, setApikey] = React.useState(
    localStorage.getItem("openai_api_key")
  );

  const [messages, submitPrompt] = useChatCompletion({
    model,
    apiKey: apikey,
    temperature: 0.9,
  });

  React.useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      setStreamingCode(lastMessage.content);

      if (!lastMessage.meta.loading) {
        setStreaming(false);
        setInitialCode(lastMessage.content);
      }
    }
  }, [messages]);

  const loading =
    messages.length > 0 && messages[messages.length - 1].meta.loading;

  return (
    <React.StrictMode>
      <HeadingLevel>
        <Heading styleLevel={3} $style={{ marginTop: 0 }}>
          <Logo />
        </Heading>
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
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
            disabled={loading}
            isLoading={loading}
            onClick={() => {
              if (apikey === null || apikey === "") {
                alert("Please enter an OpenAI API key first");
                return;
              }
              setStreaming(true);
              let prompts = promptHistory;
              if (prompts.length > 20) {
                prompts.shift();
              }
              prompts = prompts.concat({ content: inputText, role: "user" });
              setPromptHistory(prompts);
              console.log(prompts);
              submitPrompt([
                { content: initialPrompt, role: "system" },
                ...prompts,
              ]);
            }}
            size={SIZE.mini}
            overrides={{
              BaseButton: {
                style: () => ({ marginTop: "0.5rem" }),
              },
            }}
          >
            Generate
          </Button>
          <Button
            onClick={() => {
              window.location.reload();
            }}
            size={SIZE.mini}
            kind={KIND.secondary}
            overrides={{
              BaseButton: {
                style: () => ({ marginTop: "0.5rem", marginLeft: "0.5rem" }),
              },
            }}
          >
            Reset Context ({promptHistory.length})
          </Button>
          <div style={{ paddingTop: 6, marginLeft: "1rem" }}>
            <RadioGroup
              disabled={loading}
              value={model}
              onChange={(e) => setModel(e.currentTarget.value as Model)}
              name="model"
              align={ALIGN.horizontal}
            >
              <Radio value={models[0]}>GPT-4</Radio>
              <Radio value={models[1]} checked>
                GPT-3.5
              </Radio>
            </RadioGroup>
          </div>
          <div style={{ paddingTop: 8, marginLeft: "1rem" }}>
            <Input
              value={apikey}
              onChange={(e) => {
                localStorage.setItem("openai_api_key", e.target.value);
                setApikey(e.target.value);
                // openai-stream-hooks doesn't update key without relaoding?
                window.location.reload();
              }}
              size={SIZE.mini}
              type="password"
              placeholder="OpenAI API key"
              clearOnEscape
            />
          </div>
        </div>
        {streaming ? (
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <div
              style={{
                flex: "1",
                maxWidth: 515,
                paddingRight: "1rem",
                paddingTop: "2rem",
                boxSizing: "border-box",
              }}
            >
              <Editor
                code={streamingCode}
                onChange={() => null}
                language="tsx"
                editorProps={{ disabled: true, readOnly: true }}
              />
            </div>
            <div
              style={{
                flex: "1",
                display: "flex",
                alignItems: "center",
                marginTop: "2rem",
                justifyContent: "center",
                paddingLeft: "1rem",
                boxSizing: "border-box",
              }}
            >
              <Spinner />
            </div>
          </div>
        ) : initialCode ? (
          <View initialCode={initialCode} />
        ) : null}
      </HeadingLevel>
    </React.StrictMode>
  );
}

export default App;
