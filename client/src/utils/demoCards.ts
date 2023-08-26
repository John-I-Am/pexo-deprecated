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
    content: {
      type: "classic",
      front: str[i],
      back: `${i + 1}${suffix} letter of the alphabet`,
    },
    notes: "",
    tags: [],
  };

  alphabetCards.cards.push(card);
}

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "1st month of the year",
    text: [["january", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "2nd month of the year",
    text: [["february", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "3nd month of the year",
    text: [["march", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "4th month of the year",
    text: [["april", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "5th month of the year",
    text: [["may", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "6th month of the year",
    text: [["june", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "7th month of the year",
    text: [["july", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "8th month of the year",
    text: [["August", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "9th month of the year",
    text: [["september", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "10th month of the year",
    text: [["october", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "11th month of the year",
    text: [["november", true]],
  },
  notes: "",
  tags: [],
});

monthCards.cards.push({
  content: {
    type: "cloze",
    hint: "12th month of the year",
    text: [["december", true]],
  },
  notes: "",
  tags: [],
});
