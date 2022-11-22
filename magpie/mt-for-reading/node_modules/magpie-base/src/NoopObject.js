export default (cb) => {
  const obj = new Proxy(() => obj, {
    get: (target, prop) => {
      if (cb) {
        cb();
      }
      if (
        prop === 'valueOf' ||
        prop === 'toString' ||
        prop === Symbol.toPrimitive
      ) {
        return () => '';
      }
      return obj;
    }
  });
  return obj;
};
