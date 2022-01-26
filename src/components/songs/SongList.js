// styles
import styles from "./SongList.module.css";
import SongItem from "./SongItem";
import { useState, useEffect, useRef } from "react";

const SongList = (props) => {
  // const [idPlay, setIdPlay] = useState();
  // const ok = [];

  // props.items.forEach((element) => {
  //   return ok.push(element.id + 1);
  // });
  // console.log(ok);
  // const [isPlaying, setIsPlaying] = useState({
  //   Play: false,
  //   Id: null,
  // });
  // // console.log(isPlaying.Id);
  // const audioElement = useRef(null);

  // // console.log(props);
  // useEffect(() => {
  //   if (isPlaying.Play) {
  //     audioElement.current.play();
  //     console.log("Play");
  //   } else {
  //     audioElement.current.pause();
  //     console.log("Pause");
  //   }
  // });
  return (
    <div className={styles.grid}>
      {/* {items ? (
        items.map((song) => <SongItem key={song.id} item={song} />)
      ) : (
        <p>Song Not Found</p>
      )} */}
      {props.items.map((song) => (
        <SongItem key={song.id} item={song} />
      ))}
    </div>
  );
};

export default SongList;
