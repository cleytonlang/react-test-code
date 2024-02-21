import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";

interface Question {
    question: string;
    answer: number;
    difficulty: string;
}

const MathQuiz: React.FC<{ questions: Question[] }> = ({
    questions }) => {
    // Use state hooks to store the current question, the user's answer, the feedback message, the score, and the quiz status
    const [currentQuestion, setCurrentQuestion] =
        useState<Question | null>(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedbackMessage, setFeedbackMessage] =
        useState("");
    const [score, setScore] = useState(0);
    const [quizStatus, setQuizStatus] = useState("in progress");
    // Use an effect hook to select a random question from the questions array when the component mounts or the user clicks on the next button
    useEffect(() => {
        // Check if the quiz is still in progress
        if (quizStatus === "in progress") {
            // Create a copy of the questions array
            let questionsCopy = [...questions];
            // Filter out the current question from the copy
            if (currentQuestion) {
                questionsCopy = questionsCopy.filter(
                    (question) => question.question !==
                        currentQuestion.question
                );
            }
            // Check if there are any questions left
            if (questionsCopy.length > 0) {
                // Select a random index from the copy
                const randomIndex = Math.floor(Math.random() *
                    questionsCopy.length);
                // Set the current question to the question at the random index
                setCurrentQuestion(questionsCopy[randomIndex]);
            } else {
                // Set the quiz status to finished
                // setQuizStatus("finished");
            }
        }
    }, [questions, currentQuestion, quizStatus]);
    // A helper function to handle the change of the user's answer
    const handleChange = (event:
        React.ChangeEvent<HTMLInputElement>) => {
        // Get the new value from the event target
        const newValue = event.target.value;
        // Update the user's answer state
        setUserAnswer(newValue);
    };
    // A helper function to handle the submission of the user's answer
    const handleSubmit = (event:
        React.FormEvent<HTMLFormElement>) => {
        // Prevent the default form behavior
        event.preventDefault();
        // Check if the user's answer is valid
        if (userAnswer !== "") {
            // Parse the user's answer as a number
            const userAnswerNumber = parseFloat(userAnswer);
            // Check if the user's answer matches the current question's answer
            if (userAnswerNumber === currentQuestion?.answer) {
                // Update the feedback message state with a positive message
                setFeedbackMessage(
                    `Correct! That was a ${currentQuestion.difficulty} question.`
                );
                // Update the score state by incrementing it by one
                setScore(score + 1);
            } else {
                // Update the feedback message state with a negative message
                setFeedbackMessage(
                    `Incorrect. The correct answer is ${currentQuestion?.answer}. That was a ${currentQuestion?.difficulty} question.`
                );
            }
        } else {
            // Update the feedback message state with an error message
            setFeedbackMessage("Please enter an answer.");
        }
    };
    // A helper function to handle the click of the next button
    const handleNext = () => {
        // Reset the user's answer state to an empty string
        setUserAnswer("");
        // Reset the feedback message state to an empty string
        setFeedbackMessage("");
    };
    // A helper function to handle the click of the finish button
    const handleFinish = () => {
        // Set the quiz status to finished
        setQuizStatus("finished");
    };
    // Return the JSX for the quiz UI
    return (
        <div className="MathQuiz">
            <h1>Test 2 - Math Quiz</h1>
            {quizStatus === "in progress" ? ( // If the quiz is in progress, display the question, the answer input, the feedback message, the score counter, and the buttons
                <>
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
                        <Button variant="contained" onClick={handleNext} disabled={feedbackMessage === ""} aria-label="Submit">Next</Button>
                        {/* <button onClick={handleNext}
                            disabled={feedbackMessage === ""}>
                            Next
                        </button> */}

                        <Button variant="contained" onClick={handleNext} disabled={questions.length - score > 0} aria-label="Submit">Finish</Button>
                        {/* <button
                            onClick={handleFinish}
                            disabled={questions.length - score > 0}
                        >
                            Finish
                        </button> */}
                    </div>
                </>
            ) : ( // If the quiz is finished, display the final message
                <div className="Final" >
                    <p>You have completed the quiz!</p>
                    <p>Your total score is {score} out of
                        {questions.length}.</p>
                    <p>
                        Your percentage is {((score / questions.length)
                            * 100).toFixed(2)}%.
                    </p>
                </div>
            )}
        </div >
    );
};
export default MathQuiz;