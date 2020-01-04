import { createStore } from "redux";
import UserReducer from "./UserReducer";

const Store = createStore(UserReducer);

export default Store;
