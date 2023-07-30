import fs from 'fs';
import path from 'path';
import { hash, compare } from 'bcryptjs';

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function getAll () {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

export function getById (id) {
    const data = getAll();
    return data.find(p => p.id === Number(id));
}

export function getByEmail (email) {
    const data = getAll();
    return data.find(p => p.email.toLowerCase() === email.toLowerCase());
}

export async function checkCredentials (user, password) {
    const isValid = await compare(password, user.password);
    return isValid;
}

export async function save (email, password) {
    try {
        const data = getAll();
        const hashedPassword = await hash(password, 12);
        data.push({
            id: data.length + 1,
            password: hashedPassword,
            email
        });
        fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (err) {
        throw err;
    }
}