import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.wrapper}>
            <div className={styles.links}>
                <Link href="/politica-privacidade"><a className="mx-2">Política de Privacidade</a></Link>
                <Link href="/termos"><a className="mx-2">Termos</a></Link>
            </div>
            <div className={styles.version}>
                <span className="small block">Versão: 0.2.0</span>
                <span className="small block">2021</span>
                {/* <span className="small block mt-3">Made with <FaCoffee /> by <a href="https://arielfavaro.com/" target="_blank" className="text-white">Ariel Favaro</a></span> */}
            </div>
        </footer>
    )
}
