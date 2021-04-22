import Link from "next/link";
// import { FaCoffee } from "react-icons/fa";

function Footer() {
    return (
        <footer className="container-fluid mt-5 py-3 py-md-4 bg-secondary">
            <div className="d-flex align-items-center justify-content-center pb-2">
                <Link href="/politica-privacidade"><a className="mx-2">Política de Privacidade</a></Link>
                <Link href="/termos"><a className="mx-2">Termos</a></Link>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <span className="small d-block">Versão: 0.2.0</span>
                <span className="small d-block">2021</span>
                {/* <span className="small d-block mt-3">Made with <FaCoffee /> by <a href="https://arielfavaro.com/" target="_blank" className="text-white">Ariel Favaro</a></span> */}
            </div>
        </footer>
    )
}
export default Footer;