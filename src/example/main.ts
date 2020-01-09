import { loadavg, cpus } from "os";
import { NumericResource } from "./NumericResource";
import { SimpleSolver } from "./SimpleSolver";

const cpuResource = new NumericResource();

const rangeSolver = new SimpleSolver()
    .rule("cpu:low", q => (q <= 0.3))
    .rule("cpu:medium", q => (q > 0.3 && q < 0.7))
    .rule("cpu:high", q => q >= 0.7);


cpuResource.pipe(rangeSolver).on("data", data => console.log(`${data.state} (${data.value})`))

setInterval(() => cpuResource.update(loadavg()[0] / cpus().length), 100);

