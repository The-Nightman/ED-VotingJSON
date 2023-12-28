# ed-votingjson

<img src="./resources/icon.png" width=300 >

An Electron based desktop application with React

## What is ED Voting Json Builder

ED Voting Json Builder is a tool designed for ElDewrito server hosts to quickly and easily build a valid voting.json file for their server playlist rotation.

## Minor Warning

running the app installer for the first time may trigger your antivirus, this is a false alert due to the app not being signed, if you have used other electron applications such as the r2modman mod manager this is the same issue. The application is safe but if you feel more comfortable creating your own distributable feel free to fork the repo and either add `workflow_dispatch:` to release.yaml between lines 3 and 4 or create a new branch with the name prefix `releases/` and push to run the workflow.

## How To Use 

:warning: [(Please Read Current Known Issues First)](https://github.com/The-Nightman/ED-VotingJSON#known-issues)

1. Click the open folder button in the top left corner to open a select directory dialog and navigate to your ElDewrito install folder and select the mods folder that should contain 2 folders named `maps` and `variants` respectively.
 - the end of this filepath should be `.../Eldewrito 0.6/mods`

2. Open the sidebar on the right of the application and select the checkboxes that apply to the gamemodes you want in your rotation.

3. Close the sidebar and in the main area of the app you will see a list of selected gamemodes and options for each, select the server overrides you wish to apply to that gamemode and then select the maps you wish to play and then click the OK button to the right of the gamemode name. Feel free to repeat this step as many times as needed whenever a change is made. 

4. Once you are happy with your rotation click the save button in the top right of the app and save the `voting.json` file in the `.../Eldewrito 0.6/mods/server` folder.

5. You should now be able to launch your server with your new playlist rotation in your `voting.json` file.

## Features

- WriteFile output of voting.json files
- Streamlined process automation to build valid json files with minimal user requirements
- Server override commands built into each variant entry

## Planned Future Features
- read/write json functionality to edit already written valid voting.json files


## Known Issues

- At the moment there are no known issues, if you happen to find one please open a BUG ticket with the provided template in the issues tab.

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
