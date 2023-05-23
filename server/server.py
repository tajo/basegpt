import json
import openai
import os
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS


# Load secret key from env variable. Set this with export OPENAI_API_KEY='your-api-key-here'
openai.api_key = os.getenv('OPENAI_API_KEY')

print('Using OpenAI API key: {}'.format(openai.api_key))

app = Flask(__name__)
CORS(app)
api = Api(app)


class GptResponse(Resource):
    def post(self):
        # Get the prompt from the POST request data
        data = request.get_json()
        prompt = data.get('prompt')

        # Check if the prompt is missing in the request
        if not prompt:
            return {'error': 'No prompt provided'}, 400

        # Use the OpenAI API to get a response from GPT-4
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "This is base web: https://baseweb.design/. You are a coding "
                            "assistant that will generate base web react code strictly using Base Web components. You will "
                            "receive a prompt that describes the UI and you will output the "
                            "code to create the UI. Only output the jsx code do not explain "
                            "what you are doing or make other comments. The jsx file should "
                            "export a single function as the default export. All the varibles "
                            " should be defined in the scope of that function. Prefer not use "
                            "Stateful components."
                        ),
                    },
                    {"role": "user", "content": prompt}
                ]
            )
        except Exception as e:
            print('{}'.format(str(e)))
            return {'error': 'Error while getting response from GPT-4: {}'.format(str(e))}, 500

        # Get the response content and remove markdown formatting
        content = response['choices'][0]['message']['content']
        # Remove leading and trailing markdown code fences (```jsx and ```)
        jsx_code = content.strip("`jsx\n ")

        # Return the response in JSON format
        return {'response': jsx_code}


api.add_resource(GptResponse, '/')


def main():
    app.run(debug=True, port=5000)


if __name__ == '__main__':
    main()
