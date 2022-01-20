import { motion } from "framer-motion";
import { memo } from "react";

import styles from "./Timer.module.scss";

export default memo(({number}: Props) => (
    <motion.div
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, scale: .5, transition: {type: "tween", duration: .1}}}
        initial={{opacity: 0, y: "-.5em"}}
        layout
        className={styles.digit}>
        {number}
    </motion.div>
));

interface Props {
	number: number;
}
