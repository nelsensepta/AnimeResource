import React from "react";

export default function QuoteSingle({ item }) {
  console.log(item);
  return (
    <div>
      <h1>{item.anime}</h1>
      <p>{item.character}</p>
      <p>{item.quote}</p>
    </div>
  );
}
