import {formatter} from "../util/investment.js";

export default function Result({calculatorResult}) {
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
                calculatorResult.map((result, index) => (
                    <tr key={index}>
                        <td>{result.year}</td>
                        <td>{formatter.format(result.interest)}</td>
                        <td>{formatter.format(result.valueEndOfYear)}</td>
                        <td>{formatter.format(result.annualInvestment)}</td>
                        <td>{formatter.format(result.annualInvestment)}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}