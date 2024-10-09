import React, { useEffect, useState } from "react";
import Question from "./Question";
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
                <h1>FINI</h1>
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
                        <NavigationButtons backCallback={goBack} nextCallback={nextQuestion} answer={selectedAnswer} questionIndex={currentQuestionIndex} />
                    </>
                )}
            </div>
        </div>
    )
}

export default Quizz;
