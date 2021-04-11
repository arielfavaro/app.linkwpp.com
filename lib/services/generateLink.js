import { API_GERADOR } from '../api';

async function generateLink({ countryCode, number, message }, { link_generated, setLinkGenerated }) {
    const res = await fetch(`${API_GERADOR}/link`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            "phone_country_code": countryCode.replace(/\D/g, ''),
            "phone_number": number.replace(/\D/g, ''),
            "message": message
        })
    });

    // const link = `https://api.whatsapp.com/send?phone=${countryCode.replace(/\D/g, '')}${number.replace(/\D/g, '')}&text=${encodeURI(message)}`;

    const { shortened, original } = await res.json();

    setLinkGenerated({ ...link_generated, link: original, link_shortened: shortened, copiado: false })

}

export default generateLink;