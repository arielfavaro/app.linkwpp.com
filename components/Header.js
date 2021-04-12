function Header({ title, description }) {
    return (
        <header className="text-center">
            <h1 className="font-weight-bold display-4 pt-3 pt-md-4">{title || <>Gerador de Link <span className="d-block">para <span className="text-success">WhatsApp</span></span></>}</h1>
            <p className="my-3 mt-md-4 mx-auto font-weight-normal" style={{ maxWidth: '370px' }}>{description || <>Crie link encurtado para WhatsApp com QR Code de maneira fácil e compartilhe com seus clientes.</>}</p>
        </header>
    )
}

export default Header;