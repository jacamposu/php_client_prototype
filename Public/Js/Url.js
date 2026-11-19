import { Files } from '../../Public/Js/Files.js';

export class Url{

    constructor() {
    }

    async LoadResource(resource) {
        const response = await fetch(resource);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json();
    }
}