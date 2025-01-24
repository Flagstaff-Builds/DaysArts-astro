export const lazyLoadComponent = async (componentPath: string) => {
  const component = await import(componentPath);
  return component.default;
};
