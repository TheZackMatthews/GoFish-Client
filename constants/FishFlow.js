const questionTypes = {
  buttons: 'buttons',
  dropdown: 'dropdown',
  inputNumber: 'inputNumber',
  inputString: 'inputString',
  inputLong: 'inputLong',
  photo: 'photo',
  location: 'location',
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

questionnaire.notes = {
  questions: [
    {
      uid: '8a2b3c',
      type: questionTypes.inputLong,
      label: 'Notes',
      data: 'comments',
    },
    {
      uid: '8b2b3c',
      type: questionTypes.photo,
      label: 'Add photo',
      data: 'photo',
    },
  ],
  next: undefined,
};

questionnaire.fishDead2 = {
  questions: [
    {
      uid: '7a2b3c',
      type: questionTypes.inputNumber,
      label: 'What is the fork length?',
      data: 'fork_length',
    },
    {
      uid: '8a2b3c',
      type: questionTypes.buttons,
      label: 'Does it have an adipose fin?',
      data: 'adipose_fin',
      answers: [
        {
          uid: '8b2b3c',
          value: 'true',
          label: 'Yes',
        },
        {
          uid: '8c2b3c',
          value: 'false',
          label: 'No',
        },
      ],
    },
    {
      uid: '9a2b3c',
      type: questionTypes.buttons,
      label: 'Did it successfully spawn?',
      data: 'spawn',
      answers: [
        {
          uid: '9b2b3c',
          value: 'true',
          label: 'Yes',
        },
        {
          uid: '9c2b3c',
          value: 'false',
          label: 'No',
        },
      ],
    },
    {
      uid: '10a2b3c',
      type: questionTypes.buttons,
      label: 'What gender is it?',
      data: 'gender',
      answers: [
        {
          uid: '10b2b3c',
          value: 'female',
          label: 'Female',
        },
        {
          uid: '10c2b3c',
          value: 'male',
          label: 'Male',
        },
        {
          uid: '10d2b3c',
          value: 'unknown',
          label: 'Unable to tell',
        },
      ],
    },
  ],
  next: questionnaire.notes,
};

questionnaire.fishDead1 = {
  questions: [
    {
      uid: '6a2b3c',
      type: questionTypes.dropdown,
      label: 'What type of fish is it?',
      data: 'fish_species',
      answers: fishArray,
    },
    {
      uid: '6b2b3c',
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
      uid: '5a2b3c',
      type: questionTypes.dropdown,
      label: 'What type of fish is it?',
      data: 'fish_species',
      answers: fishArray,
    },
    {
      uid: '5b2b3c',
      type: questionTypes.inputNumber,
      data: 'fish_count',
      label: 'How many fish have you found?',
    },
  ],
  next: questionnaire.notes,
};

questionnaire.fish1 = {
  questions: [
    {
      uid: '4a2b3c',
      type: questionTypes.buttons,
      label: 'Is the fish alive or dead?',
      answers: [
        {
          uid: '4b2b3c',
          data: 'fish_status',
          value: 'live',
          label: 'Alive',
          next: questionnaire.fishAlive1,
        },
        {
          uid: '4d2b3c',
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
      uid: '3a2b3c',
      type: questionTypes.dropdown,
      label: 'What type of fish is it?',
      data: 'fish_species',
      answers: fishArray,
    },
    {
      uid: '3b2b3c',
      type: questionTypes.inputNumber,
      data: 'fish_count',
      label: 'How many fish have you found?',
    },
  ],
  next: questionnaire.notes,
};

questionnaire.redd1 = {
  questions: [
    {
      uid: '2a2b3c',
      type: questionTypes.buttons,
      label: 'Is a fish guarding the redd?',
      answers: [
        {
          uid: '2b2b3c',
          data: null,
          label: 'Yes',
          next: questionnaire.redd2,
        },
        {
          uid: '2c2b3c',
          data: null,
          label: 'No',
          next: questionnaire.notes,
        },
      ],
    },
  ],
};

questionnaire.fishOrRedd = {
  questions: [
    {
      uid: '1a2b3c',
      type: questionTypes.buttons,
      label: 'Is it a fish or a redd?',
      answers: [
        {
          uid: '1b2b3c',
          data: 'fish_status',
          value: null,
          label: 'Fish',
          next: questionnaire.fish1,
        },
        {
          uid: '1c2b3c',
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
