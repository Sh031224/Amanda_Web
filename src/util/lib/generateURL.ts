import { SERVER } from "../../config/config.json";

export default (data: string) => {
  return `${SERVER}/image/${data}`;
};
