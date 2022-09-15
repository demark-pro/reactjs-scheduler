import { createRef } from "react";
import styles from "./Scheduler.module.css";

export default function Scheduler() {
  const containerRef = createRef(null);

  return (
    <div ref={containerRef} className={styles.container}>
      content
    </div>
  );
}
