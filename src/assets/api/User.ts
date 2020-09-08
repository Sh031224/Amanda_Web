import axios from "axios";
import { SERVER } from "../../config/config.json";

class User {
  async Login(id: string, pw: string) {
    try {
      const url = `${SERVER}/signin`;

      const body = {
        id,
        pw
      };

      const { data } = await axios.post(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new User();
