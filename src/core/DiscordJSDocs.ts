import {
    DataTypesStructure,
    DiscordJSDocsAPIJSONOutput,
    DiscordJSDocsJSONOutput,
    SourceURL,
    SourceTypes,
    DiscordJSDocsFormatOutput,
    DiscordJSDocsFormatOptions,
    DiscordJSDocsSearchOptions,
    DiscordJSDocsSearchOutput
} from "../types";
import { compareTwoStrings, fetch as axiosFetch, symbolForDiscord } from "./utils";

export class DiscordJSDocs {
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
     * @param {keyof SourceTypes} source The source name from discord.js docs.
     */
    public fetch(source: 'stable' | 'main' | 'rpc' | 'collection' | 'builders' | 'voice' | 'rest' | 'proxy' | 'ws'): Promise<DiscordJSDocsJSONOutput>;
    public fetch(source: 'next' | 'core' | 'util' | 'formatters'): Promise<DiscordJSDocsAPIJSONOutput>;
    public async fetch(source: keyof SourceTypes): Promise<DiscordJSDocsJSONOutput | DiscordJSDocsAPIJSONOutput> {
        if (!source) throw new Error('\'source\' is a required parameter.');

        const url = SourceURL[source];

        if (!url) throw new TypeError('Invalid discord.js source name.');

        const data = await axiosFetch(url);

        return data;
    };

    /**
     * Search multiple data in array by query from a source name.
     * @param {keyof SourceTypes} source The source name from discord.js docs. 
     * @param {string} query The query for the search.
     * @param {DiscordJSDocsSearchOptions} options Options for the search.
     * @returns 
     */
    public async search(source: keyof SourceTypes, query: string, options?: DiscordJSDocsSearchOptions): Promise<DiscordJSDocsSearchOutput[]> {
        if (!source) throw new Error('\'source\' is a required parameter.');
        if (!query) throw new Error('\'query\' is a required parameter.');

        if (options?.rate && (options.rate > 1 || options.rate <= 0)) throw new TypeError('\'rate\' must be in this following condition: 0 < rate <= 1');

        const url = SourceURL[source];

        if (!url) throw new TypeError('Invalid discord.js source name.');

        const fetched: any = await this.fetch(source as any);

        const similars: DiscordJSDocsSearchOutput[] = [];

        for (const key of Object.keys(fetched)) {
            if (!Array.isArray(fetched[key])) continue;

            if (options?.include && options.include.length > 0 && !options?.include?.some((v) => v === key)) continue;

            for (let i = 0; i < fetched[key].length; i++) {
                const data = fetched[key][i];
                if (!data.name) continue;

                const comparition = compareTwoStrings(query, data.name);

                if (comparition >= (options?.rate || 0.8)) {
                    similars.push({
                        structure: data,
                        key: key,
                        point: comparition
                    });
                };
            };
        };

        if (options?.sort) {
            const sorted = similars.sort((a, b) => b.point - a.point);

            return sorted;
        } else return similars;
    };

    /**
     * Format a search from the parser to a cool well-formatted array for Discord.
     * @param {DiscordJSDocsSearchOutput[]} data The data from the method **search()**.
     * @param {DiscordJSDocsFormatOptions} options Options of the formatter.
     * @returns {DiscordJSDocsFormatOutput[]}
     */
    public format(data: { structure: DataTypesStructure, key: string, point: number }[], options?: DiscordJSDocsFormatOptions): DiscordJSDocsFormatOutput[] {
        // '=== true' because people might use any type in JavaScript, not in TypeScript.
        if (options?.sort === true) data.sort((a, b) => b.point - a.point);

        const output: DiscordJSDocsFormatOutput[] = [];

        for (let i = 0; i < data.length; i++) {
            const splittedURL = data[i].structure.meta?.path?.split('/');

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

            const fileName = data[i].structure?.meta?.file?.split('.')[0];

            output.push({
                symbol: symbolForDiscord(data[i].key, options),
                name: data[i].structure.name || '',
                description: data[i].structure.description || undefined,
                url: data[i].structure.meta?.url ||
                    fileName === data[i].structure.name    
                        ? `https://${this.discordjsUrl}/#/docs/${splittedURL?.at(1) || 'general'}/main/${datatype}/${fileName}`
                        : `https://${this.discordjsUrl}/#/docs/discord.js/main/search?query=` + data[i].structure.name 
            });
        };

        return output;
    };
};
