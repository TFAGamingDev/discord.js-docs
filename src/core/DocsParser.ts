import {
    DiscordJSDocsDataTypesStructure,
    DiscordJSDocsObjectOutput,
    DiscordJSDocsObjectOtherOutput,
    DiscordJSDocsSourceURLs,
    DiscordJSDocsSources,
    DocsParserFormatOptions,
    DocsParserFormattedOutput,
    DocsParserSearchOptions
} from "../types";
import { compareTwoStrings, fetch as axiosFetch, symbolForDiscord } from "./utils";

export class DocsParser {
    public readonly discordjsUrl?: 'discord.js.org' | 'old.discordjs.dev' = 'discord.js.org';

    /**
    * Create a new parser for discord.js docs API.
    * @param {'discord.js.org' | 'old.discordjs.dev'} discordjsUrlFormat The discord.js URL format. This parameter is important when discord.js is trying to change it's documentation website structure.
    */
    constructor(discordjsUrlFormat?: 'discord.js.org' | 'old.discordjs.dev') {
        this.discordjsUrl = discordjsUrlFormat;
    };

    /**
     * Fetch everything from a source name.
     * @param {keyof DiscordJSDocsSources} source The source name from discord.js docs.
     */
    public fetch(source: 'stable' | 'main' | 'rpc' | 'collection' | 'builders' | 'voice' | 'rest' | 'proxy' | 'ws'): Promise<DiscordJSDocsObjectOutput>;
    public fetch(source: 'next' | 'core' | 'util' | 'formatters'): Promise<DiscordJSDocsObjectOtherOutput>;
    public async fetch(source: keyof DiscordJSDocsSources): Promise<DiscordJSDocsObjectOutput | DiscordJSDocsObjectOtherOutput> {
        if (!source) throw new Error('\'source\' is a required parameter.');

        const url = DiscordJSDocsSourceURLs[source];

        if (!url) throw new TypeError('Invalid discord.js source name.');

        const data = await axiosFetch(url);

        return data;
    };

    /**
     * Search multiple data in array by query from a source name.
     * @param {keyof DiscordJSDocsSources} source The source name from discord.js docs. 
     * @param {string} query The query for the search.
     * @param {DocsParserSearchOptions} options Options for the search.
     * @returns 
     */
    public async search(source: keyof DiscordJSDocsSources, query: string, options?: DocsParserSearchOptions): Promise<{ data: DiscordJSDocsDataTypesStructure; key: string; point: number; }[]> {
        if (!source) throw new Error('\'source\' is a required parameter.');
        if (!query) throw new Error('\'query\' is a required parameter.');

        if (options?.rate && (options.rate > 1 || options.rate <= 0)) throw new TypeError('\'rate\' must be in this following condition: 0 < rate <= 1')

        const url = DiscordJSDocsSourceURLs[source];

        if (!url) throw new TypeError('Invalid discord.js source name.');

        const fetched: any = await this.fetch(source as any);

        const similars: { data: DiscordJSDocsDataTypesStructure, key: string, point: number }[] = [];

        for (const key of Object.keys(fetched)) {
            if (!Array.isArray(fetched[key])) continue;

            if (options?.include && options.include.length > 0 && !options?.include?.some((v) => v === key)) continue;

            for (let i = 0; i < fetched[key].length; i++) {
                const data = fetched[key][i];
                if (!data.name) continue;

                const comparition = compareTwoStrings(query, data.name);

                if (comparition >= (options?.rate || 0.8)) {
                    similars.push({
                        data: data,
                        key: key,
                        point: comparition
                    });
                };
            };
        };

        return similars;
    };

    /**
     * Format a search from the parser to a cool well-formatted array for Discord.
     * @param {{ data: DiscordJSDocsDataTypesStructure, key: string, point: number }[]} data The data from the method **search()**.
     * @param {DocsParserFormatOptions} options Options of the formatter.
     * @returns 
     */
    public format(data: { data: DiscordJSDocsDataTypesStructure, key: string, point: number }[], options?: DocsParserFormatOptions) {
        // '=== true' because people might use any type in JavaScript, not TypeScript.
        if (options?.sortByPoints === true) data.sort((a, b) => b.point - a.point);

        const output: DocsParserFormattedOutput[] = [];

        for (let i = 0; i < data.length; i++) {
            const splittedURL = data[i].data.meta?.path?.split('/');

            let datatype = 'general';

            switch (data[i].key) {
                case 'classes': {
                    datatype = 'class';
                    break;
                };

                case 'functions': {
                    datatype = 'function';
                    break;
                };

                case 'typedefs': {
                    datatype = 'typedef';
                    break;
                };
                
                default: {
                    datatype = 'general';
                    break;
                };
            };

            const fileName = data[i].data?.meta?.file?.split('.')[0];

            output.push({
                symbol: symbolForDiscord(data[i].key, options),
                name: data[i].data.name || '',
                description: data[i].data.description || undefined,
                url: data[i].data.meta?.url ||
                    fileName === data[i].data.name    
                        ? `https://${this.discordjsUrl}/#/docs/${splittedURL?.at(1) || 'general'}/main/${datatype}/${fileName}`
                        : `https://${this.discordjsUrl}/#/docs/discord.js/main/search?query=` + data[i].data.name 
            });
        };

        return output;
    };
};
