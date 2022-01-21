import { AnimatePresence, motion } from "framer-motion";
import { Children, cloneElement, memo, PropsWithChildren, ReactElement } from "react";

import styles from "./Button.module.scss";

export default memo(({children}: PropsWithChildren<{}>) => (
    <motion.div
        animate={{opacity: 1}}
        exit={{opacity: 0, transition: {type: "tween", duration: .3}}}
        initial={{opacity: 0}}
        className={styles.buttonGroup}>
        <AnimatePresence initial={false}>
            {Children.map(children, (child: ReactElement, key) => child && cloneElement(child, {key}))}
        </AnimatePresence>
    </motion.div>
));
