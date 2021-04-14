import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import myPublicLinks from "../../services/myPublicLinks";


function MyLinks() {

    const [links, setLinks] = useState([]);

    useEffect(async () => {
        const storage_links = JSON.parse(localStorage.getItem('geradorlinkwhatsapp.links'));
        const { data } = await myPublicLinks(storage_links);
        setLinks(data);
    }, []);

    return (
        <div className="container-fluid">
            <div className="container main p-0">
                <Head>
                    <title key="title">Meus Links - Gerador de Link para WhatsApp</title>
                    <meta key="description" name="description" content="Meus links" />
                    <link key="canonical" rel="canonical" href="https://geradorlinkwhatsapp.com/meus-links" />
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
                <Header title={<>Meus <span className="text-primary">links</span></>} description={<><span className="d-block mb-3">Meus links gerados</span>Em breve você poderá fazer login em nossa plaforma para acompnhar as estatísticas com mais detalhes</>} />

                <div className="row justify-content-center m-0">
                    {links.length ?
                        (
                            <ul className="list-unstyled col-12 col-md-6">
                                {links.map((link) => (
                                    <li className="bg-secondary py-3 my-3 rounded-sm row align-items-center justify-content-between text-center text-md-left" key={link.uuid}>
                                        <div className="flex-fill pr-3 col-12 col-md-9">
                                            <p className="h6">+{link.phone_country_code} {link.phone_number}</p>
                                            <p className="h6 font-weight-normal">{link.message}</p>
                                            <div className="border-bottom border-dark"></div>
                                            <a className="rounded mb-0 mt-2 text-white d-block" target="_blank" href={`https://linkwpp.com/w/${link.code}`}>https://linkwpp.com/w/{link.code}</a>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <span className="d-block mb-2">Acessos: <span className="font-weight-bold text-primary h5">{link.opens_count}</span></span>
                                            <span>Criado em: {new Date(Date.parse(link.created_at)).toLocaleString('pt-BR', {timeZone: 'UTC'})}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                        :
                        (
                            <h4 className="text-center">Carregando...</h4>
                        )
                    }
                </div>

            </div>
        </div >
    )
}

export default MyLinks;