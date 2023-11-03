import React, {useCallback} from "react";
import Cookies from "js-cookie";

const SettingsItem = () => {
    const handleLogout = useCallback(() => {
        Cookies.remove('token');
        }, []);
    
    return (
        <button onClick={handleLogout}>выйти</button>
        );
};

export default SettingsItem;
