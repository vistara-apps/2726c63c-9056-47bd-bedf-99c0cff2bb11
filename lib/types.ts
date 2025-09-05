// User types
export interface User {
  userId: string;
  currentLocation: string;
  languagePreference: 'en' | 'es';
  emergencyContacts: EmergencyContact[];
  subscriptionStatus: 'free' | 'premium';
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: string;
}

// Legal content types
export interface LegalGuide {
  guideId: string;
  state: string;
  title: string;
  content: string;
  language: 'en' | 'es';
  category: 'traffic' | 'arrest' | 'search' | 'general';
  lastUpdated: string;
}

export interface Script {
  scriptId: string;
  scenario: string;
  title: string;
  content: ScriptContent;
  language: 'en' | 'es';
  category: 'traffic' | 'arrest' | 'search' | 'general';
}

export interface ScriptContent {
  whatToSay: string[];
  whatNotToSay: string[];
  keyPoints: string[];
  emergencyPhrase?: string;
}

// Incident types
export interface RecordedIncident {
  incidentId: string;
  userId: string;
  timestamp: string;
  recordingUrl?: string;
  location: Location;
  scriptUsed?: string;
  alertSent: boolean;
  status: 'recording' | 'completed' | 'shared';
  notes?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  state: string;
  city?: string;
}

// UI component types
export interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'bottom' | 'center';
}

export interface LegalCardProps {
  guide: LegalGuide;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}

export interface ScriptViewerProps {
  script: Script;
  variant?: 'bilingual' | 'simple';
  onLanguageChange?: (language: 'en' | 'es') => void;
}

export interface RecordButtonProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  variant?: 'prominent' | 'discreet';
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// State-specific data
export interface StateRights {
  state: string;
  stateName: string;
  keyRights: string[];
  commonScenarios: string[];
  emergencyNumbers: {
    police: string;
    legal: string;
  };
  specificLaws: {
    stopAndFrisk: boolean;
    recordingAllowed: boolean;
    silentRight: boolean;
  };
}
