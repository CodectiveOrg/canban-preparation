import { type ComponentProps, type ReactNode, useId } from "react";

import clsx from "clsx";

import styles from "./text-input.module.css";

type Props = ComponentProps<"input"> & {
  label: string;
};

export default function TextInputComponent({
  className,
  label,
  ...otherProps
}: Props): ReactNode {
  const id = useId();

  return (
    <div className={clsx(styles["text-input"], className)}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...otherProps} />
    </div>
  );
}
