import _ from 'lodash';

type Card = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A';

const CardValues: Record<Card, number> = {
  '2': 0,
  '3': 1,
  '4': 2,
  '5': 3,
  '6': 4,
  '7': 5,
  '8': 6,
  '9': 7,
  'T': 8,
  'J': 9,
  'Q': 10,
  'K': 11,
  'A': 12,
};

const baseHandeStrength = _.range(13).map(x => 0);

const getHandStrength = (hand: Card[], withJoker = false) => {
  const handStrength = [...baseHandeStrength];
  let jokers = 0;
  hand.forEach(card => {
    if(card === 'J' && withJoker) {
      jokers++;
      return;
    }
    handStrength[CardValues[card]]++;
  });

  const [combo1, combo2] =  _.sortBy(handStrength).reverse();

  return [combo1 + jokers, combo2];
};

const getCardTieBreaker = (first: Card[], second: Card[]) => {
  for(let index in first) {
    const firstCard = first[index];
    const secondCard = second[index];
    if(firstCard !== secondCard) {
      return CardValues[firstCard] > CardValues[secondCard];
    }
  }
};

const compareHands = (first: Card[], second: Card[], withJokers = false) => {
  const [firstCombo1, firstCombo2] = getHandStrength(first, withJokers);
  const [secondCombo1, secondCombo2] = getHandStrength(second, withJokers);

  if(firstCombo1 !== secondCombo1) {
    return firstCombo1 > secondCombo1 ? 1 : -1;
  }

  if(firstCombo1 === 3 && firstCombo2 !== secondCombo2) {
    return firstCombo2 > secondCombo2 ? 1 : -1;
  }

  if(firstCombo1 === 2 && firstCombo2 !== secondCombo2) {
    return firstCombo2 > secondCombo2 ? 1 : -1;
  }

  return getCardTieBreaker(first, second) ? 1 : -1;
}

const solution = (input: string[], withJokers = false) => {
  CardValues.J = withJokers ? -1 : -9;
  const rawHands = input.map(x => {
    const [hand, bid] = x.split(' ');
    return [hand.split('') as Card[], Number(bid)] as const;
  });

  const sortedByStrength = rawHands.sort(([firstCards], [secondCards]) => compareHands(firstCards, secondCards, withJokers));

  const winnings = sortedByStrength.reduce((acc, [,bid], index) => {
    const rank = index + 1;
    return acc + bid * rank;
  }, 0);

  return winnings;
}

const solutionV2 = (input: string[]) => solution(input, true);

export {  solution, solutionV2 };