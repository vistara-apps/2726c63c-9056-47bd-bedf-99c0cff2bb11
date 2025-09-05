import { StateRights } from './types';

export const STATES_DATA: Record<string, StateRights> = {
  'CA': {
    state: 'CA',
    stateName: 'California',
    keyRights: [
      'You have the right to remain silent',
      'You have the right to refuse searches without a warrant',
      'You can record police interactions in public',
      'You have the right to an attorney'
    ],
    commonScenarios: ['Traffic Stop', 'Street Encounter', 'Home Visit', 'Arrest'],
    emergencyNumbers: {
      police: '911',
      legal: '1-800-LAW-HELP'
    },
    specificLaws: {
      stopAndFrisk: false,
      recordingAllowed: true,
      silentRight: true
    }
  },
  'NY': {
    state: 'NY',
    stateName: 'New York',
    keyRights: [
      'You have the right to remain silent',
      'Police can stop and frisk with reasonable suspicion',
      'You can record police in public spaces',
      'You have the right to an attorney'
    ],
    commonScenarios: ['Traffic Stop', 'Stop and Frisk', 'Home Visit', 'Arrest'],
    emergencyNumbers: {
      police: '911',
      legal: '1-800-342-3736'
    },
    specificLaws: {
      stopAndFrisk: true,
      recordingAllowed: true,
      silentRight: true
    }
  },
  'TX': {
    state: 'TX',
    stateName: 'Texas',
    keyRights: [
      'You have the right to remain silent',
      'You must identify yourself if lawfully detained',
      'You can record police interactions',
      'You have the right to an attorney'
    ],
    commonScenarios: ['Traffic Stop', 'Street Encounter', 'Home Visit', 'Arrest'],
    emergencyNumbers: {
      police: '911',
      legal: '1-800-504-7030'
    },
    specificLaws: {
      stopAndFrisk: false,
      recordingAllowed: true,
      silentRight: true
    }
  }
};

export const SCENARIOS = [
  {
    id: 'traffic-stop',
    title: 'Traffic Stop',
    icon: '🚗',
    description: 'Pulled over by police while driving'
  },
  {
    id: 'street-encounter',
    title: 'Street Encounter',
    icon: '🚶',
    description: 'Approached by police on the street'
  },
  {
    id: 'home-visit',
    title: 'Home Visit',
    icon: '🏠',
    description: 'Police at your door or home'
  },
  {
    id: 'arrest',
    title: 'Arrest',
    icon: '⚖️',
    description: 'Being arrested or detained'
  }
];

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export const SUBSCRIPTION_FEATURES = {
  free: [
    'Basic legal rights information',
    'Limited scenario scripts',
    'Basic recording (5 minutes)',
    'Community support'
  ],
  premium: [
    'All state-specific guides',
    'Unlimited scenario scripts',
    'Unlimited recording with cloud storage',
    'Emergency contact alerts',
    'Multi-language support',
    'Priority support',
    'Auto-generated shareable cards'
  ]
};
