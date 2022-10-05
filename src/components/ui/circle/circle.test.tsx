import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe("circle", () => {
  test("circle without words", () => {
    const elem = renderer.create(<Circle />);
    expect(elem).toMatchSnapshot();
  });

  test("circle with words", () => {
    const elem = renderer.create(<Circle letter="test" />);
    expect(elem).toMatchSnapshot();
  });

  test("circle with worlds in the head", () => {
    const elem = renderer.create(<Circle head="test" />);
    expect(elem).toMatchSnapshot();
  });

  test("cirlce with react element in the head", () => {
    const elem = renderer.create(<Circle head={<Circle />} />);
    expect(elem).toMatchSnapshot();
  });

  test("circle with worlds in the tail", () => {
    const elem = renderer.create(<Circle tail="test" />);
    expect(elem).toMatchSnapshot();
  });

  test("cirlce with react element in the tail", () => {
    const elem = renderer.create(<Circle tail={<Circle />} />);
    expect(elem).toMatchSnapshot();
  });

  test("circle with index", () => {
    const elem = renderer.create(<Circle index={1} />);
    expect(elem).toMatchSnapshot();
  });

  test("circle with prop isSmall === true", () => {
    const elem = renderer.create(<Circle isSmall={true} />);
    expect(elem).toMatchSnapshot();
  });

  test("circle in state default", () => {
    const elem = renderer.create(<Circle state={ElementStates.Default} />);
    expect(elem).toMatchSnapshot();
  });

  test("circle in state changing", () => {
    const elem = renderer.create(<Circle state={ElementStates.Changing} />);
    expect(elem).toMatchSnapshot();
  });

  test("circle in state modified", () => {
    const elem = renderer.create(<Circle state={ElementStates.Modified} />);
    expect(elem).toMatchSnapshot();
  });
});
