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
      console.log(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getQuotes: async (param, type) => {
    if (type === "anime") {
      const url = `${process.env.REACT_APP_API_URL_QUETOS}/quotes/anime?title=${param}`;
      const req = await fetch(url);
      if (req.ok) {
        return await req.json();
      } else {
        console.log("Something went wrong");
      }
      // return res;
    } else {
      const url = `${process.env.REACT_APP_API_URL_QUETOS}/quotes/character?title=${param}`;
      const req = await fetch(url);
      return await req.json();
      // return res;
    }
  },
  getSongs: async (param, type) => {
    if (type === "title") {
      const url = `${process.env.REACT_APP_API_URL_SONGS}/song?title=${param}`;
      const req = await fetch(url);
      if (req.ok) {
        return await req.json();
      } else {
        console.log("Something went wrong");
      }
      // return res;
    } else {
      const url = `${process.env.REACT_APP_API_URL_SONGS}/song?artist=${param}`;
      const req = await fetch(url);
      return await req.json();
      // return res;
    }
  },
};
