import React, { useEffect, useState } from "react";
import Question from "./Question";
import "@/styles/Quizz.scss";
import NavigationButtons from "./NavigationButtons";
import axios from "@/axios";

function Quizz() {

    const [waitingForNextQuestion, setWaitingForNextQuestion] = useState(false);

    const [totalQuestions, setTotalQuestions] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const [stats, setStats] = useState(null);

    const handleAnswerSelect = (answer) => {
		setSelectedAnswer(answer);
	};

    const nextQuestion = async () => {
        let nextQuestionResp = null;
        console.log("Selected answer:", selectedAnswer);
        if (selectedAnswer) nextQuestionResp = await axios.post("/answer", { answer: selectedAnswer });
        else nextQuestionResp = await axios.post("/answer");

        setSelectedAnswer(null);
        if (nextQuestionResp.data.result) {
            setStats(nextQuestionResp.data.session.stats);
        } else {
            setTotalQuestions(nextQuestionResp.data.total);
            setCurrentQuestionIndex(nextQuestionResp.data.current);
            setCurrentQuestion(nextQuestionResp.data.question);
        }
    }

    if (stats) {
        return (
            <>
                <h1>FINIS</h1>
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
                    >Start Quiz</button>
                </div>
            </div>
        )
    }

    return (
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
                        <NavigationButtons nextCallback={nextQuestion} answer={selectedAnswer} questionIndex={currentQuestionIndex} />
                    </>
                )}
            </div>
        </div>
    )
}

export default Quizz;
