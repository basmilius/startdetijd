import { memo, useEffect, useRef, useState } from "react";
import { useRouter } from "@/component/platform";
import { SDTButton, SDTButtonGroup, SDTContainer } from "@/component/shell";
import { SDTTimer } from "@/component/timer";

function getSecondsSinceMidnight(): number {
    let today = new Date();
    let now = new Date();

    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    return Math.floor((today.getTime() - now.getTime()) / 1000);
}

export default memo(() => {
    const frameRef = useRef<number>();
    const {replace: navigate} = useRouter();
    const [interval, setInterval] = useState(0);

    useEffect(() => {
        const tick = () => {
            setInterval(getSecondsSinceMidnight());

            frameRef.current = requestAnimationFrame(tick);
        };

        tick();

        return () => cancelAnimationFrame(frameRef.current);
    }, []);

    return (
        <SDTContainer>
            <SDTTimer interval={interval}/>

            <SDTButtonGroup>
                <SDTButton icon="fas circle-left" label="Terug" onClick={() => navigate("/")}/>
            </SDTButtonGroup>
        </SDTContainer>
    );
});
