import { AnimatePresence, motion } from "framer-motion";
import { memo, useMemo } from "react";
import { SDTDigit, SDTSeparator } from "@/component/timer/index";

import styles from "./Timer.module.scss";

export default memo(({interval}: Props) => {
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

    const showDays = days.filter(n => n > 0).length > 0;
    const showHours = showDays || hours.filter(n => n > 0).length > 0;
    const showMinutes = showHours || minutes.filter(n => n > 0).length > 0;

	return (
		<AnimatePresence exitBeforeEnter initial={false}>
            <motion.div key="digits" className={styles.digits}>
                {showDays && (<>
                    <DigitContainer
                        description={"Dagen"}
                        digits={days}/>

                    <AnimatePresence exitBeforeEnter>
                        <SDTSeparator/>
                    </AnimatePresence>
                </>)}

                {showHours && (<>
                    <DigitContainer
                        description={"Uren"}
                        digits={hours}/>

                    <AnimatePresence exitBeforeEnter>
                        <SDTSeparator/>
                    </AnimatePresence>
                </>)}

                {showMinutes && (<>
                    <DigitContainer
                        description={"Minuten"}
                        digits={minutes}/>

                    <AnimatePresence exitBeforeEnter>
                        <SDTSeparator/>
                    </AnimatePresence>
                </>)}

                <DigitContainer
                    description={"Seconden"}
                    digits={seconds}
                    shouldShow={(n, i) => showMinutes || interval >= 10 || n > 0 || i === 1}/>
            </motion.div>
        </AnimatePresence>
	);
});

const DigitContainer = memo(({description, digits, shouldShow = () => true}: ContainerProps) => (
    <motion.div
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0}}
        initial={{opacity: 0, x: "-5em"}}
        layout
        className={styles.digitContainer}>

        <motion.div
            className={styles.digitMount}>
            {digits.map((digit, index) => shouldShow(digit, index) && (
                <AnimatePresence key={index} exitBeforeEnter initial={false}>
                    <div key={index}>
                        <SDTDigit key={index + ":" + digit} number={digit}/>
                    </div>
                </AnimatePresence>
            ))}
        </motion.div>

        <motion.div
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0}}
            initial={{opacity: 0, y: -90}}
            layout
            className={styles.digitDescription}>
            {description}
        </motion.div>
    </motion.div>
));

interface Props {
	interval: number;
}

interface ContainerProps {
    description: string;
    digits: number[];
    shouldShow?: (value: number, index: number) => boolean;
}
