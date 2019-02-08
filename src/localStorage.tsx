import uuid from "uuid/v4";
import { IStorage, INewExperience as NewExperience } from "./IStorage";
import { IExperience as Experience } from "./IExperience";

export class LocalStorage implements IStorage {
    public add(experience: NewExperience): void {
        const experiences = this.get();
        const item: Experience = {
            id: uuid(),
            name: experience.name,
            last: experience.last,
            tag: experience.tag,
        };
        experiences.push(item);
        localStorage.setItem("experiences", JSON.stringify(experiences));
    }

    public add_many(experiences: NewExperience[]): void {
        const data = this.get();
        for (const experience of experiences) {
            const item: Experience = {
                id: uuid(),
                name: experience.name,
                last: experience.last,
                tag: experience.tag,
            };
            data.push(item);
        }
        localStorage.setItem("experiences", JSON.stringify(data));
    }

    public delete(id: string): void {
        throw new Error("Method not implemented.");
    }

    public get(): Experience[] {
        const experiences = localStorage.getItem("experiences");
        if (experiences === null) {
            return [];
        }
        return JSON.parse(experiences);
    }

    public update(experience: Experience): void {
        throw new Error("Method not implemented.");
    }
}