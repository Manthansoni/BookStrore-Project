import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/cart";

class CartService {

    add = async (data) => {
    const url = `${BASEURL}`;
    return axios.post(url, data).then((res) => {
        return res;
      })
      .catch((e) => {
        return Promise.reject(e.response);
      });
  };
  
  getList = async (id) => {
    const url = `${BASEURL}?userId=${id}`;
    return axios.get(url).then((res) => {
      return res.data.result;
    });
  };
  
  updateItem = async (data) => {
    const url = `${BASEURL}`;
    return axios.put(url, data).then((res) => {
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
  
  removeItem = async (id) => {
    const url = `${BASEURL}?id=${id}`;
    return axios.delete(url).then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  };
};
  
export default new CartService();