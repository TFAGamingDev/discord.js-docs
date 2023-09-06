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

Create a new parser using the class `DocsParser`. The parameter is based discord.js docs URL, by default it's "**discord.js.org**".

```ts
import { DocsParser } from '@tfadev/discord.js-docs';

const parser = new DocsParser();
```

Get everything from a discord.js docs source.

```ts
await parser.fetch('main');
```

Search from a discord.js docs source some keywords related to the query. In the options of this method, you can set the rate of the similarity between the query and the keyword (By following this condition: 0 < rate ≤ 1), and you can include only specific types like classes, typedefs... etc.

```ts
await parser.search('main', 'Client');

await parser.search('builders', 'SlashCommand', { rate: 0.5 });

await parser.search('voice', 'audio', { include: [...] });
```

Format the keywords from the method **search()**, returns an objects array with some symbols.

```ts
parser.format(...);

parser.format(..., { sortByPoints: true });

parser.format(..., { symbols: { ... } });
```

## Example

Here is a simple example, you can test it out.

```ts
import { DocsParser } from '@tfadev/discord.js-docs';

const main = async () => {
    const parser = new DocsParser();

    const response = await parser.search('main', 'Channel', { rate: 0.7 });

    const formatted = parser.format(response, {
        symbols: {
            classes: 'C',
            typedefs: 'T',
            interfaces: 'I',
            externals: 'E'
        },
        sortByPoints: true
    }); 

    const mapped = formatted.map((element) => `[${element.symbol}] ${element.name}: ${element.description || 'No description'}`);

    console.log(mapped);
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
    '- {@link TextChannel}\n' +
    '- {@link VoiceChannel}\n' +
    '- {@link CategoryChannel}\n' +
    '- {@link NewsChannel}\n' +
    '- {@link StageChannel}\n' +
    '- {@link ForumChannel}',
  '[C] StageChannel: Represents a guild stage channel on Discord.',
  '[C] VoiceChannel: Represents a guild voice channel on Discord.',
  '[E] ChannelFlags: No description'
]
```

## License
**GNU General Public License** ([View here](./LICENSE))