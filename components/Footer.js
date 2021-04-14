import Link from "next/link";

function Footer() {
    return (
        <footer className="container-fluid py-4">
            <div className="d-flex flex-column align-items-end justify-content-end">
                <Link href="/politica-privacidade"><a>Política de Privacidade</a></Link>
                {/* <span className="small d-block">Nenhum dado será armazenado</span> */}
                <span className="small d-block">Ver. 0.1.7</span>
            </div>
        </footer>
    )
}
export default Footer;