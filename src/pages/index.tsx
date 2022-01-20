import { memo, useCallback, useEffect, useRef, useState } from "react";
import { SDTButton, SDTButtonGroup, SDTContainer } from "@/component/shell";
import { SDTTimer } from "@/component/timer";

function getCurrentTime(): number {
    return Math.round(Date.now() / 1000);
}

export default memo(() => {
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

        let frame;

        const onTick = () => {
            if (!running) {
                return;
            }

            const now = getCurrentTime();

            setInterval(now - start.current);
            schedule();
        };

        const schedule = () => {
            frame = requestAnimationFrame(onTick);
        };

        schedule();

        return () => cancelAnimationFrame(frame);
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

            <div style={{height: 90}}/>

            <SDTButtonGroup>
                {first && <SDTButton icon="fas clock" label="Start de tijd!" onClick={onStartClick}/>}
                {!first && (<>
                    {!running && <SDTButton icon="fas play" onClick={onPlayClick}/>}
                    {running && <SDTButton icon="fas pause" onClick={onPauseClick}/>}
                    {!running && <SDTButton icon="fas rotate-left" onClick={onResetClick}/>}
                </>)}
            </SDTButtonGroup>
        </SDTContainer>
    );
});
