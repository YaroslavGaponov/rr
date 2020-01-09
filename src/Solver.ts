import { ISolver } from "./ISolver";
import { Transform } from "stream";

export abstract class Solver extends Transform implements ISolver {

    private state: string;

    constructor() {
        super({ objectMode: true });
    }

    async _transform(data: any, encoding: string, callback: Function) {
        const state = await this.update(data.value);
        if (state !== this.state) {
            this.push({
                value: data.value,
                state: this.state = state
            });
        }
        callback();
    }

    abstract update(value: number): Promise<string>;

}