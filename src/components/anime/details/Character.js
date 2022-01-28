import React from "react";
import styles from "./CharacterItem.module.css";
import CharacterItem from "./CharacterItem";
export default function Character({ char }) {
  return (
    <div className={styles.grid}>
      {char.map((v) => (
        <CharacterItem key={v.id} item={v} />
      ))}
    </div>
  );
}
