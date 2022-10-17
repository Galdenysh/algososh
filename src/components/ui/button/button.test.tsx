import renderer from "react-test-renderer";
import { render, fireEvent, screen } from "@testing-library/react";
import { Button } from "./button";

describe("button", () => {
  test("button with text", () => {
    const elem = renderer.create(<Button text="Button" />).toJSON();
    expect(elem).toMatchSnapshot();
  });

  test("button without text", () => {
    const elem = renderer.create(<Button />).toJSON();
    expect(elem).toMatchSnapshot();
  });

  test("button disabled", () => {
    const elem = renderer.create(<Button disabled={true} />).toJSON();
    expect(elem).toMatchSnapshot();
  });

  test("button isLoader", () => {
    const elem = renderer.create(<Button isLoader={true} />).toJSON();
    expect(elem).toMatchSnapshot();
  });

  test("button callback", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} text="Button" />);
    const button = screen.getByText("Button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
