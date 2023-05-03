import ResultBox from "./ResultBox";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { formatAmountInCurrency } from "../../utils/formatAmountInCurrency";
import { convertPLNToUSD } from "../../utils/convertPLNToUSD";
import { convertUSDToPLN } from "../../utils/convertUSDToPLN";
describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  it("should render proper info about conversion when PLN -> USD", () => {
    const testCases = [
      { amount: "100", from: "PLN", to: "USD" },
      { amount: "20", from: "PLN", to: "USD" },
      { amount: "200", from: "PLN", to: "USD" },
      { amount: "345", from: "PLN", to: "USD" },
    ];
    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );
      const finalResult = screen.getByTestId("finalResult");

      const USD = convertPLNToUSD(parseInt(testObj.amount));
      const PLN = formatAmountInCurrency(testObj.amount, testObj.from);

      expect(finalResult).toHaveTextContent(PLN + " = " + USD);
      cleanup();
    }
  });
  it("should render proper info about conversion when USD -> PLN", () => {
    const testCases = [
      { amount: "100", from: "USD", to: "PLN" },
      { amount: "20", from: "USD", to: "PLN" },
      { amount: "200", from: "USD", to: "PLN" },
      { amount: "345", from: "USD", to: "PLN" },
    ];
    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );
      const finalResult = screen.getByTestId("finalResult");

      const PLN = convertUSDToPLN(parseInt(testObj.amount));
      const USD = formatAmountInCurrency(testObj.amount, testObj.from);

      expect(finalResult).toHaveTextContent(USD + " = " + PLN);
      cleanup();
    }
  });
  it("should render proper info about conversion when FROM = TO", () => {
    const testCases = [
      { amount: "100", from: "USD", to: "USD" },
      { amount: "20", from: "PLN", to: "PLN" },
      { amount: "200", from: "USD", to: "USD" },
      { amount: "345", from: "PLN", to: "PLN" },
    ];
    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );
      const finalResult = screen.getByTestId("finalResult");

      const amount = formatAmountInCurrency(testObj.amount, testObj.from);

      expect(finalResult).toHaveTextContent(amount + " = " + amount);
      cleanup();
    }
  });
  it("should return Wrong value when input is lower than zero", () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);

    const finalResult = screen.getByTestId("finalResult");

    expect(finalResult).toHaveTextContent("Wrong value...");
  });
});
