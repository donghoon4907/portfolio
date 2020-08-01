import { getBrowser, getViewPortSize } from "./module";

export default core => {
  const { variables } = core;

  variables.BROWSER = getBrowser();
  const { width, height } = getViewPortSize(variables.BROWSER);
  variables.VIEWPORT_WIDTH = width;
  variables.VIEWPORT_HEIGHT = height;
  return core;
};
