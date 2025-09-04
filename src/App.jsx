import Header from "./Components/Header.jsx";
import UserInput from "./Components/UserInput.jsx";
import Result from "./Components/Result.jsx";
import {useState} from "react";

function App() {
    const [calculator, setCalculator] = useState({
        initialInvestment: '',
        annualInvestment: '',
        expectedReturn: '',
        duration: '',
    });

    function updateCalculator(e) {
        e.preventDefault();
        const {name, value} = e.target;
        setCalculator(prevState => ({
            ...prevState,
            [name]: +value,
        }));
    }

    return (
        <>
            <Header/>
            <UserInput calculator={calculator} updateCalculator={updateCalculator}/>
            <Result calculator={calculator}/>
        </>
    );
}

export default App
