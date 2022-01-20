import { Icon } from "@latte-ui/core";
import { motion } from "framer-motion";
import { forwardRef, memo } from "react";

import styles from "./Button.module.scss";

export default memo(forwardRef<HTMLButtonElement, Props>(({icon, iconAfter, label, onClick}, ref) => (
    <motion.button
        ref={ref}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: .5, transition: {type: "tween", duration: .1}}}
        initial={{opacity: 0, scale: .5}}
        layout
        className={styles.button}
        onClick={onClick}>
        {icon && <Icon className={styles.buttonIcon} name={icon}/>}
        {label && <span>{label}</span>}
        {iconAfter && <Icon className={styles.buttonIcon} name={iconAfter}/>}
    </motion.button>
)));

interface Props {
    icon?: string;
    iconAfter?: string;
    label?: string;
    onClick?: () => void;
}
