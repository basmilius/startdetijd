import { LatteUi, LatteUiContext } from "@latte-ui/core";
import { AnimatePresence as _AnimatePresence, AnimatePresenceProps } from "framer-motion";
import { FC, PropsWithChildren } from "react";
import { Head, useRouter } from "@/component/platform";
import { initializeFontAwesome, renderIcon } from "@/logic/font-awesome";

import "../css/latte.scss";
import "../css/index.scss";

const AnimatePresence = _AnimatePresence as FC<PropsWithChildren<AnimatePresenceProps>>;

initializeFontAwesome();

const latteUiConfig = LatteUiContext.withDefaults({
    emoji: {
        baseUrl: "https://bmcdn.nl/assets/joypixels/v6.6",
        fileName: "/svg/%s.svg"
    },
    icon: {
        renderer: renderIcon
    }
});

export default function BApp({Component, pageProps}) {
    const {pathname} = useRouter();

    return (<>
        <Head>
            <meta name="description" content="Het is heel simpel. Het is een timer." key="description"/>
            <meta name="keywords" content="timer,start,de,tijd,klok" key="keywords"/>
            <meta name="robots" content="index,follow" key="robots"/>

            <title>StartDeTijd.nl</title>
        </Head>

        <LatteUi {...latteUiConfig}>
            <AnimatePresence exitBeforeEnter initial={false}>
                <Component key={pathname} {...pageProps}/>
            </AnimatePresence>
        </LatteUi>
    </>);
}
