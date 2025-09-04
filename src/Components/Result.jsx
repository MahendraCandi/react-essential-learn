import {formatter} from "../util/investment.js";

export default function Result({calculatorResult}) {

    let initialInvestment = 0;
    if (calculatorResult.length > 0) {
         initialInvestment =
            calculatorResult[0].valueEndOfYear -
            calculatorResult[0].interest -
            calculatorResult[0].annualInvestment;
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
                calculatorResult.map((result, index) => {
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