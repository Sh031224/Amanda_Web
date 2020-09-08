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

  async GetMyInfo() {
    try {
      const url = `${SERVER}/showMyInfo`;

      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };

      const { data } = await axios.get(url, config);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async UploadProfile(files: File) {
    try {
      const url = `${SERVER}/updateProfileImage`;

      const formData = new FormData();
      formData.append("image", files);

      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };

      const { data } = await axios.post(url, formData, config);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async UpdateMyInfo(name: string, description: string) {
    try {
      const url = `${SERVER}/updateMyInfo`;

      const body = {
        name,
        description
      };

      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };

      const { data } = await axios.post(url, body, config);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new User();
