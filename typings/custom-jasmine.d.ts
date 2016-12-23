declare module jasmine {
    interface Matchers {
        toHaveCssClass(expected: string): boolean;
        toHaveTextContent(expected: string): boolean;
    }
}
