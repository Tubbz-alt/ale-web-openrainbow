export class DatabaseService {
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    getItemJSON(key: string): object | null {
        let obj = this.getItem(key);
        if (obj) {
            return JSON.parse(obj);
        }
        return null;
    }

    setItem(key: string, dados: string) : void {
        localStorage.setItem(key, dados);
    }

    setItemJSON(key: string, dados: object) {
        this.setItem(key, JSON.stringify(dados));
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }
}