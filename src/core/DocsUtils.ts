import { FormatOptions, FormatOutput, SearchOutput } from "../types";
import Docs from "./Docs";

export default abstract class {
    public static format(searched: SearchOutput[], instance: Docs, options?: FormatOptions) {
        if (options?.sort === true) searched.sort((a, b) => b.points - a.points);

        const output: FormatOutput[] = [];

        for (let i = 0; i < searched.length; i++) {
            const splittedURL = searched[i].structure.meta?.path?.split('/');

            let datatype = 'General';

            switch (searched[i].type) {
                case 'classes': {
                    datatype = 'Class';
                    break;
                };

                case 'functions': {
                    datatype = 'Function';
                    break;
                };

                case 'typedefs': {
                    datatype = 'Typedef';
                    break;
                };

                default: {
                    datatype = 'General';
                    break;
                };
            };

            const fileName = searched[i].structure?.meta?.file?.split('.')[0];

            const removeJSDocsComments = (string: string): { tag: string, content: string }[] => {
                const regex = /{@([a-zA-Z]+)(?: (.*?))?(?:}|\n)/g;
            
                const tagArray: { tag: string, content: string }[] = [];
                let match;
            
                while ((match = regex.exec(string)) !== null) {
                    const tag = match[1];
                    const content = match[2];
                    
                    tagArray.push({ tag, content });
                };
            
                return tagArray;
            };

            let description = '';
            if (options?.pretty) description = removeJSDocsComments(searched[i].structure.description || '').map((v) => `- ${v.content}`).join('\n');

            output.push({
                symbol: this.symbol(searched[i].type, options),
                name: searched[i].structure.name || '',
                description: options?.pretty ? (description.length <= 0 ? undefined : description) : (searched[i].structure.description || undefined),
                url: this.parseURL(searched[i].structure),
            });
        };

        return output;
    };

    public static symbol(type: string, options?: FormatOptions) {
        switch (type) {
            case 'classes': return options?.symbols?.classes || `:regional_indicator_c:`;
            case 'functions': return options?.symbols?.functions || `:regional_indicator_f:`;
            case 'interfaces': return options?.symbols?.interfaces || `:regional_indicator_i:`;
            case 'typedefs': return options?.symbols?.typedefs || `:regional_indicator_t:`;
            case 'externals': return options?.symbols?.externals || `:regional_indicator_e:`;
            default: return '';
        };
    };

    public static parseURL(structure: SearchOutput['structure']) {
        if (structure.meta?.url) return structure.meta.url;

        const meta = structure.meta;

        if (!meta.path || !meta.file || !meta.line) return undefined;

        return `https://github.com/discordjs/discord.js/tree/main/${meta.path}/${meta.file}#L${meta.line}`;
    };
};