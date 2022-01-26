import { useState, useEffect } from "react";

import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
// styles
import AnimeService from "../services/AnimeService";
import { BiSearch } from "react-icons/bi";
import styles from "./Home.module.css";
import RandomList from "../components/anime/random/RandomList";
import Spinner from "../components/ui/Spinner";
import { RandomString } from "../lib/Lib";
import TrendingList from "../components/anime/trending/TrendingList";
import TrendingItem from "../components/anime/trending/TrendingItem";
import PopularityItem from "../components/anime/popular/PopularityItem";
import { useInfinity } from "../hooks/useInfinity";
import Random from "../components/anime/random/Random";
import Popularity from "../components/anime/popular/Popularity";
import Trending from "../components/anime/trending/Trending";
const Home = () => {
  // const [filteredGames, setFilteredGames] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("anime");
  const [randomAnime, setRandomAnime] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  // Search
  const [err, setErr] = useState("");
  const [loadingSearch, setLoadingSearch] = useState();
  const [searchAnime, setSearchAnime] = useState();
  let [searchParams, setSearchParams] = useSearchParams();
  let param = searchParams.get(`${search}`);
  const debouncedSearchTerm = useDebounce(param, 500);

  // console.log("data", searchAnime);
  const handleSearch = (e) => {
    e.preventDefault();
    const v = e.target.value;
    if (v && search === "anime") {
      setSearchParams({ anime: v });
    } else if (v && search === "character") {
      setSearchParams({ character: v });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    loadUserList(page);
    let abortController = new AbortController();
    if (debouncedSearchTerm) {
      setLoadingSearch(true);
      if (!abortController.signal.aborted) {
        setTimeout(() => {
          AnimeService.getAnime(debouncedSearchTerm, `${search}`)
            .then((data) => setSearchAnime(data))
            .catch((error) => setErr(`${error}`))
            .finally(() => {
              setLoadingSearch(false);
            });
        }, 500);
      }
    } else {
      setLoadingSearch(false);
    }
    return () => {
      abortController.abort();
    };
  }, [debouncedSearchTerm]);

  const loadUserList = (page) => {
    setLoading(true);
    setTimeout(() => {
      AnimeService.getList(page)
        .then((res) => {
          const newPage = page + 20;
          const newList = randomAnime.concat(res);
          setRandomAnime(newList);
          setPage(newPage);
          if (res.length === 0) setNoData(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);
  };

  const moreAnime = () => {
    if (!noData) {
      loadUserList(page);
    }
  };

  // Trending Anime
  const {
    res: trendingAnime,
    isPending: trendingPending,
    error: trendingErr,
  } = useFetch(`${process.env.REACT_APP_API_URL_ANIME}/trending/anime`);

  // Popularity Anime
  const {
    res: popularityAnime,
    isPending: popularityPending,
    error: popularityErr,
  } = useFetch(
    `${process.env.REACT_APP_API_URL_ANIME}/anime?sort=popularityRank`
  );
  // useEffect(() => {
  //   const { res, isPending, error } = useInfinity(
  //     `${process.env.REACT_APP_API_URL_ANIME}/anime?page[limit]=20&page[offset]=0`
  //   );
  // }, []);

  // const [pending, setPending] = useState(false);

  // const [err, setErr] = useState("");

  // console.log(res);

  // setRandomAnime({ ok: "y", oi: 1 });
  // const { res, isPending, error } = useInfinity(
  //   `${process.env.REACT_APP_API_URL_ANIME}/anime?page[limit]=20&page[offset]=0`
  // );

  // console.log(res);
  // console.log("Pending : ", isPending);
  // console.log(randomAnime !== (undefined || null));

  // try {
  //   if (randomAnime.data[0] === undefined && isPending === false) {
  //     setRandomAnime({ data: res.data, links: res.links });
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  // try {
  //   if (isPending === false) {
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  // console.log(randomAnime.res);
  // const moreAnime = () => {
  //   // try {
  //   //   const { res, isPending, error } = useInfinity(randomAnime.links.next);
  //   //   setRandomAnime((randomAnime) => {
  //   //     var obj = {
  //   //       data: randomAnime.data.concat(res.data),
  //   //       links: res.links,
  //   //     };
  //   //     return obj;
  //   //   });
  //   //   // fetch(randomAnime.links.next)
  //   //   //   .then((resJson) => resJson.json())
  //   //   //   .then((res) =>
  //   //   //     setRandomAnime((randomAnime) => {
  //   //   //       var obj = {
  //   //   //         data: randomAnime.data.concat(res.data),
  //   //   //         links: res.links,
  //   //   //       };
  //   //   //       return obj;
  //   //   //     })
  //   //   //   );
  //   // } catch (err) {
  //   //   console.log(err);
  //   // }
  // };

  // console.log(randomAnime);

  return (
    <>
      <div className={styles.games_content}>
        <div className={styles.card_input}>
          <form className={styles.form}>
            <label>
              <BiSearch className={styles.search_icon} />
              <input
                value={param || ""}
                onChange={handleSearch}
                type="search"
                placeholder={`Search for ${search}`}
                className={styles.input}
              />
            </label>
          </form>
          <div className={styles.filter}>
            <select
              id="category"
              onChange={(e) => setSearch(e.target.value)}
              defaultValue={`${search}`}
            >
              <option value="anime">Anime</option>
              <option value="character">Character</option>
            </select>
          </div>
        </div>
      </div>
      {/* {debouncedSearchTerm && filteredGames.length === 0 && (
          <p className="text-center">Sorry, no games found :(</p>
        )} */}

      {loadingSearch && <Spinner />}
      {err && <p>{err}</p>}
      {searchAnime && <RandomList items={searchAnime.data} />}

      {trendingAnime && (
        <Trending
          trendingAnime={trendingAnime}
          trendingErr={trendingErr}
          trendingPending={trendingPending}
        />
      )}

      {popularityAnime && (
        <Popularity
          popularityAnime={popularityAnime}
          popularityErr={popularityErr}
          popularityPending={popularityPending}
        />
      )}

      {randomAnime && (
        <Random
          randomAnime={randomAnime}
          loading={loading}
          noData={noData}
          moreAnime={moreAnime}
        />
      )}
    </>
  );
};

export default Home;
