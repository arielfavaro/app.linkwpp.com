import Link from 'next/link'
import styles from '@/styles/Nav.module.css'

export default function Nav() {
    return (
        <nav className={styles.wrapper}>
            <Link href="/">
                <a className="mb-2 lg:mb-0">
                    <img src="/icons/icon192.png" title="Gerador de Link para Whats" alt="Logo" width="40" />
                </a>
            </Link>
            <div className={styles.links}>
                <Link href="/"><a>Início</a></Link>
                <Link href="/meus-links"><a>Meus Links</a></Link>
                <Link href="/como-usar"><a>Como usar</a></Link>
                <Link href="/contato"><a>Contato</a></Link>
            </div>
        </nav>
    )
}
