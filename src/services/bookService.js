import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";

class BookService {
    GetAllBooks = async (payload) => {
        return axios.get(`${BASEURL}/all`,payload)
    };

    getAll = async (params) => {
        const url = `${BASEURL}`;
        return axios.get(url, { params }).then((res) => {
          return res;
        });
      };

      getById = async (id) => {
        const url = `${BASEURL}/byId?id=${id}`;
        return axios.get(url).then((res) => {
          return res;
        });
      };

      deleteBook = async (id) => {
        const url = `${BASEURL}?id=${id}`;
        return axios.delete(url).then((res) => {
          return res;
        });
      };

      save = async (data) => {
        if (data.id) {
          const url = `${BASEURL}`;
          return axios.put(url, data).then((res) => {
            return res;
          });
        } else {
          const url = `${BASEURL}`;
          return axios.post(url, data).then((res) => {
            return res;
          });
        }
      };
};



export default new BookService();