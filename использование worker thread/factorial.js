module.exports = function factorial(x) {
  if (x == 0 || x == 1) return 1;
  return x * factorial(x - 1);
};
