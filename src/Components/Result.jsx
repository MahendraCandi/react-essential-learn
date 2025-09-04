import {calculateInvestmentResults, formatter} from "../util/investment.js";

export default function Result({calculator}) {
    let calculatorResults = [];
    let initialInvestment = 0;
    if (calculator.initialInvestment &&
        calculator.annualInvestment &&
        calculator.expectedReturn &&
        calculator.duration) {
        calculatorResults = calculateInvestmentResults(calculator);

        initialInvestment =
            calculatorResults[0].valueEndOfYear -
            calculatorResults[0].interest -
            calculatorResults[0].annualInvestment;
    }

    return (
        <table id={"result"}>
            <thead>
            <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
            </tr>
            </thead>
            <tbody>
            {
                calculatorResults.map((result, index) => {
                    const totalInterest = result.valueEndOfYear - result.annualInvestment *
                        result.year - initialInvestment;
                    const totalAmountInvestment = result.valueEndOfYear - totalInterest;
                    return (
                        <tr key={index}>
                            <td>{result.year}</td>
                            <td>{formatter.format(result.valueEndOfYear)}</td>
                            <td>{formatter.format(result.interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(totalAmountInvestment)}</td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    );
}