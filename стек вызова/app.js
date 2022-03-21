const a = 5;

const b = () => {
  return c();
};

const c = () => {
  return d();
};

const d = () => {
  console.log(a);
};

setTimeout(() => {
  console.log("Timeout");
}, 1000);

b();
