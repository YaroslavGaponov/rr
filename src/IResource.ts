export interface IResource<T> {
    update(value: T): void;
    take(value: T): void;
    free(value: T): void;

}