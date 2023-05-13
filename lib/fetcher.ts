import axios from "axios";

const fetcher = async (url: string) => {
  const t = await axios.get(url);
  console.log(t);
  return axios.get(url).then((res) => res.data);
};

export default fetcher;
