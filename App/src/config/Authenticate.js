import { AsyncStorage } from "react-native";

export const isAuthenticated = () => {
    let token = AsyncStorage.getItem('token');

    if(token !== "" && token !== null && token !== undefined) {
        return true;
    }

    return false;
};
