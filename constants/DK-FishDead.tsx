import { INode, IEndKey } from '../interfaces/flow';

const dead: INode = {
  question: 'Does the salmon have spots on the dorsal and caudal fin?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'deadY',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'deadN',
    },
    {
      uid: '2c2b3c',
      label: 'Tail is damaged',
      next: 'deadD',
    },
  ],
};

const deadY: INode = {
  question: 'Does the salmon have spots on its entire caudal fin?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'deadYY',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'deadYN',
    },
  ],
};

const deadYY: INode = {
  question: 'Is the salmon larger than 35 inches?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'deadYYY',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Pink',
    },
  ],
};

const deadYYY: INode = {
  question: 'Does the fish have black gums?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Chinook',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Unknown',
    },
  ],
};

const deadYN: INode = {
  question: 'Does the salmon have spots on only the top half of its tail and have white gums?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Coho',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Unknown',
    },
  ],
};

const deadN: INode = {
  question: 'Does the salmon have small eyes and a bright red body?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Sockeye',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'deadNN',
    },
  ],
};

const deadNN: INode = {
  question: 'Does the salmon have big eyes, big teeth, and vertical bars on its body that are red or purple?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Chum',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Unknown',
    },
  ],
};

const deadD: INode = {
  question: 'Do you see white "headlights" on the salmon\'s kype (nose)?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'deadDY',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'deadDN',
    },
  ],
};

const deadDY: INode = {
  question: 'Does it have a white mouth and a green & red body?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Coho',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Unknown',
    },
  ],
};

const deadDN: INode = {
  question: 'Is the salmon larger than 35 inches?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'deadDNY',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'deadDNN',
    },
  ],
};

const deadDNY: INode = {
  question: 'Does it have red or purple vertical bars on its body?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Chum',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'deadDNYN',
    },
  ],
};

const deadDNYN: INode = {
  question: 'Does it have black gums?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Chinook',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Unknown',
    },
  ],
};

const deadDNN: INode = {
  question: 'Is the salmon red and green or all green?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'deadDNNY',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'deadDNNY',
    },
  ],
};

const deadDNNN: INode = {
  question: 'Does the salmon have humps?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Pink',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Unknown',
    },
  ],
};


const deadDNNY: INode = {
  question: 'Is this salmon in a creek associated with a lake?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Sockeye',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'deadDNNYN',
    },
  ],
};

const deadDNNYN: INode = {
  question: 'Does the fish have white gums?',
  answers: [
    {
      uid: '2b2b3c',
      label: 'Yes',
      next: 'Coho',
    },
    {
      uid: '2c2b3c',
      label: 'No',
      next: 'Unknown',
    },
  ],
};

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
    dead,
    deadY,
    deadYY,
    deadYYY,
    deadYN,
    deadN,
    deadNN,
    deadD,
    deadDY,
    deadDN,
    deadDNY,
    deadDNYN,
    deadDNN,
    deadDNNN,
    deadDNNY,
    deadDNNYN,
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
