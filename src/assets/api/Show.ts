import axios from "axios";
import { SERVER } from "../../config/config.json";

class Show {
  async GetAllInfo() {
    try {
      const url = `${SERVER}/showAllInfo`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetUserStar(idx: number) {
    try {
      const url = `${SERVER}/showUserStar?idx=${idx}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Show();
