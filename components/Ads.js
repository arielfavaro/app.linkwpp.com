function Ads({ client, slot }) {
    return (
        <>
            <ins className="adsbygoogle"
                style={{ display: 'block', }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script dangerouslySetInnerHTML={{
                __html: "(adsbygoogle = window.adsbygoogle || []).push({})"
            }}>
            </script>
        </>
    )
}

export { Ads };