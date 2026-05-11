import { api } from '../api'

export const AuthService = {

    async login(user: string, password: string): Promise<boolean> {
        /*
            TODO: implementar login com a API
            por enquanto esta apenas fazendo login com admin admin para teste da interface
        */
        const token = 'admin' + Date.now()
        document.cookie = `authToken=${token}; path=/; max-age=604800`

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });

    },

    async logout(): Promise<boolean> {
        document.cookie = 'authToken=; path=/; max-age=0'
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    },

} 