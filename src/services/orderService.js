import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/order";

class OrderService{
  placeOrder = async (order) => {
    const url = `${BASEURL}`;
    return axios.post(url, order).then((res) => {
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };
  
}

export default new OrderService();
