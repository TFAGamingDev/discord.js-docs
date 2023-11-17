import { axiosFetch, compare } from "../functions";
import { BaseURLs, DiscordJSDocsAPIJSONOutput, DiscordJSDocsDefaultJSONOutput, SearchOptions, SearchOutput, SourceURL, Sources } from "../types";

export default class {
    public readonly baseURL: BaseURLs = 'discord.js.org';
    public readonly cache?: Map<string, DiscordJSDocsDefaultJSONOutput | DiscordJSDocsAPIJSONOutput>;
    public readonly timeout: number = 15000;

    constructor(config?: Partial<{ baseURL: BaseURLs, cache: boolean, timeout: number }>) {
        if (config?.baseURL) this.baseURL = config.baseURL;
        if (config?.cache) this.cache = new Map();
        if (config?.timeout) this.timeout = config.timeout;
    };

    public fetch(source: 'stable' | 'main' | 'rpc' | 'collection' | 'builders' | 'voice' | 'rest' | 'proxy' | 'ws'): Promise<DiscordJSDocsDefaultJSONOutput>;
    public fetch(source: 'next' | 'core' | 'util' | 'formatters'): Promise<DiscordJSDocsAPIJSONOutput>;
    public fetch(source: Sources): Promise<DiscordJSDocsDefaultJSONOutput & DiscordJSDocsAPIJSONOutput>;
    public async fetch(source: Sources): Promise<DiscordJSDocsDefaultJSONOutput | DiscordJSDocsAPIJSONOutput> {
        const url = SourceURL[source];

        const data = await axiosFetch(url, this.timeout);

        if (this.cache) {
            for (const type of Object.keys(data)) {
                if (!Array.isArray(data[type])) continue;

                for (let i = 0; i < data[type].length; i++) {
                    const struc = data[type][i];
                    if (!struc.name) continue;

                    this.cache.set(struc.name, struc);
                };
            };
        };

        return data;
    };

    public async search(source: Sources, query: string, options?: SearchOptions): Promise<SearchOutput[]> {
        const fetched: any = await this.fetch(source);

        const similars: SearchOutput[] = [];

        for (const type of Object.keys(fetched)) {
            if (!Array.isArray(fetched[type])) continue;

            if (options?.include && options.include.length > 0 && !options.include.some((v) => v === type)) continue;

            for (let i = 0; i < fetched[type].length; i++) {
                const data = fetched[type][i];
                if (!data.name) continue;

                const comparition = compare(options?.strict ? query : query.toLowerCase(), options?.strict ? data.name : `${data.name}`.toLowerCase());

                if (comparition >= (options?.rate || 0.8)) {
                    similars.push({
                        structure: data,
                        type: type,
                        points: options?.strict ? comparition : parseFloat(comparition.toFixed(3))
                    });
                };
            };
        };

        if (options?.sort) {
            const sorted = similars.sort((a, b) => b.points - a.points);

            return sorted;
        } else return similars;
    };

    public async get(source: Sources, query: string): Promise<SearchOutput['structure'] | null> {
        const res = await this.search(source, query, { sort: true });

        if (res.length <= 0) return null;

        return res[0].structure;
    };
    
    public get favicon() {
        return 'https://avatars.githubusercontent.com/u/26492485?s=200&v=4';
    };
};
