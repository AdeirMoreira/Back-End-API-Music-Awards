export class HashMockGenerator {
    public hash = async (s: string): Promise<string> => {
        return "hash"
    }

    public compare = async (s: string, hash: string): Promise<boolean> => {
        return s === hash
    }
} 