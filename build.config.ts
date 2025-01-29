import {defineBuildConfig} from "unbuild";

export default defineBuildConfig({
    entries: [
        "lib/index",
    ],
    clean: true,
    declaration: true,
    rollup: {
        emitCJS: true,
    },
});
