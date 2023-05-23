import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders the correct children", () => {
    render(<Button>Click me!</Button>);

    const element = screen.getByText("Click me!");
    expect(element).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me!</Button>);

    const element = screen.getByText("Click me!");
    element.click();
    expect(handleClick).toBeCalledTimes(1);
  });
});
