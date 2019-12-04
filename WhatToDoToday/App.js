import RegisterScreen  from './RegistroLugar';
import HomeScreen  from './Home';
import ResenaScreen from './Review';
import LugarScreen from './Lugares';
import DetalleLugar from './DetalleLugares';
import { createAppContainer } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";


const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Resena: {screen: ResenaScreen},
  Lugar: {screen: RegisterScreen},
  VerLugar: {screen: LugarScreen},
  DetalleLugar: {screen: DetalleLugar}
});

const App = createAppContainer(MainNavigator);

export default App;