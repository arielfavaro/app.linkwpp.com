import { api } from "../lib/api";

async function myPublicLinks(links) {

    const response = await api.post('/public/my-links', {
        links: links
    });

    return response;
}

export default myPublicLinks;