import { Readable } from "stream";
import { IResource } from "./IResource";

export abstract class Resource<T> extends Readable implements IResource<T> {

    private n: number = 0;

    constructor(public value: T) {
        super({ objectMode: true });
    }

    _read(size: number) {
        this.n += size;
    }

    _notify() {
        if (this.n > 0) {
            this.n--;
            this.push({ value: this.value });
        }
    }

    update(value: T): void {
        this._update(value);
        this._notify();
    }

    take(value: T): void {
        this._take(value);
        this._notify();
    }

    free(value: T): void {
        this._free(value);
        this._notify();
    }


    abstract _update(value: T): void;
    abstract _take(value: T): void;
    abstract _free(value: T): void;

}