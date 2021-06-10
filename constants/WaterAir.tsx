import { IQuestion } from '../interfaces/flow';

export const flowQuestion: IQuestion = {
  uid: '1234',
  type: 'modal',
  label: '',
  data: '',
  answers: [
    {
      uid: '1',
      label: 'Dry',
      value: 1,
    },
    {
      uid: '2',
      label: 'Low',
      value: 2,
    },
    {
      uid: '3',
      label: 'Medium',
      value: 3,
    },
    {
      uid: '4',
      label: 'High',
      value: 4,
    },
    {
      uid: '5',
      label: 'Flooding',
      value: 5
    },
  ]
}

// Remove
export const FlowType = [
  {
    id: 1,
    detail: 'Dry',
  },
  {
    id: 2,
    detail: 'Low',
  },
  {
    id: 3,
    detail: 'Medium',
  },
  {
    id: 4,
    detail: 'High',
  },
  {
    id: 5,
    detail: 'Flooding',
  },
];

export const visibilityQuestion: IQuestion = {
  uid: '12345',
  type: 'modal',
  label: '',
  data: '',
  answers: [
    {
      uid: '1',
      label: 'Excellent',
      value: 1,
    },
    {
      uid: '2',
      label: 'Very Good',
      value: 2
    },
    {
      uid: '3',
      label: 'Good',
      value: 3,
    },
    {
      uid: '4',
      label: 'Fair',
      value: 4,
    },
    {
      uid: '5',
      label: 'Poor',
      value: 5,
    },
    {
      uid: '6',
      label: 'Not Surveyable',
      value: 6,
    },
  ]
}

// remove
export const Visibility = [
  {
    id: 1,
    detail: 'Excellent',
  },
  {
    id: 2,
    detail: 'Very Good',
  },
  {
    id: 3,
    detail: 'Good',
  },
  {
    id: 4,
    detail: 'Fair',
  },
  {
    id: 5,
    detail: 'Poor',
  },
  {
    id: 6,
    detail: 'Not Surveyable',
  },
];

export const waterConditionQuestion: IQuestion = {
  uid: '123456',
  type: 'modal',
  label: '',
  data: '',
  answers: [
    {
      uid: '20',
      label: 'Low-Clear',
      value: 20,
    },
    {
      uid: '21',
      label: 'Low-Medium color',
      value: 21,
    },
    {
      uid: '22',
      label: 'Low-Muddy',
      value: 22,
    },
    {
      uid: '23',
      label: 'Medium-Clear',
      value: 23,
    },
    {
      uid: '24',
      label: 'Medium-Medium color',
      value: 24,
    },
    {
      uid: '25',
      label: 'Medium-Muddy',
      value: 25,
    },
    {
      uid: '26',
      label: 'High-Clear',
      value: 26,
    },
    {
      uid: '27',
      label: 'High-Medium color',
      value: 27,
    },
    {
      uid: '28',
      label: 'High-Muddy',
      value: 28,
    },
    {
      uid: '29',
      label: 'Flooding',
      value: 29,
    },
  ]
}

// remove
export const WaterConditions = [
  {
    id: 20,
    detail: 'Low-Clear',
  },
  {
    id: 21,
    detail: 'Low-Medium color',
  },
  {
    id: 22,
    detail: 'Low-Muddy',
  },
  {
    id: 23,
    detail: 'Medium-Clear',
  },
  {
    id: 24,
    detail: 'Medium-Medium color',
  },
  {
    id: 25,
    detail: 'Medium-Muddy',
  },
  {
    id: 26,
    detail: 'High-Clear',
  },
  {
    id: 27,
    detail: 'High-Medium color',
  },
  {
    id: 28,
    detail: 'High-Muddy',
  },
  {
    id: 29,
    detail: 'Flooding',
  },
];

export const viewConditionQuestion: IQuestion = {
  uid: '1234567',
  type: 'modal',
  label: '',
  data: '',
  answers: [
    {
      uid: '30',
      label: 'Dark',
      value: 30,
    },
    {
      uid: '31',
      label: 'Dark in pools',
      value: 31,
    },
    {
      uid: '32',
      label: 'High Glare',
      value: 32,
    },
    {
      uid: '33',
      label: 'Some Glare',
      value: 33,
    },
    {
      uid: '34',
      label: 'Raining',
      value: 34,
    },
    {
      uid: '35',
      label: 'Snowing',
      value: 35,
    },
    {
      uid: '36',
      label: 'Frozen',
      value: 36,
    },
    {
      uid: '37',
      label: 'Partly Frozen',
      value: 37,
    },
    {
      uid: '38',
      label: 'Water Turbid',
      value: 38,
    },
  ]
}

// remove
export const ViewingConditions = [
  {
    id: 30,
    detail: 'Dark',
  },
  {
    id: 31,
    detail: 'Dark in pools',
  },
  {
    id: 32,
    detail: 'High Glare',
  },
  {
    id: 33,
    detail: 'Some Glare',
  },
  {
    id: 34,
    detail: 'Raining',
  },
  {
    id: 35,
    detail: 'Snowing',
  },
  {
    id: 36,
    detail: 'Frozen',
  },
  {
    id: 37,
    detail: 'Partly Frozen',
  },
  {
    id: 38,
    detail: 'Water Turbid',
  },
];
