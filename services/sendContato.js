import { api } from "../lib/api";

async function sendContato(fields) {
    const response = await api.post('/contact', {
        ...fields
    });

    return response;
}

export default sendContato;