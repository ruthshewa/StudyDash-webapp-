import { observer } from "mobx-react-lite";
import { HomeView } from "../views/homeView";

const Home = observer(
    function HomeRender(props) {

        
        
        return(
            <HomeView 
            model={props.model}
            
            // onLogOut={() => {
            //     model.setIsLoggedIn(false);
            //     model.setHasCompletedLogin(false);
            // }}
            />
        )
    }
)

export { Home } 