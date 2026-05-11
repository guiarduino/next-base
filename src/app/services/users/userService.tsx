import { api } from '../api'
import { UserList, UserFilters } from './types';

export const userService = {

    async list(filters?: UserFilters): Promise<UserList> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: [
                    { id: 1, name: 'Guilherme Arduinos   Barlatti', email: 'guilherme.barlatti@email.com', role: 'User' },
                    { id: 2, name: 'Marina Arduino Barlatti', email: 'marina.barlatti@email.com', role: 'User' },
                    { id: 3, name: 'Julia Arduino Barlatti', email: 'julia.barlatti@email.com', role: 'User' },
                    { id: 4, name: 'Sandra Regina Arduino', email: 'sandra.arduino@email.com', role: 'Admin' },
                    { id: 5, name: 'Sofia de Souza Sinigalha', email: 'sofia.souza@email.com', role: 'User' }
                ],
                    pagination: {
                        currentPage: filters?.page || 1,
                        totalPages: 5
                    }
                });
            }, 2000);
        });
    },

} 