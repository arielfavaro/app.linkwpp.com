import Link from "next/link";

function Nav() {
    return (
        <nav className="nav">
            <div className="container border-bottom border-secondary py-2 py-md-3">
                <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
                    <Link href="/">
                        <a className="pb-2 pb-md-0">
                            <img src="/icons/icon192.png" title="Gerador de Link para WhatsApp" alt="Logo" width="40" />
                        </a>
                    </Link>
                    <div>
                        <Link href="/"><a className="text-white mr-3">Início</a></Link>
                        <Link href="/meus-links"><a className="text-white mr-3">Meus Links</a></Link>
                        <Link href="/como-usar"><a className="text-white mr-3">Como usar</a></Link>
                        <Link href="/contato"><a className="text-white">Contato</a></Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;