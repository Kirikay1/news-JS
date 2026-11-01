export function queryElement<T extends Element>(selector: string, parent: ParentNode = document): T {
    const element: T | null = parent.querySelector<T>(selector);
    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }
    return element;
}
