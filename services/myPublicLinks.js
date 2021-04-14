import { api } from "../lib/api";

async function myPublicLinks(links) {

    const response = await api.post('/my-links/public', {
        links: links
    });

    return response;
}

export default myPublicLinks;