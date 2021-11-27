import QRCode from 'qrcode'
import { useEffect, useRef } from 'react'

export default function Qrcode({ link, code }) {

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
            qrcode_image.download = `linkwpp.com-${code}-2500x2500.png`
            qrcode_image.click()

        })
    }

    const canvasRef = useRef(null)

    useEffect(() => {
        QRCode.toCanvas(canvasRef.current, link, { ...qrcode_options, scale: null, width: 250 }, error => { })
    })

    return (
        <div className="flex flex-col items-center">
            <button className="btn btn-dark mb-3 font-bold btn-qrcode-download px-5" onClick={downloadQrcode}>Baixar QR Code</button>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}
