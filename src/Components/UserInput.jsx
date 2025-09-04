export default function UserInput({calculator, updateCalculator}) {
    return (
        <>
            <div id={"user-input"}>
                <div className={"input-group"}>
                    <div>
                        <label htmlFor={"initial"}>INITIAL INVESTMENT</label>
                        <input type={"number"} id={"initial"}
                               name={"initialInvestment"}
                               value={calculator.initialInvestment}
                               onChange={updateCalculator}/>
                    </div>
                    <div>
                        <label htmlFor={"annual"}>ANNUAL INVESTMENT</label>
                        <input type={"number"} id={"annual"}
                               name={"annualInvestment"}
                               value={calculator.annualInvestment}
                               onChange={updateCalculator}/>
                    </div>
                </div>
                <div className={"input-group"}>
                    <div>
                        <label htmlFor={"expected-return"}>EXPECTED INVESTMENT</label>
                        <input type={"number"} id={"expected-return"}
                               name={"expectedReturn"}
                               value={calculator.expectedReturn}
                               onChange={updateCalculator}/>
                    </div>
                    <div>
                        <label htmlFor={"duration"}>DURATION</label>
                        <input type={"number"} id={"duration"}
                               name={"duration"}
                               value={calculator.duration}
                               onChange={updateCalculator}/>
                    </div>
                </div>
            </div>
        </>
    );
}