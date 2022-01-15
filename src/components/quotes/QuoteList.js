// styles
// import styles from "./GameList.module.css";
import QuoteItem from "./QuoteItem";

const QuoteList = ({ items }) => {
  return (
    <div className="bg-gray-400">
      {items.data.map((quote) => (
        <QuoteItem key={quote.id} item={quote} />
      ))}
    </div>
  );
};

export default QuoteList;
