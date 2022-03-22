const factorial = (x) => {
  if (x == 0 || x == 1) return 1;
  return x * factorial(x - 1);
};

const bigCompute = ({ array }) => {
  const arr = [];
  for (let i = 0; i < 100000000; i++) arr.push(i * i);
  return array.map((item) => factorial(item));
};

module.exports = { bigCompute };
