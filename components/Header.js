function Header({ title, description }) {
    return (
        <header className="text-center">
            <h1 className="font-weight-bold display-4 pt-3 pt-md-4">{title || <><span className="text-success">Gerador</span> de Link <span className="d-block">para whats</span></>}</h1>
            <p className="my-3 mt-md-4 mx-auto font-weight-normal" style={{ maxWidth: '370px' }}>{description || <>Crie link curto para whats com QR Code de maneira fácil e compartilhe com seus clientes.</>}</p>
        </header>
    )
}

export default Header;