import { Dictionary } from "./dictionary";
export interface Arguments {
    time: number | string | Date;
    base?: number | string | Date;
    format?: string;
    dictionary?: Dictionary;
}
