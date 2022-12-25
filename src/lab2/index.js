
const f = (x) => Math.sin(x) - x + 2.7;
const df = (x) => Math.cos(x) - 1;
const a = 2.5, b = 3.5, eps = 0.5 * (10 ** -5);

function half_div(a, b) {
  let x = b;
  let x_prev = a;
  let iterations = 0;
  while (Math.abs(x - x_prev) > eps) {
    x_prev = x
    x = (a + b) / 2;
    if (f(a) * f(x) >= 0) a = x;
    else b = x;
    iterations += 1;
  }
  return { x, iterations };
}

console.log('Метод половинного деления:', half_div(a, b));


function newton(x0) {
  let x_prev = x0;
  let x = x_prev - f(x_prev) / df(x_prev);
  let iterations = 1;
  while (Math.abs(x - x_prev) > eps) {
    x_prev = x;
    x = x_prev - f(x_prev) / df(x_prev);
    iterations++;
  }
  return { x, iterations };
}

console.log('Метод Ньютона:', newton(a));

function modified_nuton(x0) {
  let x_prev = x0;
  let dfx0 = df(x0);
  let x = x_prev - f(x_prev)  / dfx0;
  let iterations = 1;
  while(Math.abs(x - x_prev) > eps) {
    x_prev = x;
    x = x_prev - f(x_prev) / dfx0;
    iterations++;
  }
  return { x, iterations };
}


console.log('Модифицированный метод Ньютона:', modified_nuton(a));


function movable_chords() {
  let x0 = a
  let x_prev = b
  let x = x_prev - (f(x_prev) * (x_prev - x0)) / (f(x_prev) - f(x0))
  let iterations = 1
  while (Math.abs(x - x_prev) > eps) {
    let xn_1 = x_prev
    x_prev = x
    x = x_prev - (f(x_prev) * (x_prev - xn_1)) / (f(x_prev) - f(xn_1))
    iterations += 1
  }
        
  return { x, iterations };
}

console.log('Метод подвижных хорд:', movable_chords());


function fixed_chords() {
  let x0 = a
  let x_prev = b
  let x = x_prev - (f(x_prev) * (x_prev - x0)) / (f(x_prev) - f(x0))
  let iterations = 1
  while (Math.abs(x - x_prev) > eps) {
    x_prev = x
    x = x_prev - (f(x_prev) * (x_prev - x0)) / (f(x_prev) - f(x0))
    iterations += 1
  }
      
  return { x, iterations }
}

console.log('Метод неподвижных хорд:', fixed_chords());

function dichotomy() {
  let iterations = 1;
  let start = a;
  let end = b;
  let x = b;
  let x_next = a;
  while(Math.abs(x - x_next) >= eps) {
    x_next = x;
    x = (start + end) / 2;
    if (f(start) * f(x) >= 0) start = x;
    else end = x;
    iterations++;
  }
  return { x, iterations }
}

console.log('Дихотомия:', dichotomy());

const foo = (x) => Math.sin(x) + 2.7;

function simple_iteration() {
  let x0 = a;
  let xn = foo(x0);
  let x = foo(xn);
  let iterations = 2;
  while (Math.abs(x - xn) > eps) {
    xn = x;
    x = foo(xn);
    iterations++
  }
  return { x, iterations }
}

console.log('Метод простой итерации:', simple_iteration());
