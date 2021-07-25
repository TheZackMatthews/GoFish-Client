import {
  IQuestionPage,
  IQuestionnaire,
  IAnswer,
  IQuestion,
} from '../interfaces/flow';
import {
  viewConditionQuestion,
  waterConditionQuestion,
  visibilityQuestion,
  flowQuestion
} from './WaterAir';

const fishArray = [
  { uid: '1fish', label: 'Chinook', value: 'chinook' },
  { uid: '2fish', label: 'Coho', value: 'coho' },
  { uid: '3fish', label: 'Sockeye', value: 'sockeye' },
  { uid: '4fish', label: 'Pink', value: 'pink' },
  { uid: '5fish', label: 'Chum', value: 'chum' },
  { uid: '6fish', label: 'Trout', value: 'trout' },
];

const notes: IQuestionPage = {
  validation: [true, true],
  questions: [
    {
      uid: '8a2b3c',
      type: 'inputLong',
      label: 'Notes',
      data: 'comments',
    },
    {
      uid: '8b2b3c',
      type: 'photo',
      label: 'Add photo',
      data: 'photo',
    },
  ],
  next: null,
};

const fishDead2: IQuestionPage = {
  validation: [false, false, false, false],
  questions: [
    {
      uid: '7a2b3c',
      type: 'inputNumber',
      label: 'What is the fork length?',
      data: 'fork_length',
    },
    {
      uid: '8a2b3c',
      type: 'buttons',
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
      type: 'buttons',
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
        {
          uid: '101d2b3c',
          value: 'unknown',
          label: 'Unable to tell',
        },
      ],
    },
    {
      uid: '10a2b3c',
      type: 'buttons',
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
  next: notes,
};

const fishDead1: IQuestionPage = {
  validation: [false, false],
  questions: [
    {
      uid: '6a2b3c',
      type: 'dropdown',
      label: 'What type of fish is it?',
      data: 'fish_species',
      answers: fishArray,
    },
    {
      uid: '6b2b3c',
      type: 'inputNumber',
      data: 'fish_count',
      label: 'How many fish have you found?',
    },
  ],
  next: fishDead2,
};

const fishAlive1: IQuestionPage = {
  validation: [false, false],
  questions: [
    {
      uid: '5a2b3c',
      type: 'dropdown',
      label: 'What type of fish is it?',
      data: 'fish_species',
      answers: fishArray,
    },
    {
      uid: '5b2b3c',
      type: 'inputNumber',
      data: 'fish_count',
      label: 'How many fish have you found?',
    },
  ],
  next: notes,
};

const fish1: IQuestionPage = {
  validation: [false],
  questions: [
    {
      uid: '4a2b3c',
      type: 'buttons',
      label: 'Is the fish alive or dead?',
      answers: [
        {
          uid: '4b2b3c',
          data: 'fish_status',
          value: 'live',
          label: 'Alive',
          next: fishAlive1,
        },
        {
          uid: '4d2b3c',
          data: 'fish_status',
          value: 'carcass',
          label: 'Dead',
          next: fishDead1,
        },
      ],
    },
  ],
};

const redd2: IQuestionPage = {
  validation: [false, false],
  questions: [
    {
      uid: '3a2b3c',
      type: 'dropdown',
      label: 'What type of fish is it?',
      data: 'fish_species',
      answers: fishArray,
    },
    {
      uid: '3b2b3c',
      type: 'inputNumber',
      data: 'fish_count',
      label: 'How many fish have you found?',
    },
  ],
  next: notes,
};

const redd1: IQuestionPage = {
  validation: [false],
  questions: [
    {
      uid: '2a2b3c',
      type: 'buttons',
      label: 'Is a fish guarding the redd?',
      answers: [
        {
          uid: '2b2b3c',
          label: 'Yes',
          next: redd2,
        },
        {
          uid: '2c2b3c',
          label: 'No',
          next: notes,
        },
      ],
    },
  ],
};

const fishOrRedd: IQuestionPage = {
  validation: [false],
  questions: [
    {
      uid: '1a2b3c',
      type: 'buttons',
      label: 'Is it a fish or a redd?',
      answers: [
        {
          uid: '1b2b3c',
          label: 'Fish',
          next: fish1,
          data: 'fish_status',
          value: undefined,
        },
        {
          uid: '1c2b3c',
          data: 'fish_status',
          value: 'redd',
          label: 'Redd',
          next: redd1,
        },
      ],
    },
  ],
  prev: undefined,
};

const creekAnswers: IAnswer[] = [
    {
      uid: '12',
      label: 'Hansen Creek',
      value: 'hansen_creek',
    },
    {
      uid: '123',
      label: 'Upper Hansen',
      value: 'upper_hansen',
    },
    {
      uid: '1234',
      label: 'Brickyard Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Cumberland Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Davis Slough',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Alder Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Jones Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Childs Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'HMSP (unnamed)',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Upper Brickyard',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'West Fork Trumpeter',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Thunderbird East',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'G.C. Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Lake Creek 0264',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Anderson Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Starbird Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Silver Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'East Fork Walker',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'NP Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Ennis Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Thunder Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Parson Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Mud Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Barnes Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Dittrich Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Finnegan Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Bridle Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Thomas Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Marblegate',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Little Cascade Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Maddox Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Swede Creek',
      value: 'brickyard_creek',
    },
    {
      uid: '1234',
      label: 'Carpenter and Englishe',
      value: 'brickyard_creek',
    },

  ]

const creek: IQuestion = {
  uid: '2929',
  type: 'dropdown_autoComplete',
  label: 'What creek are you surveying today?',
  data: 'creek',
  answers: creekAnswers,
}

const team: IQuestion = {
  uid: '23433',
  type: 'inputText_array',
  label: 'Who is surveying with you today?',
  data: 'team',
}

const teamLead: IQuestion = {
  uid: '234433',
  type: 'dropdown',
  label: 'Who is the teamlead?',
  data: 'team_lead',
}

const safetyAgreement = 'I certify that all team members report no Covid-19 symptoms and have all required PPE including face masks (to be worn when team members are within 6 feet of each other) and high visibility vests';

const covidSafety: IQuestion = {
  uid: '6653',
  type: 'checkbox',
  label: safetyAgreement,
  data: 'covid',
}

const questionnaire: IQuestionnaire = {
  start: notes,
  questionPages: {
    fishOrRedd,
    fish1,
    fishDead1,
    fishDead2,
    redd1,
    redd2,
    fishAlive1,
    notes,
  },
  questions: [
    flowQuestion,
    waterConditionQuestion,
    visibilityQuestion,
    viewConditionQuestion,
  ],
  preQuestions: [
    creek,
    team,
    teamLead,
    covidSafety,
  ]
};


redd1['prev'] = questionnaire.questionPages.fishOrRedd;
redd2['prev'] = questionnaire.questionPages.redd1;
fish1['prev'] = questionnaire.questionPages.fishOrRedd;
fishAlive1['prev'] = questionnaire.questionPages.fish1;
fishDead1['prev'] = questionnaire.questionPages.fish1;
fishDead2['prev'] = questionnaire.questionPages.fishDead1;
export default questionnaire;
