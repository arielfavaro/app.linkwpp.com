import styles from '@/styles/Header.module.css'

export default function Header({ title, description }) {
    return (
        <header className={styles.wrapper}>
            <h1 className={styles.title}>
                {title ||
                    <>
                        <span className={styles.highlight}>Gerador</span> de Link para whats
                    </>}
            </h1>
            <p className={styles.description}>
                {description ||
                    <>Crie link curto para whats com QR Code de maneira fácil e compartilhe com seus clientes.</>
                }
            </p>
        </header>
    )
}
