export class HashMockGenerator {
    public hash = async (s: string): Promise<string> => {
        return "hash"
    }

    public compareHash = async (s: string, hash: string): Promise<boolean> => {
        return s === hash
    }
} 