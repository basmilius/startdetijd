import { memo, useEffect, useRef, useState } from "react";
import { useRouter } from "@/component/platform";
import { SDTButton, SDTButtonGroup, SDTContainer } from "@/component/shell";
import { SDTTimer } from "@/component/timer";

function getSecondsSinceMidnight(): number {
    let today = new Date();
    let now = new Date();

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    return Math.floor((now.getTime() - today.getTime()) / 1000);
}

export default memo(() => {
    const frameRef = useRef<number>();
    const {replace: navigate} = useRouter();
    const [interval, setInterval] = useState(getSecondsSinceMidnight());

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
                <SDTButton icon="fas stopwatch" label="Stopwatch" onClick={() => navigate("/")}/>
            </SDTButtonGroup>
        </SDTContainer>
    );
});
