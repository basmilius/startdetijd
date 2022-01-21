import { useBreakpoints } from "@latte-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useMemo } from "react";
import { SDTDigit, SDTSeparator } from "@/component/timer/index";

import styles from "./Timer.module.scss";

export default memo(({interval}: Props) => {
    const {isUp} = useBreakpoints();

    const [days, hours, minutes, seconds] = useMemo<number[][]>(() => {
        let days = Math.floor(interval / 86400);
        interval -= days * 86400;

        let hours = Math.floor(interval / 3600);
        interval -= hours * 3600;

        let minutes = Math.floor(interval / 60);
        interval -= minutes * 60;

        let seconds = interval;

        return [
            days.toString(10).padStart(2, "0").split("").map(Number),
            hours.toString(10).padStart(2, "0").split("").map(Number),
            minutes.toString(10).padStart(2, "0").split("").map(Number),
            seconds.toString(10).padStart(2, "0").split("").map(Number)
        ];
    }, [interval]);

    const isDesktop = isUp("lg");
    const showDays = !isDesktop || days.filter(n => n > 0).length > 0;
    const showHours = !isDesktop || showDays || hours.filter(n => n > 0).length > 0;
    const showMinutes = !isDesktop || showHours || minutes.filter(n => n > 0).length > 0;

    return (
        <motion.div
            key="digits"
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: .75, transition: {type: "tween", duration: .1}}}
            initial={{opacity: 0, scale: .75}}
            transition={{type: "spring"}}
            className={styles.digits}>

            {showDays && (<>
                <AnimatePresence exitBeforeEnter>
                    <DigitContainer
                        key="days"
                        delayIndex={6}
                        description={"Dagen"}
                        digits={days}/>
                </AnimatePresence>

                <AnimatePresence exitBeforeEnter>
                    <SDTSeparator key="separator-3" delayIndex={6}/>
                </AnimatePresence>
            </>)}

            {showHours && (<>
                <AnimatePresence exitBeforeEnter>
                    <DigitContainer
                        key="hours"
                        delayIndex={4}
                        description={"Uren"}
                        digits={hours}/>
                </AnimatePresence>

                <AnimatePresence exitBeforeEnter>
                    {isDesktop && <SDTSeparator key="separator-2" delayIndex={4}/>}
                </AnimatePresence>

            </>)}

            {showMinutes && (<>
                <AnimatePresence exitBeforeEnter>
                    <DigitContainer
                        key="minutes"
                        delayIndex={2}
                        description={"Minuten"}
                        digits={minutes}/>
                </AnimatePresence>

                <AnimatePresence exitBeforeEnter>
                    <SDTSeparator key="separator-1" delayIndex={2}/>
                </AnimatePresence>
            </>)}

            <AnimatePresence exitBeforeEnter>
                <DigitContainer
                    key="seconds"
                    delayIndex={0}
                    description={"Seconden"}
                    digits={seconds}
                    hideDescription={!showMinutes}
                    shouldShow={(n, i) => showMinutes || interval >= 10 || n > 0 || i === 1}/>
            </AnimatePresence>

        </motion.div>
    );
});

const DigitContainer = memo(({delayIndex, description, digits, hideDescription, shouldShow = () => true}: ContainerProps) => (
    <motion.div
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0}}
        initial={{opacity: 0, x: "-6em"}}
        transition={{delay: delayIndex * .1, type: "spring"}}
        layout
        className={styles.digitContainer}>

        <motion.div
            className={styles.digitMount}
            layout>
            {digits.map((digit, index) => shouldShow(digit, index) && (
                <AnimatePresence key={index} exitBeforeEnter initial={false}>
                    <SDTDigit
                        key={index + ":" + digit}
                        delayIndex={delayIndex + (1 - index)}
                        number={digit}/>
                </AnimatePresence>
            ))}
        </motion.div>

        {!hideDescription && (
            <motion.div
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                initial={{opacity: 0, y: -90}}
                transition={{delay: delayIndex * .05}}
                layout
                className={styles.digitDescription}>
                {description}
            </motion.div>
        )}
    </motion.div>
));

interface Props {
    interval: number;
}

interface ContainerProps {
    delayIndex: number;
    description: string;
    digits: number[];
    hideDescription?: boolean;
    shouldShow?: (value: number, index: number) => boolean;
}
