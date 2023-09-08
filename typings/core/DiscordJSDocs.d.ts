import { DataTypesStructure, DiscordJSDocsAPIJSONOutput, DiscordJSDocsJSONOutput, SourceTypes, DiscordJSDocsFormatOutput, DiscordJSDocsFormatOptions, DiscordJSDocsSearchOptions, DiscordJSDocsSearchOutput } from "../types";
export declare class DiscordJSDocs {
    readonly discordjsUrl?: 'discord.js.org' | 'old.discordjs.dev';
    /**
    * Create a new parser for discord.js docs API.
    * @param {'discord.js.org' | 'old.discordjs.dev'} discordjsUrlFormat The discord.js URL format. This parameter is important when discord.js is trying to change it's documentation website structure.
    */
    constructor(discordjsUrlFormat?: 'discord.js.org' | 'old.discordjs.dev');
    /**
     * Fetch everything from a source name.
     * @param {keyof SourceTypes} source The source name from discord.js docs.
     */
    fetch(source: 'stable' | 'main' | 'rpc' | 'collection' | 'builders' | 'voice' | 'rest' | 'proxy' | 'ws'): Promise<DiscordJSDocsJSONOutput>;
    fetch(source: 'next' | 'core' | 'util' | 'formatters'): Promise<DiscordJSDocsAPIJSONOutput>;
    /**
     * Search multiple data in array by query from a source name.
     * @param {keyof SourceTypes} source The source name from discord.js docs.
     * @param {string} query The query for the search.
     * @param {DiscordJSDocsSearchOptions} options Options for the search.
     * @returns
     */
    search(source: keyof SourceTypes, query: string, options?: DiscordJSDocsSearchOptions): Promise<DiscordJSDocsSearchOutput[]>;
    /**
     * Format a search from the parser to a cool well-formatted array for Discord.
     * @param {DiscordJSDocsSearchOutput[]} data The data from the method **search()**.
     * @param {DiscordJSDocsFormatOptions} options Options of the formatter.
     * @returns {DiscordJSDocsFormatOutput[]}
     */
    format(data: {
        structure: DataTypesStructure;
        key: string;
        point: number;
    }[], options?: DiscordJSDocsFormatOptions): DiscordJSDocsFormatOutput[];
}
