import { v4 as uuid } from "uuid";
import { IStorage, INewExperience } from "./IStorage";
import { IExperience } from "./IExperience";

export class LocalStorage implements IStorage {
    public add(experience: INewExperience): void {
        const experiences = this.get();
        const item: IExperience = {
            id: uuid(),
            last: experience.last,
            name: experience.name,
            tag: experience.tag,
        };
        experiences.push(item);
        localStorage.setItem("experiences", JSON.stringify(experiences));
    }

    public add_many(experiences: INewExperience[]): void {
        const data = this.get();
        for (const experience of experiences) {
            const item: IExperience = {
                id: uuid(),
                last: experience.last,
                name: experience.name,
                tag: experience.tag,
            };
            data.push(item);
        }
        localStorage.setItem("experiences", JSON.stringify(data));
    }

    public delete(id: string): void {
        throw new Error("Method not implemented.");
    }

    public get(): IExperience[] {
        const experiences = localStorage.getItem("experiences");
        if (experiences === null || experiences === "") {
            return [];
        }
        return JSON.parse(experiences);
    }

    public update(experience: IExperience): void {
        throw new Error("Method not implemented.");
    }
}
