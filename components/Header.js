import styles from '@/styles/Header.module.css'

export default function Header({ title, description }) {
    return (
        <header className={styles.wrapper}>
            <h1 className={styles.title}>
                {title ||
                    <>
                        Gerador de Link
                        <span className={styles.highlight}>para <span>WhatsApp</span></span>
                    </>}
            </h1>
            <p className={styles.description}>
                {description ||
                    <>Crie link curto para WhatsApp com QR Code de maneira fácil e compartilhe com seus clientes.</>
                }
            </p>
        </header>
    )
}
