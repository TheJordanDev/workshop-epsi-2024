import React, { useEffect, useState } from "react";
import Question from "./Question";
import NavigationButtons from "./NavigationButtons";
import axios from "@/axios";
import StatsGraph from "./StatsGraph";
import InfoModel from "./InfoModal";

function Quizz() {

    const [waitingForNextQuestion, setWaitingForNextQuestion] = useState(false);

    const [totalQuestions, setTotalQuestions] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const [info, setInfo] = useState(null);

    const [stats, setStats] = useState(null);

    const handleAnswerSelect = (answer) => {
		setSelectedAnswer(answer);
	};

    const goBack = async () => {
        let prevQuestionResp = await axios.post("/back");
        setSelectedAnswer(null);

        if (prevQuestionResp.data.question) {
            setTotalQuestions(prevQuestionResp.data.total);
            setCurrentQuestionIndex(prevQuestionResp.data.current);
            setCurrentQuestion(prevQuestionResp.data.question);
        }
    }

    const nextQuestion = async () => {
        let nextQuestionResp = null;
        if (selectedAnswer) nextQuestionResp = await axios.post("/answer", { answer: selectedAnswer });
        else nextQuestionResp = await axios.post("/answer");

        // setSelectedAnswer(null);
        if (nextQuestionResp.data.result) {
            setStats(nextQuestionResp.data.session);
        } else {
            setTotalQuestions(nextQuestionResp.data.total);
            setCurrentQuestionIndex(nextQuestionResp.data.current);
            setCurrentQuestion(nextQuestionResp.data.question);
            if (nextQuestionResp.data.info) {
                setInfo(nextQuestionResp.data.info);
            }
        }
    }

    if (stats) {
        return (
            <>
                <h1>Résultats</h1>
			    <StatsGraph data={stats.data} />
                <span>
                    <h2>Score: {stats.total}</h2>
                    {
                        stats.total < 40 && (
                            "Faible probabilité de traits Asperger (comportement très éloigné des caractéristiques Asperger)."
                        )
                    }
                    {
                        stats.total >= 41 && stats.total <= 80 && (
                            "Probabilité modérée de traits Asperger (présence de certains comportements typiques du syndrome)."
                        )
                    }
                    {
                        stats.total > 80 && (
                            "Forte probabilité de traits Asperger (comportements majoritairement en lien avec le syndrome)."
                        )
                    }
                </span>
                <hr />
                <h3>Perception et gestion des émotions</h3>
                Explore la difficulté à comprendre, exprimer et gérer ses propres émotions ainsi que celles des autres.
                <hr />
                <h3>Interaction sociale et communication</h3>
                Évalue les défis dans les interactions sociales et la communication, notamment la difficulté à interpréter les signaux sociaux non verbaux.
                <hr />
                <h3>Sensibilité sensorielle et besoin de réconfort</h3>
                Mesure la sensibilité aux stimuli sensoriels (bruits, lumières, textures) et le besoin de routines ou de réconfort face à ces stimuli.
                <hr />
                <h3>Flexibilité cognitive et adaptation aux changements</h3>
                Examine la difficulté à s'adapter aux changements et à sortir des routines établies.
                <hr />
                <h3>Centres d'intérêt spécifiques et intensité</h3>
                Analyse la concentration intense sur des intérêts spécifiques et leur influence sur la vie quotidienne.
            </>
        )
    }

    if (!currentQuestion) {
        return (
            <div className="quizz">
                <div className="content">
                    <button
                        onClick={() => nextQuestion() }
                        style={{ fontSize: "1rem", padding: "0.5rem 1rem", textTransform: "uppercase" }}
                    >Commencer</button>
                </div>
            </div>
        )
    }

    return (
        <>
            <InfoModel isOpen={info} onClose={() => setInfo(null)} info={info} />
            <div className="quizz">
                <div className="content">
                    {waitingForNextQuestion && (
                        <h2>Waiting for next question...</h2>
                    )}
                    {!waitingForNextQuestion && (
                        <>
                            <Question
                                question={currentQuestion}
                                selectedAnswer={selectedAnswer}
                                questionIndex={currentQuestionIndex}
                                totalQuestions={totalQuestions}
                                answerCallback={handleAnswerSelect}
                            />  
                            <NavigationButtons backCallback={goBack} nextCallback={nextQuestion} answer={selectedAnswer} questionIndex={currentQuestionIndex} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Quizz;
