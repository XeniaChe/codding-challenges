const maxNumberOfBalloons = (text: string) => {
  const counts = new Map(),
    target = 'baloon',
    baloonsCount = new Set();

  for (let i = 0; i < text.length; i++) {
    counts.set(text[i], counts.get(text[i] || 0) + 1);
  }

  for (let i = 0; i < target.length; i++) {
    if (!counts.get(target[i])) return 0;

    let frequency =
      target[i] === 'l' || target[i] === 'o'
        ? counts.get(target[i]) / 2
        : counts.get(target[i]);

    baloonsCount.add(frequency);
  }

  return baloonsCount.size;
};
let str = 'nlaebolko';

maxNumberOfBalloons(str);
export {};
