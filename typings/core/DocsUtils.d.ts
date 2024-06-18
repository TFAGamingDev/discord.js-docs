import { FormatOptions, FormatOutput, SearchOutput } from "../types";
export declare abstract class DocsUtils {
    static format(searched: SearchOutput[], options?: FormatOptions): FormatOutput[];
    static symbol(type: string, options?: FormatOptions): string;
    static parseURL(structure: SearchOutput['structure']): string | undefined;
}
