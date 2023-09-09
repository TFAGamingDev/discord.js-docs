import { DiscordJSDocsFormatOptions } from '../types';
export declare const fetch: (url: string, method?: string) => Promise<any>;
export declare const compareTwoStrings: (first: string, second: string) => number;
export declare const symbolFormatter: (char: string, custom?: DiscordJSDocsFormatOptions) => string;
export declare const removeJSDocComments: (string: string) => {
    tag: string;
    content: string;
}[];
