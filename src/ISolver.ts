export interface ISolver {
    update(value: number): Promise<string>;
}