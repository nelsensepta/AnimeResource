import React from "react";
import styles from "./QuotesSingle.module.css";

export default function QuoteSingle({ item }) {
  console.log(item);
  return (
    <div className={styles.card}>
      <p className={styles.quote}>{item.quote}</p>
      <p className={styles.character}>
        {item.character} <span className={styles.anime}>( {item.anime} )</span>
      </p>
    </div>
  );
}
