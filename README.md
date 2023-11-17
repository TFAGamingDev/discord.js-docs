<h1 align="center"> @tfadev/discord.js-docs</h1>

<p align="center">
    <img src="https://img.shields.io/discord/918611797194465280?color=7289da&logo=discord&logoColor=white&label=Discord">
    <img src="https://img.shields.io/npm/v/@tfadev/discord.js-docs.svg?maxAge=3600&logo=npm">
    <img src="https://img.shields.io/npm/dt/@tfadev/discord.js-docs.svg?maxAge=3600&label=Downloads">
</p>

A simple & powerful parser and wrapper for [discord.js](https://github.com/discordjs/discord.js) documentation website. This package uses [axios](https://npmjs.com/package/axios) as the main HTTP requests handler.

## Installation
```sh-session
npm install @tfadev/discord.js-docs axios
```

## Usage

Create a new parser using the class `Docs`. The parameter is based discord.js docs URL, by default it's "**discord.js.org**".

```ts
import { Docs as DiscordJSDocs } from '@tfadev/discord.js-docs';

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
  - `pretty`: (**boolean** - `false`): Make the JSDoc comments pretty; removes brackets (`{` and `}`) and any prefixes starts with `@` (**@link**, **@see**... etc).

```ts
import { DocsUtils } from '@tfadev/discord.js-docs';

DocsUtils.format([...]);

DocsUtils.format([ ..], {
    symbols: {
        classes: 'C',
        functions: 'F',
        ...
    },
    sort: true,
    pretty: true
});
```

## Example

Here is a simple example using the `search` and `format` method.

```ts
import { Docs as DiscordJSDocs, DocsUtils } from '@tfadev/discord.js-docs';

const parser = new DiscordJSDocs();

(async () => {
    const searched = await parser.search('main', 'Channel', { rate: 0.7 });

    const formatted = DocsUtils.format(searched, {
        symbols: {
            classes: 'C',
            typedefs: 'T',
            interfaces: 'I',
            externals: 'E',
            functions: 'F'
        },
        sort: true,
        pretty: true
    }); 

    const result = formatted.map((v) => `[${v.symbol}] ${v.name}`);

    console.log(result);
})();
```

Expected output in terminal:

```ts
[
  '[C] DMChannel',
  '[E] APIChannel',
  '[C] BaseChannel',
  '[C] NewsChannel',
  '[C] TextChannel',
  '[F] channelLink',
  '[E] ChannelType',
  '[C] ForumChannel',
  '[C] GuildChannel',
  '[C] MediaChannel',
  '[C] StageChannel',
  '[C] VoiceChannel',
  '[E] ChannelFlags'
]
```

## Known bugs
- The `url` property (defined in the type `DiscordJSDocsFormatOutput`) has a chance to return an invalid URL, from the both base URLs.

## License
**GNU General Public License v3** ([View here](./LICENSE))