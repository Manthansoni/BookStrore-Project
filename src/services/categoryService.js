import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/category";
const getAll = async (params) => {
  let url = `${BASEURL}/all`;
  if (params) {
    url = `${BASEURL}`;
  }
  return axios.get(url, { params }).then((res) => {
    return res;
  });
};

const getById = async (id) => {
  const url = `${BASEURL}/byId?id=${id}`;
  return axios.get(url).then((res) => {
    return res;
  });
};

const deleteCategory = async (id) => {
  const url = `${BASEURL}?id=${id}`;
  return axios.delete(url).then((res) => {
    return res;
  });
};

const save = async (data) => {
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

const categoryService = { getAll, getById, deleteCategory, save };

export default categoryService;
