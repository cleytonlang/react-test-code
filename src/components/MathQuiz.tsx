import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect, useCallback } from "react";

interface Question {
    question: string;
    answer: number;
    difficulty: string;
}

const MathQuiz: React.FC<{ questions: Question[] }> = ({
    questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [score, setScore] = useState(0);
    const [quizStatus, setQuizStatus] = useState("in progress");

    const generateRandomQuestion = useCallback(() => {
        // Check if the quiz is still in progress
        if (quizStatus === "in progress") {
            // Create a copy of the questions array
            let questionsCopy = [...questions];
            // Filter out the current question from the copy
            if (currentQuestion) {
                questionsCopy = questionsCopy.filter(
                    (question) => question.question !== currentQuestion.question
                );
            }
            // Check if there are any questions left
            if (questionsCopy.length > 0) {
                // Select a random index from the copy
                const randomIndex = Math.floor(Math.random() * questionsCopy.length);

                const checkAnswerAlreadyGiven = userAnswers.filter((answer: string) => answer === questionsCopy[randomIndex].question);

                if (!checkAnswerAlreadyGiven.length) {
                    // Set the current question to the question at the random index
                    setCurrentQuestion(questionsCopy[randomIndex]);
                } else {
                    generateRandomQuestion();
                }
            } else {
                // Set the quiz status to finished
                setQuizStatus("finished");
            }
        }
    }, [questions, currentQuestion, userAnswers, quizStatus, setCurrentQuestion, setQuizStatus]);

    useEffect(() => {
        generateRandomQuestion()
    }, [questions]);

    // A helper function to handle the change of the user's answer
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    }, [setUserAnswer]);

    // A helper function to handle the submission of the user's answer
    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Check if the user's answer is valid
        if (userAnswer !== "") {
            // Parse the user's answer as a number
            const userAnswerNumber = parseFloat(userAnswer);
            // Check if the user's answer matches the current question's answer
            if (currentQuestion && userAnswerNumber === currentQuestion.answer) {
                // Update the feedback message state with a positive message
                setFeedbackMessage(`Correct! That was a ${currentQuestion.difficulty} question.`);
                // Update the score state by incrementing it by one
                setScore(score + 1);
            } else {
                // Update the feedback message state with a negative message
                setFeedbackMessage(`Incorrect. The correct answer is ${currentQuestion?.answer}. That was a ${currentQuestion?.difficulty} question.`);
            }
            // Record the user's answer
            if (currentQuestion?.question) {
                setUserAnswers([...userAnswers, currentQuestion.question]);
            }
        } else {
            // Update the feedback message state with an error message
            setFeedbackMessage("Please enter an answer.");
        }
    }, [userAnswer, currentQuestion, userAnswers, score, setFeedbackMessage, setScore, setUserAnswers]);

    // A helper function to handle the click of the next button
    const handleNext = useCallback(() => {
        // Reset the user's answer state to an empty string, the feedback message and generate a new question
        setUserAnswer("");
        setFeedbackMessage("");
        generateRandomQuestion();
    }, [setUserAnswer, setFeedbackMessage, generateRandomQuestion]);

    // A helper function to handle the click of the finish button
    const handleFinish = useCallback(() => {
        // Set the quiz status to finished
        setQuizStatus("finished");
    }, [setQuizStatus]);

    return (
        <div className="MathQuiz">
            <h1>Test 2 - Math Quiz</h1>
            {quizStatus === "in progress" ? ( // If the quiz is in progress, display the question, the answer input, the feedback message, the score counter, and the buttons
                <section aria-label="Math Quiz" >
                    <div className="Question">
                        <p>{currentQuestion?.question}</p>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                inputProps={{
                                    id: "vectoraX",
                                    type: 'number',
                                    value: userAnswer,
                                    'aria-label': 'Vector A X component',
                                    'aria-required': 'true',
                                }}
                                placeholder="Enter your answer"
                                onChange={handleChange}
                            />
                            <Button variant="contained" type="submit" aria-label="Submit">Submit</Button>
                        </form>
                    </div>
                    <div className="Feedback">
                        <p>{feedbackMessage}</p>
                    </div>
                    <div className="Score">
                        <p>
                            Score: {score}/{questions.length}
                        </p>
                    </div>
                    <div className="Buttons">
                        <Button variant="contained" onClick={handleNext} disabled={questions.length === userAnswers.length} aria-label="Next">Next</Button>
                        <Button variant="contained" onClick={handleFinish} disabled={questions.length !== userAnswers.length} aria-label="Finish">Finish</Button>
                    </div>
                </section>
            ) : ( // If the quiz is finished, display the final message
                <section aria-label="Final Message" className="Final" >
                    <p>You have completed the quiz!</p>
                    <p>Your total score is {score} out of
                        {questions.length}.</p>
                    <p>
                        Your percentage is {((score / questions.length)
                            * 100).toFixed(2)}%.
                    </p>
                </section>
            )}

        </div >
    );
};
export default MathQuiz;