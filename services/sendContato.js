import { api } from "../lib/api";

async function sendContato(fields) {
    console.log(fields);
    const response = await api.post('/contact/send', {
        ...fields
    });

    return response;
}

export default sendContato;