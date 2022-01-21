import { AnimatePresence, motion } from "framer-motion";
import { Children, cloneElement, memo, PropsWithChildren, ReactElement } from "react";

import styles from "./Button.module.scss";

export default memo(({children}: PropsWithChildren<{}>) => (
    <motion.div className={styles.buttonGroup}>
        <AnimatePresence exitBeforeEnter initial={false}>
            {Children.map(children, (child: ReactElement, key) => child && cloneElement(child, {key}))}
        </AnimatePresence>
    </motion.div>
));
