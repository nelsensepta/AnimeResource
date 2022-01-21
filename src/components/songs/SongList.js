// styles
import styles from "./SongList.module.css";
import SongItem from "./SongItem";

const SongList = ({ items }) => {
  // console.log(items);
  return (
    <div className={styles.grid}>
      {items.map((song) => (
        <SongItem key={song.id} item={song} />
      ))}
    </div>
  );
};

export default SongList;
