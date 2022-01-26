import RandomList from "./RandomList";
import styles from "../../../pages/Home.module.css";
import Spinner from "../../ui/Spinner";
import { currentYear } from "../../../lib/Lib";
const Random = ({ randomAnime, loading, noData, moreAnime }) => {
  return (
    <section className={styles.games_content}>
      <div className={styles.card_title}>
        <h1 className={styles.title}>List Anime {currentYear()}!</h1>
      </div>
      {/* <p>Sedang Membuat Quotes</p> */}
      {randomAnime && <RandomList items={randomAnime} />}
      <button onClick={moreAnime}>Show more</button>
      <p>Problem Infinity Scrool</p>
      {loading && <Spinner />}
      {noData && <div className="text-center">no data anymore ...</div>}
    </section>
  );
};
export default Random;
