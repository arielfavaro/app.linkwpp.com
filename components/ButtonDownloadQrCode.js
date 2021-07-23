import QRCode from 'qrcode'

export default function ButtonDownloadQrCode({ link, code }) {

    let qrcode_options = {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        // quality: 0.3,
        margin: 1,
        width: 2500,
        // scale: 20,
    }

    function downloadQrcode() {
        QRCode.toDataURL(link, qrcode_options, (err, url) => {

            let qrcode_image = document.createElement('a')
            qrcode_image.href = url
            qrcode_image.download = `geradorlinkwhatsapp-${code}-2500x2500.png`
            qrcode_image.click()

        })
    }

    return (
        <button className="btn btn-dark btn-sm px-3 font-weight-bold btn-qrcode-download rounded" onClick={downloadQrcode}>Baixar QR Code</button>
    )
}
