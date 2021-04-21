import { useEffect } from "react";

function Ads({ client, slot, name }) {

    useEffect(() => {
        console.log('ads push');
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [name]);

    return (
        <div key={name}>
            <ins className="adsbygoogle"
                style={{ display: 'block', }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    )
}

export { Ads };