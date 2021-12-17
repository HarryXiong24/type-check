interface TypeOption<T = unknown> {
    type: string | string[];
    enum?: T[];
    additional?: T[];
}
declare const checkType: <T = unknown>(variable: T, type: string | string[] | TypeOption<T>, variableName?: string) => boolean;
declare const checkKeys: <T = unknown>(obj: T, config: Record<string, string[] | string | TypeOption>, objName?: string) => boolean;

export { TypeOption, checkKeys, checkType };
//# sourceMappingURL=index.d.ts.map
