import { Experience } from "./experience";

export interface AppStorage {
    add(experience: Experience): void;
    add_many(experience: Experience[]): void;
    delete(id: string): void;
    get(): Experience[];
    update(experience: Experience): void;
}