import React from "react";
import styles from "./Card.module.css";

export default function Card() {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.avatar}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {/* <div className={styles.post}>
        <div className={styles.avatar}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.post}>
        <div className={styles.avatar}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div> */}
    </div>
  );
}
