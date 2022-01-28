export default {
  getList: async (page) => {
    try {
      let url;
      if (page !== null && page > 0) {
        url = `${process.env.REACT_APP_API_URL_ANIME}/anime?page[limit]=20&page[offset]=${page}`;
      } else {
        url = `${process.env.REACT_APP_API_URL_ANIME}/anime?page[limit]=20&page[offset]=0`;
      }

      const req = await fetch(url);
      const res = await req.json();
      // console.log(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getQuotes: async (param, type) => {
    if (type === "character") {
      const url = `${process.env.REACT_APP_API_URL_QUETOS}/quotes/character?name=${param}`;
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error("Quotes not Found");
      } else {
        return await req.json();
      }
      // return res;
      // return res;
    } else {
      const url = `${process.env.REACT_APP_API_URL_QUETOS}/quotes/anime?title=${param}`;
      const req = await fetch(url);
      const res = await req.json();
      return res;
    }
  },
  getSongs: async (param, type) => {
    if (type === "title") {
      const url = `${process.env.REACT_APP_API_URL_SONGS}/song?title=${param}`;
      const req = await fetch(url);
      const res = await req.json();
      return res;
    } else {
      const url = `${process.env.REACT_APP_API_URL_SONGS}/song?artist=${param}`;
      const req = await fetch(url);
      const res = await req.json();
      return res;
    }
  },
  getAnime: async (param, type) => {
    if (type === "anime") {
      const url = `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[text]=${param}&page[limit]=16`;
      const req = await fetch(url);
      const res = await req.json();
      return res;
    } else {
      const url = `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[title]=${param}`;
      const req = await fetch(url);
      const res = await req.json();
      return res;
    }
  },

  getDetails: async (url) => {
    const req = await fetch(url);
    if (!req.ok) {
      throw new Error("Quotes not Found");
    } else {
      return await req.json();
    }
  },

  getCharacter: async (id, page) => {
    try {
      let url;
      if (page !== null && page > 0) {
        url = `${process.env.REACT_APP_API_URL_ANIME}/castings?filter[media_type]=Anime&filter[media_id]=${id}&filter[is_character]=true&filter[language]=Japanese&include=character&sort=-featured&page[limit]=20&page[offset]=${page}`;
      } else {
        url = `${process.env.REACT_APP_API_URL_ANIME}/castings?filter[media_type]=Anime&filter[media_id]=${id}&filter[is_character]=true&filter[language]=Japanese&include=character&sort=-featured&page[limit]=20&page[offset]=0`;
      }
      const req = await fetch(url);
      const res = await req.json();

      return res.included;
    } catch (error) {
      throw error;
    }
  },

  getGenres: async (param, type) => {
    let url;
    switch (type) {
      case "character":
        url = `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[slug]=${param}`;
      case "genre":
        url = `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[slug]=${param}`;
      default:
        url = `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[slug]=${param}`;
        break;
      // const url = `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[slug]=${param}`;
    }
    const req = await fetch(url);
    const res = await req.json();
    return res;

    // if (type === "slug") {
    //   const url = `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[slug]=${param}`;
    //   const req = await fetch(url);
    //   const res = await req.json();
    //   return res;
    // } else {
    //   const url = `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[title]=${param}`;
    //   const req = await fetch(url);
    //   const res = await req.json();
    //   return res;
    // }
  },
};

// export default { getAnime, getSongs, getQuotes, getList };
