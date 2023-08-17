import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";

class UserService {
    getAllUsers = async (params) => {
        const url = `${BASEURL}`;
        return axios.get(url, { params }).then((res) => {
          return res;
        });
      };

      getAllRoles = async () => {
        const url = `${BASEURL}/roles`;
        return axios.get(url).then((res) => {
          console.log("Role",res);
          return res;
        });
      };
      
      getById = async (id) => {
        const url = `${BASEURL}/byId?id=${id}`;
        return axios.get(url).then((res) => {
          console.log("GetByID",res);
          return res;
        });
      };
      
      deleteUser = async (id) => {
        const url = `${BASEURL}?id=${id}`;
        return axios.delete(url).then((res) => {
          return res;
        });
      };

      update = async (data) => {
        const url = `${BASEURL}`;
        return axios.put(url, data).then((res) => {
          return res;
        });
      };
      
      updateProfile = async (data) => {
        const url = `${BASEURL}`;
        return axios.put(url, data).then((res) => {
          return res;
        });
      };
}

export default new UserService();