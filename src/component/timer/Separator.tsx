import { motion } from "framer-motion";
import { memo } from "react";

import styles from "./Timer.module.scss";

export default memo(({delayIndex}: Props) => (
    <motion.div
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, transition: {type: "tween", duration: .1}}}
        initial={{opacity: 0, y: -30}}
        transition={{delay: delayIndex * .05}}
        layout
        className={styles.digitsSeparator}/>
));

interface Props {
    delayIndex: number;
}
