import axios from "axios";
import { SERVER } from "../../config/config.json";

class Profile {
  async ShowUserInfo(id: string) {
    try {
      const url = `${SERVER}/showUserInfo?id=${id}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async ShowUserStar(idx: number) {
    try {
      const url = `${SERVER}/showUserStar?idx=${idx}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Profile();
