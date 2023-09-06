import { DiscordJSDocsDataTypesStructure, DiscordJSDocsObjectOutput, DiscordJSDocsObjectOtherOutput, DiscordJSDocsSources, DocsParserFormatOptions, DocsParserFormattedOutput, DocsParserSearchOptions } from "../types";
export declare class DocsParser {
    readonly discordjsUrl?: 'discord.js.org' | 'old.discordjs.dev';
    /**
    * Create a new parser for discord.js docs API.
    * @param {'discord.js.org' | 'old.discordjs.dev'} discordjsUrlFormat The discord.js URL format. This parameter is important when discord.js is trying to change it's documentation website structure.
    */
    constructor(discordjsUrlFormat?: 'discord.js.org' | 'old.discordjs.dev');
    /**
     * Fetch everything from a source name.
     * @param {keyof DiscordJSDocsSources} source The source name from discord.js docs.
     */
    fetch(source: 'stable' | 'main' | 'rpc' | 'collection' | 'builders' | 'voice' | 'rest' | 'proxy' | 'ws'): Promise<DiscordJSDocsObjectOutput>;
    fetch(source: 'next' | 'core' | 'util' | 'formatters'): Promise<DiscordJSDocsObjectOtherOutput>;
    /**
     * Search multiple data in array by query from a source name.
     * @param {keyof DiscordJSDocsSources} source The source name from discord.js docs.
     * @param {string} query The query for the search.
     * @param {DocsParserSearchOptions} options Options for the search.
     * @returns
     */
    search(source: keyof DiscordJSDocsSources, query: string, options?: DocsParserSearchOptions): Promise<{
        data: DiscordJSDocsDataTypesStructure;
        key: string;
        point: number;
    }[]>;
    /**
     * Format a search from the parser to a cool well-formatted array for Discord.
     * @param {{ data: DiscordJSDocsDataTypesStructure, key: string, point: number }[]} data The data from the method **search()**.
     * @param {DocsParserFormatOptions} options Options of the formatter.
     * @returns
     */
    format(data: {
        data: DiscordJSDocsDataTypesStructure;
        key: string;
        point: number;
    }[], options?: DocsParserFormatOptions): DocsParserFormattedOutput[];
}
