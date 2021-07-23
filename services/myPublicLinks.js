import { api } from '@/lib/api'

export default async function myPublicLinks(links) {

    const response = await api.post('/my-links/public', {
        links: links
    })

    return response
}
