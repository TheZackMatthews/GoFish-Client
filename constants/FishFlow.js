const questionTypes = {
  buttons: 'buttons',
  dropdown: 'dropdown',
  inputNumber: 'inputNumber',
  inputString: 'inputString',
  inputLong: 'inputLong',
};

const fishArray = [
  { label: 'Chinook', value: 'chinook' },
  { label: 'Coho', value: 'coho' },
  { label: 'Sockeye', value: 'sockeye' },
  { label: 'Pink', value: 'pink' },
  { label: 'Chum', value: 'chum' },
  { label: 'Trout', value: 'trout' },
];
const questionnaire = {};

questionnaire.fishDead2 = {
  questions: [
    {
      type: questionTypes.inputNumber,
      label: 'What is the fork length?',
      data: 'fork_length',
    },
    {
      type: questionTypes.buttons,
      label: 'Does it have an adipose fin?',
      data: 'adipose_fin',
      answers: [
        {
          value: 'true',
          label: 'Yes',
        },
        {
          value: 'false',
          label: 'No',
        },
      ],
    },
    {
      type: questionTypes.buttons,
      label: 'Did it successfully spawn?',
      data: 'spawn',
      answers: [
        {
          value: 'true',
          label: 'Yes',
        },
        {
          value: 'false',
          label: 'No',
        },
      ],
    },
    {
      type: questionTypes.buttons,
      label: 'What gender is it?',
      data: 'gender',
      answers: [
        {
          value: 'female',
          label: 'Female',
        },
        {
          value: 'male',
          label: 'Male',
        },
        {
          value: 'unknown',
          label: 'Unable to tell',
        },
      ],
    },
  ],
  next: 'Notes',
};

questionnaire.fishDead1 = {
  questions: [
    {
      type: questionTypes.dropdown,
      label: 'What type of fish is it?',
      data: 'fish_species',
      answers: fishArray,
    },
    {
      type: questionTypes.inputNumber,
      data: 'fish_count',
      label: 'How many fish have you found?',
    },
  ],
  next: questionnaire.fishDead2,
};

questionnaire.fishAlive1 = {
  questions: [
    {
      type: questionTypes.dropdown,
      label: 'What type of fish is it?',
      data: 'fish_species',
      answers: fishArray,
    },
    {
      type: questionTypes.inputNumber,
      data: 'fish_count',
      label: 'How many fish have you found?',
    },
  ],
  next: 'Notes',
};

questionnaire.fish1 = {
  questions: [
    {
      type: questionTypes.buttons,
      label: 'Is the fish alive or dead?',
      answers: [
        {
          data: 'fish_status',
          value: 'live',
          label: 'Alive',
          next: questionnaire.fishAlive1,
        },
        {
          data: 'fish_status',
          value: 'carcass',
          label: 'Dead',
          next: questionnaire.fishDead1,
        },
      ],
    },
  ],
};

questionnaire.redd2 = {
  questions: [
    {
      type: questionTypes.dropdown,
      label: 'What type of fish is it?',
      data: 'fish_species',
      answers: fishArray,
    },
    {
      type: questionTypes.inputNumber,
      data: 'fish_count',
      label: 'How many fish have you found?',
    },
  ],
  next: 'Notes',
};

questionnaire.redd1 = {
  questions: [
    {
      type: questionTypes.buttons,
      label: 'Is a fish guarding the redd?',
      answers: [
        {
          data: null,
          label: 'Yes',
          next: questionnaire.redd2,
        },
        {
          data: null,
          label: 'No',
          next: 'Notes',
        },
      ],
    },
  ],
};

questionnaire.fishOrRedd = {
  questions: [
    {
      type: questionTypes.buttons,
      label: 'Is it a fish or a redd?',
      answers: [
        {
          data: 'fish_status',
          value: null,
          label: 'Fish',
          next: questionnaire.fish1,
        },
        {
          data: 'fish_status',
          value: 'redd',
          label: 'Redd',
          next: questionnaire.redd1,
        },
      ],
    },
  ],
  prev: null,
};

questionnaire.start = questionnaire.fishOrRedd;
questionnaire.fish1.prev = questionnaire.fishOrRedd;
questionnaire.redd1.prev = questionnaire.fishOrRedd;
questionnaire.redd2.prev = questionnaire.redd1;
questionnaire.fishAlive1.prev = questionnaire.fish1;
questionnaire.fishDead1.prev = questionnaire.fish1;
questionnaire.fishDead2.prev = questionnaire.fishDead1;

export default questionnaire;
