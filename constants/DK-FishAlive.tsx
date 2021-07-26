import { INode, IEndKey } from '../interfaces/flow';

const liveSalmon: INode = {
  question: 'Is the stream you are surveying associated with a large lake?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'liveSalmonY',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'liveSalmonN',
    },
  ],
};

const liveSalmonN: INode = {
  question: 'Was the salmon greater than 25 inches long?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'liveSalmonNY',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'LiveSalmonNN',
    },
  ],
}

const liveSalmonNN: INode = {
  question: 'Does the salmon have a prominent hump in front of the dorsal fin?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Pink',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Trout',
    },
  ],
}

const LiveSalmonNY: INode = {
  question: 'Did you observe bands of color running vertically on its body?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Chum',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'LiveSalmonNYN',
    },
  ],
}

const LiveSalmonNYN: INode = {
  question: 'Is the body of the fish dark red with an olive green back?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Coho',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Chinook',
    },
  ],
}

const LiveSalmonY: INode = {
  question: 'Was it bright red with a green head?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Sockeye',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Unknown',
    },
  ],
}

// RESULTS
const Trout: IEndKey = {
  label: 'Trout',
  description: 'White belly, gray back',
  pictures: [
    {
      label: 'Normal',
      url: '',
    },
    {
      label: 'Spawning',
      url: '',
    }
  ]
}

const Pink: IEndKey = {
  label: "Pink",
  description: "White belly, grey back",
  pictures: [
    {
      label: 'Normal',
      url: '',
    },
    {
      label: 'Spawning',
      url: '',
    }
  ]
}

const Chinook: IEndKey = {
  label: 'Chinook',
  description: 'Olive and maroon body',
  pictures: [
    {
      label: 'Normal',
      url: '',
    },
    {
      label: 'Spawning',
      url: '',
    }
  ]
}

const Coho: IEndKey = {
  label: 'Coho',
  description: 'Maroon body, dark back',
  pictures: [
    {
      label: 'Normal',
      url: '',
    },
    {
      label: 'Spawning',
      url: '',
    }
  ]
}

const Chum: IEndKey = {
  label: 'Chum',
  description: 'Green body, purple stripes',
  pictures: [
    {
      label: 'Normal',
      url: '',
    },
    {
      label: 'Spawning',
      url: '',
    }
  ]
}

const Sockeye: IEndKey = {
  label: 'Sockeye',
  description: 'Red body, green head',
  pictures: [
    {
      label: 'Normal',
      url: '',
    },
    {
      label: 'Spawning',
      url: '',
    }
  ]
}

const Unknown: IEndKey = {
  label: 'Unknown',
  description: 'We are unable to identify this fish. Please respond with "unknown."'
}

const liveSalmonQuestionnaire = {
  start: 'liveSalmon',
  nodes: [
    liveSalmon,
    liveSalmonN,
    liveSalmonNN,
    LiveSalmonNY,
    LiveSalmonNYN,
    LiveSalmonY
  ],
  endPoints: [
    Trout,
    Pink,
    Chinook,
    Coho,
    Chum,
    Sockeye,
    Unknown,
  ]

}

export default liveSalmonQuestionnaire;
