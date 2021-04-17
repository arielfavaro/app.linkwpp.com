function AdsLeft() {
    return (
        <>
            <ins className="adsbygoogle"
                style={{ display: 'block', }}
                data-ad-client="ca-pub-3150319769695783"
                data-ad-slot="6780362663"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script dangerouslySetInnerHTML={{
                __html: "(adsbygoogle = window.adsbygoogle || []).push({})"
            }}>
            </script>
        </>
    )
}

function AdsRight() {
    return (
        <>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-3150319769695783"
                data-ad-slot="7320586004"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script dangerouslySetInnerHTML={{
                __html: "(adsbygoogle = window.adsbygoogle || []).push({})"
            }}>
            </script>
        </>
    )
}

export { AdsLeft, AdsRight };