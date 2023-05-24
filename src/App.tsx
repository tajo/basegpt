import * as React from "react";
import { Textarea } from "baseui/textarea";
import { Button, SIZE } from "baseui/button";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Spinner } from "baseui/spinner";
import { Heading, HeadingLevel } from "baseui/heading";
import { useChatCompletion } from 'openai-streaming-hooks';
// @ts-expect-error type issues with package version
import type { Model } from 'openai-streaming-hooks/src/types'
// import { MessageStream } from './stream';
import Editor from "./editor";

import View from "./view";

import "./App.css";

const initialPrompt = "This is base web: https://baseweb.design/. You are a coding assistant that will generate base web react code using existing Base Web components. You will receive a prompt that describes the UI and you will output the code to create the UI. Only output the jsx code; do not explain what you are doing or make other comments. The jsx file should export a single function as the default export. All the variables should be defined in the scope of that function. Prefer not to use Stateful components.";

const models: Model[] = ["gpt-4", "gpt-3.5-turbo"]

function App() {
  const [streaming, setStreaming] = React.useState(true);
  const [inputText, setInputText] = React.useState("");
  const [initialCode, setInitialCode] = React.useState(``);
  const [streamingCode, setStreamingCode] = React.useState(``);
  const [model, setModel] = React.useState(models[0]);

  // @ts-expect-error type issues with package version
  const [messages, submitPrompt] = useChatCompletion({
    model,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    temperature: 0.9,
  });

  React.useEffect(() => {
    submitPrompt([{ content: initialPrompt, role: 'system' }])
  }, []);

  React.useEffect(() => {
    // console.log(messages);

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      setStreamingCode(lastMessage.content);

      if (!lastMessage.meta.loading) {
        setStreaming(false);
        setInitialCode(lastMessage.content);
      }
    }
  }, [messages]);

  const loading = messages.length > 0 && messages[messages.length - 1].meta.loading;

  return (
    <React.StrictMode>
      <HeadingLevel>
        <Heading styleLevel={5} $style={{ marginTop: 0 }}>
          BaseGPT
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
              setStreaming(true);
              submitPrompt([{ content: inputText, role: 'user' }])
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
              onChange={(e) => setModel(e.currentTarget.value as Model)}
              name="model"
              align={ALIGN.horizontal}
            >
              <Radio value={models[0]}>GPT4</Radio>
              <Radio value={models[1]} checked>
                GPT3.5
              </Radio>
            </RadioGroup>
          </div>
        </div>

        {/* <MessageStream messages={messages} /> */}

        {streaming ? (
          <div
          style={{
            flex: "1",
            maxWidth: 515,
            paddingRight: "1rem",
            paddingTop: "2rem",
            boxSizing: "border-box",
          }}
        >
            <Editor code={streamingCode} onChange={() => {}} language="tsx" editorProps={{ disabled: true, readOnly: true }} />
          </div>
        ) : (
          <View initialCode={initialCode} />
        )}
      </HeadingLevel>
    </React.StrictMode>
  );
}

export default App;
