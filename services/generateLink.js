import { api } from "../lib/api";

async function generateLink({ countryCode, number, message }) {

    const response = await api.post('/link', {
        "phone_country_code": countryCode.replace(/\D/g, ''),
        "phone_number": number.replace(/\D/g, ''),
        "message": message
    });

    return response;
}

export default generateLink;