# ed-votingjson

<img src="./resources/icon.png" width=300 >

An Electron based desktop application with React

## What is ED Voting Json Builder

ED Voting Json Builder is a tool designed for ElDewrito server hosts to quickly and easily build a valid voting.json file for their server playlist rotation.

## Minor Warning
running the app installer for the first time may trigger your antivirus, this is a false alert due to the app not being signed, if you have used other electron applications such as the r2modman mod manager this is the same issue. The application is safe but if you feel more comfortable creating your own distributable feel free to fork the repo and either add `workflow_dispatch:` to release.yaml between lines 3 and 4 or create a new branch with the name prefix `releases/` and push to run the workflow.

## Features

- WriteFile output of voting.json files
- Streamlined process automation to build valid json files with minimal user requirements
- Server override commands built into each variant entry

## Planned Future Features
- read/write json functionality to edit already written valid votin.json files


## Known Issues

- Background does not scale to fit on full screen, this was an oversight as the background is offset and wasnt specifically intended to be run fullscreen.
- Sidebar selected gamemodes appear unselected if sidebar is closed and re-opened after adding, this is due to the component being removed from the dom without state being preserved however __gamemodes that were selected are still in selected roation if they are in the main app staging area, selecting them again in the sidebar will remove them__.
- state mutations, this was an accidental oversight and at the current release it should not be an issue, however this will be fixed in a future update.

## Recommended IDE Setup For New Forks

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- [electron-vite documentation](https://electron-vite.org/)

## Pre-requisites

Requires Node.js version 14.18+ and Vite version 3.0+

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
