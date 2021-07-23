import { api } from '@/lib/api'

export default async function sendContato(fields) {
    const response = await api.post('/contact', {
        ...fields
    })

    return response
}
