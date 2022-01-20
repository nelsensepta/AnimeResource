// styles
import styles from "./SongList.module.css";
import SongItem from "./SongItem";

const SongList = ({ items }) => {
  return (
    <div className={styles.grid}>
      {items.documents.map((song) => (
        <SongItem key={song.id} item={song} />
      ))}
    </div>
  );
};

export default SongList;
