import { observer } from "mobx-react-lite";
import { SidebarView } from "../views/sidebarView";
import { logOutGoogle } from "../googleOAuth";

const Sidebar = observer(function SidebarRender({ model }) {
    return (
        <SidebarView
        onLogOut={() => {
            model.setIsLoggedIn(false);
            model.setHasCompletedLogin(false);
        }}
           
        />
    );
});

export { Sidebar };







