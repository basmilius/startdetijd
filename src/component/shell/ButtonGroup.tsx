import { AnimatePresence, motion } from "framer-motion";
import { Children, cloneElement, memo, PropsWithChildren, ReactElement } from "react";

import styles from "./Button.module.scss";

export default memo(({children}: PropsWithChildren<{}>) => (
    <motion.div
        animate={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: "100%"}}
        className={styles.buttonGroup}>
        <AnimatePresence exitBeforeEnter initial={false}>
            {Children.map(children, (child: ReactElement, key) => child && cloneElement(child, {key}))}
        </AnimatePresence>
    </motion.div>
));
