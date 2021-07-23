import uuid from "as-uuid";
import { uuid as uuidwasi } from "as-uuid/uuid-wasi";

@external("console", "log")
export declare function log(m: string): void

export function createSomeUuids(): void {
    for (let i = 0; i < 10; i++) {
        createUuid(uuid);
        createUuid(uuidwasi);
    }
}

function createUuid(newUuid: () => string): void {
    const id = newUuid();
    id;
    log("UUID: " + id);
}
