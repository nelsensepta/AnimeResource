export default {
  getList: async function (page) {
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
};
