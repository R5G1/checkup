const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, M;
const cookies = [];

function canEatAll(cookies, K, M) {
  let hoursNeeded = 0;
  for (const c of cookies) {
    hoursNeeded += Math.ceil(c / K);
  }
  return hoursNeeded <= M;
}

let inputCount = 0;

rl.on('line', (line) => {
  if (inputCount === 0) {
    [N, M] = line.split(' ').map(Number);
  } else {
    const Cn = parseInt(line);
    cookies.push(Cn);
  }

  inputCount++;

  if (inputCount > N) {
    rl.close();
  }
});

rl.on('close', () => {
  let left = 1;
  let right = 0;

  for (const c of cookies) {
    right = Math.max(right, c);
  }

  let result = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canEatAll(cookies, mid, M)) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  console.log(result);
  process.exit(0);
});
