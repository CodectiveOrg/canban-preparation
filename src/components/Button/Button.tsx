import type { ComponentProps, ReactNode } from "react";

import clsx from "clsx";

import styles from "./Button.module.css";

type Props = ComponentProps<"button"> & {
  variant?: "solid" | "outlined";
  color?: "default" | "primary";
};

export default function Button({
  variant = "solid",
  color = "default",
  children,
  ...otherProps
}: Props): ReactNode {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[color])}
      {...otherProps}
    >
      {children}
    </button>
  );
}
