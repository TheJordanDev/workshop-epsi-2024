import Quizz from "./components/Quizz";
import DidYouKnowSwitch from "./components/DidYouKnowSwitch";

function App() {

	return (
		<>
			<DidYouKnowSwitch on={true} setOn={()=>{}}/>
			<Quizz />
		</>
	);
}

export default App;
