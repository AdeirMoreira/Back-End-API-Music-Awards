import {v4} from "uuid";

export default class IdGenerator {
    generator() {
        throw new Error('Method not implemented.');
    }

    generateId(): string{
	return v4();
    }
}