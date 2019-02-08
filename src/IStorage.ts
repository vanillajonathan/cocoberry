import { IExperience as Experience } from "./IExperience";

export interface INewExperience {
    name: string;
    last?: number | null;
    tag?: string;
}

export interface IStorage {
    add(experience: INewExperience): void;
    add_many(experiences: INewExperience[]): void;
    delete(id: string): void;
    get(): Experience[];
    update(experience: Experience): void;
}
