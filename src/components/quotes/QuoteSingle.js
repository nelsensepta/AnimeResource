import React, { useState } from "react";
import styles from "./QuotesSingle.module.css";

export default function QuoteSingle({ item }) {
  const [alert, setAlert] = useState(false);
  const copyQuotes = (value) => {
    navigator.clipboard.writeText(value);
    setAlert(!alert);
  };
  return (
    <>
      <div className={styles.card} onClick={() => copyQuotes(item.quote)}>
        <p className={styles.quote}>{item.quote}</p>
        <p className={styles.character}>
          {item.character}{" "}
          <span className={styles.anime}>( {item.anime} )</span>
        </p>
      </div>
      {/* {alert && <p>Berhasil Dikopi</p>} */}
    </>
    // <p>ok</p>
    // <>
    //   <p className={styles.quote}>{item.quote}</p>
    //   <p className={styles.character}>
    //     {item.character} <span className={styles.anime}>( {item.anime} )</span>
    //   </p>
    // </>
  );
}
