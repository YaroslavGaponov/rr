import { Solver } from "../Solver";

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