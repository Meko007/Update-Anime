# Update-Anime

This Node.js script uses Puppeteer to automate the process of updating the "watched" status of anime on MyAnimeList (MAL). It logs into a MAL account, navigates to a specified anime page, and clicks the plus button to mark the anime episode as watched.

## Prerequisites

- Node.js and npm
- Puppeteer
- A MyAnimeList account

## Installation

1. Clone this repository.
2. Run `npm install` to install the dependencies.

## Configuration

Create a `.env` file in the root directory of the project and add the following environment variables:

```
USERNOM=<your MAL username>
PASSWORD=<your MAL password>
```

## Usage

To update the watched status of an anime, run the following command:

```
npm run dev
```


This will open a headless Puppeteer browser, navigate to the specified anime page, log in to your MAL account, and click the plus button.
