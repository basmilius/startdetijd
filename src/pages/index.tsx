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
        cancelAnimationFrame(frameRef.current);
    }, []);

    const onResetClick = useCallback(() => {
        pauseSince.current = -1;
        start.current = -1;
        setInterval(0);
        setRunning(false);
        cancelAnimationFrame(frameRef.current);
    }, []);

    return (
        <SDTContainer>
            <SDTTimer interval={interval}/>

            <SDTButtonGroup>
                {first && <SDTButton key="start" icon="fas circle-play" label="Start" onClick={onStartClick}/>}
                {!first && (<>
                    {!running && <SDTButton key="play" icon="fas play" onClick={onPlayClick}/>}
                    {running && <SDTButton key="pause" icon="fas pause" onClick={onPauseClick}/>}
                    {!running && <SDTButton key="reset" icon="fas rotate-left" onClick={onResetClick}/>}
                </>)}
                <SDTButton key="clock" icon="fas clock" label="Klok" onClick={() => navigate("/klok")}/>
            </SDTButtonGroup>
        </SDTContainer>
    );
});
