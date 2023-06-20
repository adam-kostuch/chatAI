[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/adam-kostuch/chattie/api)
[![Lifecycle:Stable](https://img.shields.io/badge/Lifecycle-Stable-97ca00)](https://github.com/adam-kostuch/chattie/api)

# Chattie - API

### Table of Contents

- [Chattie - API](#chattie---api)
    - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Router](#router)
    - [Dialogflow](#dialogflow)
      - [Possible requests](#possible-requests)
    - [Authentication](#authentication)
      - [Possible requests](#possible-requests-1)
  - [Installation](#installation)

## Description

The API provides two kind of requests that are supposed to help the authentication and communication with the client that is also available in the repository.

First kind of request is simpler, that contains the Artificial Intelligence (AI) system of communicating. It uses the provided by [Dialogflow](https://cloud.google.com/dialogflow/docs) API key to one of their data gathering system.

The second and last kind of requests contains the authentication system using the [firebase-admin](https://github.com/firebase/firebase-admin-node) package. There are multiple requests for authentication the registration and logging in is mostly handled by the backend (API), but the frontend part also contains logic for signing out and changing password via email link.

## Router

The model of the backend is divided into smaller parts that are build and supported. The parts are actually folders that parts away logic of the code with the actual requests handling. As you may have seen by the paths in `api/src/`, the `controllers` and `routes` folders are the most valuable to the repository.

### Dialogflow


Dialogflow is a natural language understanding (NLU) platform developed by Google. It enables developers to build conversational interfaces such as chatbots and virtual assistants that can understand and respond to user inputs in a natural and human-like manner.

Key features of Dialogflow include:

1. **Intent Recognition**: Dialogflow uses machine learning algorithms to analyze user input and determine the intent or purpose behind it. It allows you to define a set of intents and map them to corresponding actions or responses.

2. **Entity Extraction**: Dialogflow can identify and extract specific information or entities from user input. Entities represent important pieces of information such as names, dates, locations, and more.

3. **Context Management**: Dialogflow supports context management, allowing you to maintain conversational context across multiple user interactions. Context helps the system understand user inputs within the appropriate context and provide relevant responses.

4. **Multi-platform Support**: Dialogflow provides support for various messaging platforms such as Facebook Messenger, Slack, Telegram, and more. It also offers integration with voice platforms like Google Assistant, allowing you to deploy your conversational agents across different channels.

5. **Rich Responses**: Dialogflow enables you to generate dynamic and interactive responses to users. You can provide text responses, as well as more complex responses such as cards, buttons, images, and custom payloads.

6. **Training and Analytics**: Dialogflow provides tools for training and improving your conversational agents. You can analyze user interactions, review performance metrics, and use feedback to enhance the effectiveness and accuracy of your chatbot or virtual assistant.

Dialogflow offers both a graphical interface for building conversational agents and a robust API that allows programmatic access for integration into your applications. It supports multiple programming languages and platforms, making it flexible and accessible for developers.

#### Possible requests

URL: **`POST /ai/`**

Description: _Boop Boop, robot replies!_

Request body:

```json
{ "message": "sample question to AI" }
```

Response:

```json
{ "message": "sample dialogflow agent response" }
```

### Authentication

At the moment there are four possible authentication requests that either retrieve and operate the data or are there just for future purposes, that may or may not happen. The system of authentication is set to be [Googles Firebase](https://firebase.google.com/). This database GUI helps operate with a ton of methods used both on frontend via client and the backend via firebase-admin as mentioned in the description.

#### Possible requests

URL: **`POST /authentication/register`**

Description: _Indicated how good you are to join this amazing website!_

Request body:

```json
{
  "displayName": "your chattie name",
  "email": "email@example.com",
  "password": "SuperHardToCrackPassword123"
}
```

Response - on response the backend redirects you to login page

---

URL: **`POST /authentication/login`**

Description: _Session cookie used to authenticate user across the site._

Request body:

```json
{ "idToken": "idToken-automatically-generated-by-frontend" }
```

Response:

```json
{ "sessionCookie": "session-cookie used to authenticate" }
```

---

URL: **`POST /authentication/signOut`**

Description: _Response sent by server to communicate the success_

Request body - none

Response - none

---

URL: **`POST /authentication/changePassword`**

Description: _Response sent by server with the confirmation of sent email_

Request body - none

Response - none

## Installation

In order to run this API locally you need to firstly be added to both github repo and firebase admin. Once that completed you may ask one of the collaborators to provide you with the credentials to database and the Dialogflow GCP config.

Once completed make sure that you have created the `.env` file with the content below:

```env
PORT=8090
FIREBASE_KEY_ID=...
FIREBASE_KEY=...
DIALOGFLOW_CREDENTIALS={...}
```

The blank fields must be filled with the data provided from one of the collaborators.

After that proceed with the following commands or follow the instructions in the main directory:

```bash
$ cd api && npm install
```

```bash
$ npm run start
```

Enjoy!
