import RandomList from "./RandomList";
import styles from "./Random.module.css";
import Spinner from "../../ui/Spinner";
import { currentYear } from "../../../lib/Lib";
const Random = ({ randomAnime, loading, noData, moreAnime }) => {
  return (
    <section className={styles.content}>
      <div className={styles.card_title}>
        <h1 className={styles.title}>List Anime {currentYear()}!</h1>
      </div>
      {/* <p>Sedang Membuat Quotes</p> */}
      {randomAnime && <RandomList items={randomAnime} />}
      <div className={styles.btnWrapper}>
        <button onClick={moreAnime} className={styles.moreBtn}>
          Show more
        </button>
        {loading && <Spinner />}
      </div>
      {noData && <div className="text-center">no data anymore ...</div>}
    </section>
  );
};
export default Random;
