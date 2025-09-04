import Header from "./Components/Header.jsx";
import UserInput from "./Components/UserInput.jsx";
import Result from "./Components/Result.jsx";
import {useState} from "react";
import {calculateInvestmentResults} from "./util/investment.js";

function App() {
    const [calculator, setCalculator] = useState({
        input: {
            initialInvestment: '',
            annualInvestment: '',
            expectedReturn: '',
            duration: '',
        },
        results: []
    });

    function updateCalculator(e) {
        e.preventDefault();
        const {name, value} = e.target;
        setCalculator(prevState => {
            const newState = {
                input : {
                    ...prevState.input,
                    [name]: +value,
                },
                results: [...prevState.results]
            }

            if (!newState.initialInvestment ||
                !newState.annualInvestment ||
                !newState.expectedReturn ||
                !newState.duration) {
                newState.results = calculateInvestmentResults(newState.input);
            }
            return newState;
        });
    }

    return (
        <>
            <Header/>
            <UserInput calculator={calculator.input} updateCalculator={updateCalculator}/>
            <Result calculatorResult={calculator.results}/>
        </>
    );
}

export default App
