import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

// styles
import styles from "./Favorites.module.css";
import CatalogMagic from "../components/ui/skeleton/CatalogMagic";
import Card from "../components/ui/skeleton/Card";

const Favorites = () => {
  const { favorites, totalFavorites } = useContext(FavoritesContext);

  return (
    <section className={styles.favorite}>
      <h1 className="title">Your Favorite Games</h1>
      {/* <CatalogMagic /> */}
      <Card />
    </section>
  );
};

export default Favorites;
