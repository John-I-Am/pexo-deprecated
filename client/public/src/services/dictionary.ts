import axios from "axios";

const define = async (word: string): Promise<any> => {
  // const config: any = {
  //   headers: { Authorization: `bearer ${token}` },
  // };
  const response = await axios.get(`/api/define/${word}`);
  return response.data;
};

export default { define };
