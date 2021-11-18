import {v4 as uuidV4} from 'uuid'


class User {
    id: string;
    nome: string;
    email: string;
    admin: boolean;
    created_at: Date;
    updated_at: Date;

    constructor(nome: string, email: string) {
        this.id = uuidV4();
        this.nome = nome;
        this.email = email;
        this.admin = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }

}

export {User}