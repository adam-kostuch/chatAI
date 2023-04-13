[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/adam-kostuch/chattie/client)
[![Lifecycle:Stable](https://img.shields.io/badge/Lifecycle-Stable-97ca00)](https://github.com/adam-kostuch/chattie/client)

# Chattie - Client

## Table of Contents

- [Chattie - Client](#chattie---client)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
    - [Design](#design)
  - [Authentication](#authentication)
  - [Installation](#installation)

## Description

This part of the monorepo is set to be created for the client part of the **_chattie_** system. In order to keep the code clean and persistent all across the files we use and standardize the following technology stack:

- React
- Typescript
- MUI

### Design

To showcase our design and the vision for the project see the [Figma design](https://www.figma.com/file/xMPt6sZ3wIuIXV4rqemr5X/chA.tI.?node-id=0-1&t=CgxjEQeDEXphozbG-0) created by [@kinga-kus](https://github.com/kinga-kus):

![figma-welcome](../docs/assets/figma-welcome.png)

## Authentication

In order to properly authenticate user we use the idea of setting the session cookie in local storage (cookies ideally, but it's harsh implementing).

## Installation

In order to install and run chattie client locally you need to run the following or follow the installation guide from the base path:

```bash
$ cd client && npm install
```

```bash
$ npm run start
```

Once completed make sure that you have created the `.env` file with the content below:

```env
REACT_APP_FIREBASE_API_KEY=...
```

Enjoy!
