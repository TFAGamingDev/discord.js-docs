import { FormatOptions, FormatOutput, SearchOutput } from "../types";
import Docs from "./Docs";
export default abstract class {
    static format(searched: SearchOutput[], instance: Docs, options?: FormatOptions): FormatOutput[];
    static symbol(type: string, options?: FormatOptions): string;
    static parseURL(structure: SearchOutput['structure']): string | undefined;
}
