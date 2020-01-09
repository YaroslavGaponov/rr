rr
========================
resource managment library

# Example

## Simple numeric observable resource

```js
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
```

## Simple rule based solver

```js

interface IRule {
    (value: number): boolean;
}

export class SimpleSolver extends Solver {

    private rules: Map<string, IRule> = new Map();

    constructor(private def_state?: string) {
        super();
    }

    rule(state: string, fn: IRule): this {
        this.rules.set(state, fn);
        return this;
    }

    async update(value: number): Promise<string> {
        for (let [state, rule] of this.rules) {
            if (rule(value)) {
                return state;
            }
        }
        return this.def_state;
    }

}
```

## All together

```js
import { loadavg, cpus } from "os";

const cpuResource = new NumericResource();

const rangeSolver = new SimpleSolver()
    .rule("cpu:low", q => (q <= 0.3))
    .rule("cpu:medium", q => (q > 0.3 && q < 0.7))
    .rule("cpu:high", q => q >= 0.7);


cpuResource.pipe(rangeSolver).on("data", data => console.log(`${data.state} (${data.value})`))

setInterval(() => cpuResource.update(loadavg()[0] / cpus().length), 100);
```

Result

```output
cpu:low (0.123046875)
cpu:medium (0.3018798828125)
cpu:high (0.751708984375)
cpu:medium (0.646728515625)
```

