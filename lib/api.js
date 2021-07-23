import axios from 'axios'

const API_GERADOR = process.env.NEXT_PUBLIC_API_GERADOR || 'http://localhost:8000'

const api = axios.create({
    baseURL: API_GERADOR,
    // headers: {
    //     'Content-type': 'application/json',
    // }
})

export { api }