import json
import requests
import argparse


def main():
    # Create an ArgumentParser object
    parser = argparse.ArgumentParser()

    # Add an argument for the user's prompt
    parser.add_argument('prompt', type=str, help='The prompt for the GPT-4 model')

    # Parse the command line arguments
    args = parser.parse_args()

    # Define the endpoint URL
    url = "http://localhost:5000/"

    # Define the headers
    headers = {
        "Content-Type": "application/json",
    }

    # Define the JSON body
    body = {
        "prompt": args.prompt,
    }

    # Make the POST request
    response = requests.post(url, headers=headers, data=json.dumps(body))

    # Check if the request was successful
    if response.status_code == 200:
        # Get the response content
        response_content = response.json()

        # Get the code string
        code_string = response_content["response"]

        # Print the string
        print(code_string)
    else:
        print(f"Request failed with status code: {response.status_code}")


if __name__ == "__main__":
    main()
