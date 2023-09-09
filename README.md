<h1 align="center"> @tfadev/discord.js-docs</h1>

<p align="center">
    <img src="https://img.shields.io/discord/918611797194465280?color=7289da&logo=discord&logoColor=white&label=Discord">
    <img src="https://img.shields.io/npm/v/@tfadev/discord.js-docs.svg?maxAge=3600&logo=npm">
    <img src="https://img.shields.io/npm/dt/@tfadev/discord.js-docs.svg?maxAge=3600&label=Downloads">
</p>

A simple & powerful parser and wrapper for [discord.js](https://github.com/discordjs/discord.js) documentation website. This library uses [axios](https://npmjs.com/package/axios) for the HTTP requests.

## Installation
```sh-session
npm install @tfadev/discord.js-docs axios
```

## Usage

Create a new parser using the class `DiscordJSDocs`. The parameter is based discord.js docs URL, by default it's "**discord.js.org**".

```ts
import { DiscordJSDocs } from '@tfadev/discord.js-docs';

const parser = new DiscordJSDocs();
```

### Fetch from a source:

Get everything from a discord.js docs source using the method **fetch()**.

```ts
await parser.fetch('main');
```

### Search from a source by query:

The method to do this job is **search()**.

The options of this method:
  - `rate` (**number** - `0.8`): The rate of similarity of the keyword and the query, must be in this following condition: 0 < rate ≤ 1
  - `include` (**KeywordTypes[]** - `undefined`): Include single or multiple specific types, like classex, typedefs... etc
  - `sort` (**boolean** - `false`): Sort the response by points of each keyword or not?
  - `strict` (**boolean** - `false`): Enable strict mode; The keyword and the query must be exactly similar (not similar to `rate: 1`).

```ts
await parser.search('main', 'Client');

await parser.search('builders', 'SlashCommand', {
    rate: 0.5
    include: [
        'classes',
        'typedefs',
        ...
    ],
    sort: false,
    strict: true
});
```

### Get a keyword's data:

To get a keyword's data (such as class properties, functions... etc), use **get()** method. If the keyword is not found, it will return `null`.

```ts
await parser.get('main', 'Client');
```

### Format searched data:

Format the keywords using the method **search()**, it will return an objects array with some symbols.

The options of this method:
  - `symbols` (**object** - `{}`): Set the symbols of each keyword's type.
  - `sort` (**boolean** - `false`): Sort the response by points of each keyword or not?
  - `clearJSDocComments`: (**boolean** - `false`): Make the JSDoc comments pretty; Removing brackets (`{` and `}`) and any prefixes starts with `@` (Example: `@link`).

```ts
parser.format(...);

parser.format(..., {
    symbols: {
        classes: 'C',
        interfaces: 'I',
        ...
      },
    sort: true,
    clearJSDocComments: false
});
```

## Example

Here is a simple example, you can test it out.

```ts
import { DiscordJSDocs } from '@tfadev/discord.js-docs';

const parser = new DiscordJSDocs();

const main = async (): Promise<void> => {
    const response = await parser.search('main', 'Channel', { rate: 0.7 });

    const formatted = parser.format(response, {
        symbols: {
            classes: 'C',
            typedefs: 'T',
            interfaces: 'I',
            externals: 'E'
        },
        sort: true,
        clearJSDocComments: true
    }); 

    const mapped = formatted.map((key) => `[${key.symbol}] ${key.name}: ${key.description || 'No description'}`);

    console.log(mapped);

    return;
};

main();
```

Expected output:

```ts
[
  '[C] DMChannel: Represents a direct message channel between two users.',
  '[E] APIChannel: No description',
  '[C] BaseChannel: Represents any channel on Discord.',
  '[C] NewsChannel: Represents a guild news channel on Discord.',
  '[C] TextChannel: Represents a guild text channel on Discord.',
  '[E] ChannelType: No description',
  '[C] ForumChannel: Represents a channel that only contains threads',
  '[C] GuildChannel: Represents a guild channel from any of the following:\n' +
    '- TextChannel\n' +
    '- VoiceChannel\n' +
    '- CategoryChannel\n' +
    '- NewsChannel\n' +
    '- StageChannel\n' +
    '- ForumChannel',
  '[C] StageChannel: Represents a guild stage channel on Discord.',
  '[C] VoiceChannel: Represents a guild voice channel on Discord.',
  '[E] ChannelFlags: No description'
]
```

## License
**GNU General Public License** ([View here](./LICENSE))