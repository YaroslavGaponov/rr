import { Resource } from "../index";

export class NumericResource extends Resource<number> {

    constructor() {
        super(0);
    }

    _update(value: number): void {
        this.value = value;
    }

    _take(value: number): void {
        this.value += value;
    }

    _free(value: number): void {
        this.value -= value;
    }
}