import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Vector {
    x: number;
    y: number;
}

const vectorOperation = (
    vectorA: Vector,
    vectorB: Vector,
    operation: string
): Vector | null => {
    // Check if the inputs are valid vectors
    if (
        isNaN(vectorA.x) ||
        isNaN(vectorA.y) ||
        isNaN(vectorB.x) ||
        isNaN(vectorB.y)
    ) {
        return null;
    }
    // Perform the operation based on the button clicked
    switch (operation) {
        case "+":
            // Return the vector sum of vectorA and vectorB
            return {
                x: vectorA.x + vectorB.x,
                y: vectorA.y + vectorB.y,
            };
        case "-":
            // Return the vector difference of vectorA and
            vectorB
            return {
                x: vectorA.x - vectorB.x,
                y: vectorA.y - vectorB.y,
            };
        case "*":
            // Return the scalar product of vectorA and vectorB
            return {
                x: vectorA.x * vectorB.x,
                y: vectorA.y * vectorB.y,
            };
        case "/":
            // Check if vectorB is zero
            if (vectorB.x === 0 || vectorB.y === 0) {
                return null;
            }
            // Return the scalar quotient of vectorA and vectorB
            return {
                x: vectorA.x / vectorB.x,
                y: vectorA.y / vectorB.y,
            };
        default:
            // Return null for any other operation
            return null;
    }
};
// The VectorCalculator component
const VectorCalculator: React.FC<{
    vectorA: Vector;
    vectorB: Vector;
}> = ({ vectorA, vectorB }) => {
    // Use state hooks to store the values of the vectors and the result
    const [vectorAState, setVectorAState] =
        useState(vectorA);
    const [vectorBState, setVectorBState] =
        useState(vectorB);
    const [resultState, setResultState] = useState<Vector |
        null>(null);
    // Use state hooks to store the error message and theoperation
    const [errorMessage, setErrorMessage] = useState("");
    const [operation, setOperation] = useState("");
    // A helper function to handle the change of vectorvalues
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        vector: string,
        coordinate: string
    ) => {
        // Get the new value from the event target
        const newValue = parseFloat(event.target.value);
        // Update the state of the vector based on the vector and coordinate
        if (vector === "A") {
            if (coordinate === "x") {
                setVectorAState({ ...vectorAState, x: newValue });
            } else if (coordinate === "y") {
                setVectorAState({ ...vectorAState, y: newValue });
            }
        } else if (vector === "B") {
            if (coordinate === "x") {
                setVectorBState({ ...vectorBState, x: newValue });
            } else if (coordinate === "y") {
                setVectorBState({ ...vectorBState, y: newValue });
            }
        }
        // Perform the operation on the updated vectors and update the result state
        const result = vectorOperation(vectorAState,
            vectorBState, operation);
        setResultState(result);
        // Check if the result is null and update the error message accordingly
        if (result === null) {
            setErrorMessage(`Invalid operation: ${operation}`);
        } else {
            setErrorMessage("");
        }
    };
    // A helper function to handle the click of operation buttons
    const handleClick = (event:
        React.MouseEvent<HTMLButtonElement>) => {
        // Get the operation from the event target
        const operation = event.currentTarget.value;
        // Update the operation state
        setOperation(operation);
        // Perform the operation on the vectors and update the result state
        const result = vectorOperation(vectorAState,
            vectorBState, operation);
        setResultState(result);
        // Check if the result is null and update the error message accordingly
        if (result === null) {
            setErrorMessage(`Invalid operation: ${operation}`);
        } else {
            setErrorMessage("");
        }
    };
    // Return the JSX for the calculator UI
    return (
        <div className="VectorCalculator">
            <h1>Vector Calculator</h1>
            <div className="Vectors">
                <div className="Vector">
                    <label>A</label>
                    <TextField inputProps={{ type: 'number', value: vectorAState.x }} onChange={(event: any) => handleChange(event, "A", "x")} />
                    <TextField inputProps={{ type: 'number', value: vectorAState.y }} onChange={(event: any) => handleChange(event, "A", "y")} />
                </div>
                <div className="Vector">
                    <label>B</label>
                    <TextField inputProps={{ type: 'number', value: vectorBState.x }} onChange={(event: any) => handleChange(event, "B", "x")} />
                    <TextField inputProps={{ type: 'number', value: vectorBState.y }} onChange={(event: any) => handleChange(event, "B", "y")} />
                </div>
            </div>
            <div className="Buttons">
                <Button variant="contained" onClick={handleClick} value="+">+</Button>
                <Button variant="contained" onClick={handleClick} value="-">-</Button>
                <Button variant="contained" onClick={handleClick} value="*">*</Button>
                <Button variant="contained" onClick={handleClick} value="/">/</Button>
            </div>

            <strong>Result</strong>
            <div className="Result">
                {resultState ? (
                    <>
                        <TextField inputProps={{ type: 'number', value: resultState.x }} aria-readonly />
                        <TextField inputProps={{ type: 'number', value: resultState.y }} aria-readonly />
                    </>
                ) : (
                    <span className="Error"> {errorMessage}</span>
                )}
            </div>

        </div>
    );
};
export default VectorCalculator;