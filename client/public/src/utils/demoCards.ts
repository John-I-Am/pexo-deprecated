/* eslint-disable no-plusplus */
export const alphabetCards: any = {
  cards: [],
  title: "Alphabet",
  description: "Learn the alphabet from A to Z!",
};

export const monthCards: any = {
  cards: [],
  title: "Months",
  description: "Learn the months of the year",
};

const str = "abcdefghijklmnopqrstuvwxyz";

for (let i = 0; i < str.length; i++) {
  let suffix = "th";

  switch (i) {
    case 0:
      suffix = "st";
      break;
    case 1:
      suffix = "nd";
      break;
    case 2:
      suffix = "rd";
      break;
    default:
      suffix = "th";
  }

  const card = {
    type: "classic",
    front: str[i],
    back: `${i + 1}${suffix} letter of the alphabet`,
    examples: [],
    tags: [],
  };

  alphabetCards.cards.push(card);
}

monthCards.cards.push({
  type: "classic",
  front: "January",
  back: "1st month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "february",
  back: "2nd month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "march",
  back: "3rd month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "april",
  back: "4th month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "may",
  back: "5th month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "june",
  back: "6th month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "july",
  back: "7th month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "August",
  back: "8th month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "september",
  back: "9th month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "october",
  back: "10th month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "november",
  back: "11th month of the year",
  examples: [],
  tags: [],
});

monthCards.cards.push({
  type: "classic",
  front: "december",
  back: "12th month of the year",
  examples: [],
  tags: [],
});
