import axios from 'axios';
import {
    DiscordJSDocsFormatOptions
} from '../types';

export const fetch = async (url: string, method?: string) => {
    const fetched = await axios(url, {
        method: method || 'GET'
    });

    return fetched.data;
};

// Original source from 'string-similarity'
export const compareTwoStrings = (first: string, second: string) => {
    first = first?.replace(/\s+/g, '')
    second = second?.replace(/\s+/g, '')

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
        const bigram = first.substring(i, i + 2);
        const count = firstBigrams.has(bigram)
            ? firstBigrams.get(bigram) + 1
            : 1;

        firstBigrams.set(bigram, count);
    };

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
        const bigram = second.substring(i, i + 2);
        const count = firstBigrams.has(bigram)
            ? firstBigrams.get(bigram)
            : 0;

        if (count > 0) {
            firstBigrams.set(bigram, count - 1);
            intersectionSize++;
        }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
};

export const symbolFormatter = (char: string, custom?: DiscordJSDocsFormatOptions) => {
    switch (char) {
        case 'classes': {
            return custom?.symbols?.classes || `:regional_indicator_c:`;
        };

        case 'functions': {
            return custom?.symbols?.functions || `:regional_indicator_f:`;
        };

        case 'interfaces': {
            return custom?.symbols?.interfaces || `:regional_indicator_i:`;
        };

        case 'typedefs': {
            return custom?.symbols?.typedefs || `:regional_indicator_t:`;
        };

        case 'externals': {
            return custom?.symbols?.externals || `:regional_indicator_e:`;
        };

        default: {
            return '';
        };
    };
};

export const removeJSDocComments = (string: string): { tag: string, content: string }[] => {
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