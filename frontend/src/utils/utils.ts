import { USER } from "../constants/constants";
import { User } from "../contexts/auth/auth.context";

export const getUser = ()=>{
    const item = localStorage.getItem(USER);
    const user : User  = JSON.parse(item || '{}');
    const userId = user['id'];
    return userId;
}