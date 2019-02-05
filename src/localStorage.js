export class LocalStorage {
    add(experience) {
        const experiences = this.get();
        experiences.push(experience);
        localStorage.setItem('experiences', JSON.stringify(experiences));
    }
    add_many(experiences) {
        const data = this.get();
        for (const experience of experiences) {
            data.push(experience);
        }
        localStorage.setItem('experiences', JSON.stringify(data));
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    get() {
        const experiences = localStorage.getItem('experiences');
        if (experiences === null) {
            return [];
        }
        return JSON.parse(experiences);
    }
    update(experience) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=localStorage.js.map