import { api } from "../lib/api";

async function generateLink({ countryCode, number, message }, { link_generated, setLinkGenerated }) {

    const response = await api.post('/link', {
        "phone_country_code": countryCode.replace(/\D/g, ''),
        "phone_number": number.replace(/\D/g, ''),
        "message": message
    });

    const { shortened, original } = response.data;
    setLinkGenerated({ ...link_generated, link: original, link_shortened: shortened, copiado: false })
}

export default generateLink;