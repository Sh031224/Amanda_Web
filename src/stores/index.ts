import ShowStore from "./ShowStore";
import UserStore from "./UserStore";

const stores = {
  UserStore: new UserStore(),
  ShowStore: new ShowStore()
};

export default stores;
