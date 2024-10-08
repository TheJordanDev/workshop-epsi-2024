import React from "react";
import AnswerButton from "./AnswerButton";

const COLORS = {
	"-3": "#fc00fc",
	"-2": "#c000c0",
	"-1": "#820082",
	"0": "#808080",
	"+1": "#028700",
	"+2": "#01c400",
	"+3": "#00f900",
}

function Question({ question, questionIndex, totalQuestions, answerCallback, selectedAnswer }) {
    const handleAnswerChange = (event) => {
        answerCallback(event.target.id);
    };

    return (
        <div className="question">
            <h1>{questionIndex+1}/{totalQuestions}</h1>
            <div>
                <h1>{question}</h1>
            </div>
            <form>
                <ul className="answer-container">
                    <li>
                        <AnswerButton
                            id="answer-1"
                            color={COLORS["-3"]}
                            onChange={handleAnswerChange}
                            checked={selectedAnswer === "answer-1"}
                        />
                    </li>
                    <li>
                        <AnswerButton
                            id="answer-2"
                            color={COLORS["-2"]}
                            onChange={handleAnswerChange}
                            checked={selectedAnswer === "answer-2"}
                        />
                    </li>
                    <li>
                        <AnswerButton
                            id="answer-3"
                            color={COLORS["-1"]}
                            onChange={handleAnswerChange}
                            checked={selectedAnswer === "answer-3"}
                        />
                    </li>
                    <li>
                        <AnswerButton
                            id="answer-4"
                            color={COLORS["0"]}
                            onChange={handleAnswerChange}
                            checked={selectedAnswer === "answer-4"}
                        />
                    </li>
                    <li>
                        <AnswerButton
                            id="answer-5"
                            color={COLORS["+1"]}
                            onChange={handleAnswerChange}
                            checked={selectedAnswer === "answer-5"}
                        />
                    </li>
                    <li>
                        <AnswerButton
                            id="answer-6"
                            color={COLORS["+2"]}
                            onChange={handleAnswerChange}
                            checked={selectedAnswer === "answer-6"}
                        />
                    </li>
                    <li>
                        <AnswerButton
                            id="answer-7"
                            color={COLORS["+3"]}
                            onChange={handleAnswerChange}
                            checked={selectedAnswer === "answer-7"}
                        />
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default Question;