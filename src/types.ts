export type BaseURLs = 'discord.js.org' | 'old.discordjs.dev';

export type Sources = 'stable' | 'main' | 'rpc' | 'collection' | 'builders' | 'voice' | 'rest' | 'next' | 'core' | 'proxy' | 'ws' | 'util' | 'formatters';

export enum SourceURL {
    stable = "https://raw.githubusercontent.com/discordjs/docs/main/discord.js/stable.json",
    main = "https://raw.githubusercontent.com/discordjs/docs/main/discord.js/main.json",
    rpc = "https://raw.githubusercontent.com/discordjs/rpc/docs/master.json",
    collection = "https://raw.githubusercontent.com/discordjs/docs/main/collection/main.json",
    builders = "https://raw.githubusercontent.com/discordjs/docs/main/builders/main.json",
    voice = "https://raw.githubusercontent.com/discordjs/docs/main/voice/main.json",
    rest = "https://raw.githubusercontent.com/discordjs/docs/main/rest/main.json",
    next = "https://raw.githubusercontent.com/discordjs/docs/main/next/main.api.json",
    core = "https://raw.githubusercontent.com/discordjs/docs/main/core/main.api.json",
    proxy = "https://raw.githubusercontent.com/discordjs/docs/main/proxy/main.json",
    ws = "https://raw.githubusercontent.com/discordjs/docs/main/ws/main.json",
    util = "https://raw.githubusercontent.com/discordjs/docs/main/util/main.api.json",
    formatters = "https://raw.githubusercontent.com/discordjs/docs/main/formatters/main.api.json"
};

export enum Source {
    Stable = 'stable',
    Main = 'main',
    RPC = 'rpc',
    Collection = 'collection',
    Builders = 'builders',
    Voice = 'voice',
    REST = 'rest',
    Next = 'next',
    Core = 'core',
    Proxy = 'proxy',
    WS = 'ws',
    Util = 'util',
    Formatters = 'formatters'
};

export type SourceType = {
    stable: DiscordJSDocsDefaultJSONOutput,
    main: DiscordJSDocsDefaultJSONOutput,
    rpc: DiscordJSDocsDefaultJSONOutput,
    collection: DiscordJSDocsDefaultJSONOutput,
    builders: DiscordJSDocsDefaultJSONOutput,
    voice: DiscordJSDocsDefaultJSONOutput,
    rest: DiscordJSDocsDefaultJSONOutput,
    next: DiscordJSDocsAPIJSONOutput, // API Output
    core: DiscordJSDocsAPIJSONOutput, // API Output
    proxy: DiscordJSDocsDefaultJSONOutput,
    ws: DiscordJSDocsDefaultJSONOutput,
    util: DiscordJSDocsAPIJSONOutput, // API Output
    formatters: DiscordJSDocsAPIJSONOutput // API Output
};

// Methods
export interface SearchOptions {
    rate?: number,
    include?: Types[],
    sort?: boolean,
    strict?: boolean,
};

export interface SearchOutput {
    structure: TypesStructure,
    type: string,
    points: number
};

export interface FormatOptions {
    symbols?: {
        classes?: string,
        functions?: string,
        interfaces?: string,
        typedefs?: string,
        externals?: string
    },
    sort?: boolean,
    pretty?: boolean
};

export interface FormatOutput {
    symbol: string,
    name: string,
    description?: string,
    url?: string
};

// API Output
export type Types = 'classes' | 'functions' | 'interfaces' | 'typedefs' | 'externals';

export type TypesStructure = Class & Function & Interface & Typedefs;

export interface DiscordJSDocsDefaultJSONOutput {
    meta?: { generator: string, format: number, date: number },
    classes?: Class[],
    functions?: Function[],
    interfaces?: Interface[],
    typedefs?: Typedefs[],
    externals?: [{ name?: string, see?: [], meta?: { line: number, file: string, path?: string } }],
    custom?: { general?: { name?: string, files?: { welcome?: { name?: string, type?: string, content?: string } } } }
};

export interface DiscordJSDocsAPIJSONOutput {
    metadata: {
        toolPackage: string,
        toolVersion: string,
        schemaVersion: number,
        oldestForwardsCompatibleVersion: number,
        tsDocConfig?: {
            $schema: string,
            noStandardTags: boolean,
            tagDefinition: [],
            supportForTags?: object,
            reportUnsupportedHtmlElements?: boolean
        }
    },
    projectFolderUrl: string,
    kind: string,
    canonicalReference: string,
    docComment: string,
    name: string,
    preserveMemberOrder: boolean,
    members?: [{
        kind: string,
        canonicalReference: string,
        name: string,
        preserveMemberOrder: boolean,
        members: []
    }]
};

export interface Class {
    name: string,
    description?: string,
    implements?: [],
    construct?: { name?: string, params?: [] },
    props?: [{
        name: string,
        description?: string,
        scope: string,
        nullable?: boolean,
        readonly?: boolean,
        type: any[],
        meta: { line: number, file: string, path?: string, url?: string }
    }],
    methods?: [{
        name: string,
        description?: string,
        scope: string,
        params: {
            name: string,
            description?: string,
            type: []
        }[],
        returns: any[],
        meta: { line: number, file: string, path?: string, url?: string }
    }],
    extends?: any[],
    abstract?: boolean,
    events?: [{
        name: string,
        description?: string,
        params?: any[],
        meta: { line: number, file: string, path?: string, url?: string }
    }]
    meta: { line: number, file: string, path?: string, url?: string }
};

export interface Function {
    name: string,
    description?: string,
    scope: string,
    access?: string,
    async?: boolean,
    params?: {
        name: string,
        description?: string,
        type: any[]
    }[],
    returns?: [],
    meta: { line: number, file: string, path?: string, url?: string }
};

export interface Interface {
    name: string,
    description?: string,
    props?: [{
        name: string,
        description?: string,
        scope: string,
        type: any[],
        meta: { line: number, file: string, path?: string, url?: string }
    }],
    methods: [],
    meta: { line: number, file: string, path?: string, url?: string }
};

export interface Typedefs {
    name: string,
    description?: string,
    type: any[],
    props: [{
        name: string,
        description?: string,
        type: any[]
    }],
    meta: { line: number, file: string, path?: string, url?: string }
};