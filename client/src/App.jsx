import Quizz from "./components/Quizz";
import DidYouKnowSwitch from "./components/DidYouKnowSwitch";
import useKonamiCode from "./components/easter-egg/useKonamiCode";
import RickRollModal from "./components/easter-egg/RickRockModal";

function App() {
	const { isModalOpen, closeModal } = useKonamiCode();

    useKonamiCode();

	return (
		<>
			<DidYouKnowSwitch on={true} setOn={()=>{}}/>
			<Quizz />
			<RickRollModal isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
}

export default App;
