import { DataTypesStructure, DiscordJSDocsAPIJSONOutput, DiscordJSDocsJSONOutput, SourceTypes, DiscordJSDocsFormatOutput, DiscordJSDocsFormatOptions, DiscordJSDocsSearchOptions, DiscordJSDocsSearchOutput } from "../types";
export declare class DiscordJSDocs {
    readonly baseURL?: 'discord.js.org' | 'old.discordjs.dev';
    /**
    * Create a new parser for discord.js docs API.
    * @param {'discord.js.org' | 'old.discordjs.dev'} baseURL The discord.js URL format. This parameter is important when discord.js is trying to change it's documentation website structure.
    */
    constructor(baseURL?: 'discord.js.org' | 'old.discordjs.dev');
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
     * @returns {Promise<DiscordJSDocsSearchOutput[]>}
     */
    search(source: keyof SourceTypes, query: string, options?: DiscordJSDocsSearchOptions): Promise<DiscordJSDocsSearchOutput[]>;
    /**
     * Get a discord.js docs keyword's data by query, has similar options to the method **search**.
     *
     * You can use the example below instead of this method:
     * ```ts
     * const res = await [parser].search(...);
     *
     * res[0];
     * ```
     * @param {keyof SourceTypes} source The source name from discord.js docs.
     * @param {string} keyword The query for the search.
     * @param {DiscordJSDocsSearchOptions} options Options for the search.
     * @returns {Promise<DiscordJSDocsSearchOutput | null>}
     */
    get(source: keyof SourceTypes, keyword: string): Promise<DiscordJSDocsSearchOutput['structure'] | null>;
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
    get repositoryURL(): string;
    get organizationURL(): string;
    get favicon(): string;
}
