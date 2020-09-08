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

  async Register(id: string, pw: string, name: string) {
    try {
      const url = `${SERVER}/signup`;

      const body = {
        id,
        pw,
        name,
        description: null
      };
      const { data } = await axios.post(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new User();
