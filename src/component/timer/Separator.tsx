import { motion } from "framer-motion";
import { memo } from "react";

import styles from "./Timer.module.scss";

export default memo(({delayIndex}: Props) => (
    <motion.div
        animate={{opacity: 1, x: 0, transition: {delay: delayIndex * .05, type: "spring"}}}
        exit={{opacity: 0, transition: {type: "tween", duration: .1}}}
        initial={{opacity: 0, x: -60}}
        layout
        className={styles.digitsSeparator}/>
));

interface Props {
    delayIndex: number;
}
