import { AppStorage } from "./appStorage";
import { Experience } from "./experience";

export class LocalStorage implements AppStorage {
    add(experience: Experience): void {
        const experiences = this.get();
        experiences.push(experience);
        localStorage.setItem('experiences', JSON.stringify(experiences));
    }

    add_many(experiences: Experience[]): void {
        const data = this.get();
        for (const experience of experiences) {
            data.push(experience);
        }
        localStorage.setItem('experiences', JSON.stringify(data));
    }

    delete(id: string): void {
        throw new Error("Method not implemented.");
    }

    get(): Experience[] {
        const experiences = localStorage.getItem('experiences');
        if (experiences === null) {
            return [];
        }
        return JSON.parse(experiences);
    }

    update(experience: Experience): void {
        throw new Error("Method not implemented.");
    }
}