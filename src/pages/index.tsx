import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "@/component/platform";
import { SDTButton, SDTButtonGroup, SDTContainer } from "@/component/shell";
import { SDTTimer } from "@/component/timer";

function getCurrentTime(): number {
    return Math.round(Date.now() / 1000);
}

export default memo(() => {
    const frameRef = useRef<number>();
    const {replace: navigate} = useRouter();
    const start = useRef(0);
    const pauseSince = useRef(null);
    const [first, setFirst] = useState(true);
    const [interval, setInterval] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (!running) {
            return;
        }

        if (start.current === -1) {
            start.current = getCurrentTime();
        }

        const tick = () => {
            if (!running) {
                return;
            }

            const now = getCurrentTime();

            setInterval(now - start.current);

            frameRef.current = requestAnimationFrame(tick);
        };

        tick();

        return () => cancelAnimationFrame(frameRef.current);
    }, [running]);

    const onStartClick = useCallback(() => {
        pauseSince.current = -1;
        start.current = getCurrentTime();
        setFirst(false);
        setRunning(true);
    }, []);

    const onPlayClick = useCallback(() => {
        start.current += getCurrentTime() - pauseSince.current;
        pauseSince.current = -1;
        setRunning(true);
    }, []);

    const onPauseClick = useCallback(() => {
        pauseSince.current = getCurrentTime();
        setRunning(false);
    }, []);

    const onResetClick = useCallback(() => {
        pauseSince.current = -1;
        start.current = -1;
        setInterval(0);
        setRunning(false);
    }, []);

    return (
        <SDTContainer>
            <SDTTimer interval={interval}/>

            <SDTButtonGroup>
                {first && <SDTButton icon="fas circle-play" label="Start de tijd!" onClick={onStartClick}/>}
                {!first && (<>
                    {!running && <SDTButton icon="fas play" onClick={onPlayClick}/>}
                    {running && <SDTButton icon="fas pause" onClick={onPauseClick}/>}
                    {!running && <SDTButton icon="fas rotate-left" onClick={onResetClick}/>}
                </>)}
                <SDTButton iconAfter="fas circle-right" label="Klok" onClick={() => navigate("/klok")}/>
            </SDTButtonGroup>
        </SDTContainer>
    );
});
