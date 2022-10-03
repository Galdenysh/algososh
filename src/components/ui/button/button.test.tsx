import { Button } from "./button";
import renderer from "react-test-renderer";

test("button with text", () => {
  const tree = renderer.create(<Button text="Button" />).toJSON();
  expect(tree).toMatchSnapshot();
});
