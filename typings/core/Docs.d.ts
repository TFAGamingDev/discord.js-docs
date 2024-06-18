import { BaseURLs, DiscordJSDocsAPIJSONOutput, DiscordJSDocsDefaultJSONOutput, SearchOptions, SearchOutput, Sources } from "../types";
export declare class Docs {
    readonly baseURL: BaseURLs;
    readonly cache?: Map<string, DiscordJSDocsDefaultJSONOutput | DiscordJSDocsAPIJSONOutput>;
    readonly timeout: number;
    constructor(config?: Partial<{
        baseURL: BaseURLs;
        cache: boolean;
        timeout: number;
    }>);
    fetch(source: 'stable' | 'main' | 'rpc' | 'collection' | 'builders' | 'voice' | 'rest' | 'proxy' | 'ws'): Promise<DiscordJSDocsDefaultJSONOutput>;
    fetch(source: 'next' | 'core' | 'util' | 'formatters'): Promise<DiscordJSDocsAPIJSONOutput>;
    fetch(source: Sources): Promise<DiscordJSDocsDefaultJSONOutput & DiscordJSDocsAPIJSONOutput>;
    search(source: Sources, query: string, options?: SearchOptions): Promise<SearchOutput[]>;
    get(source: Sources, query: string): Promise<SearchOutput['structure'] | null>;
    get favicon(): string;
}
