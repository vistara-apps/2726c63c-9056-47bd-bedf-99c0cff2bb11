'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { LegalCard } from '@/components/LegalCard';
import { ScriptViewer } from '@/components/ScriptViewer';
import { RecordButton } from '@/components/RecordButton';
import { ActionSheet } from '@/components/ActionSheet';
import { EmergencyAlert } from '@/components/EmergencyAlert';
import { STATES_DATA, SCENARIOS } from '@/lib/constants';
import { LegalGuide, Script, EmergencyContact, RecordedIncident } from '@/lib/types';
import { detectUserLocation, getStateFromCoordinates, generateIncidentId } from '@/lib/utils';
import { 
  MapPin, 
  Shield, 
  BookOpen, 
  Mic, 
  AlertTriangle, 
  Share2, 
  TrendingUp,
  Users,
  Clock,
  Star
} from 'lucide-react';

export default function HomePage() {
  const [currentState, setCurrentState] = useState<string>('CA');
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number; address?: string } | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [showScriptViewer, setShowScriptViewer] = useState(false);
  const [currentScript, setCurrentScript] = useState<Script | null>(null);

  // Mock data for demo
  const mockEmergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'John Doe',
      phone: '+1-555-0123',
      email: 'john@example.com',
      relationship: 'Spouse'
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+1-555-0456',
      relationship: 'Attorney'
    }
  ];

  const mockLegalGuides: LegalGuide[] = [
    {
      guideId: '1',
      state: currentState,
      title: 'Your Rights During Traffic Stops',
      content: 'During a traffic stop, you have specific rights that are protected by law. You have the right to remain silent, the right to refuse searches without a warrant...',
      language: 'en',
      category: 'traffic',
      lastUpdated: new Date().toISOString()
    },
    {
      guideId: '2',
      state: currentState,
      title: 'Understanding Search and Seizure Laws',
      content: 'The Fourth Amendment protects you from unreasonable searches and seizures. Police generally need a warrant to search your property...',
      language: 'en',
      category: 'search',
      lastUpdated: new Date().toISOString()
    }
  ];

  const mockScript: Script = {
    scriptId: '1',
    scenario: 'traffic-stop',
    title: 'Traffic Stop Script',
    content: {
      whatToSay: [
        '"I am exercising my right to remain silent."',
        '"I do not consent to any searches."',
        '"Am I free to go?"',
        '"I would like to speak to my attorney."'
      ],
      whatNotToSay: [
        'Don\'t volunteer information about where you\'re going or coming from',
        'Don\'t admit to any wrongdoing, even minor infractions',
        'Don\'t argue or become confrontational',
        'Don\'t consent to searches of your vehicle'
      ],
      keyPoints: [
        'Keep your hands visible at all times',
        'Remain calm and polite',
        'Ask if you are being detained or if you are free to go',
        'Remember that anything you say can be used against you'
      ],
      emergencyPhrase: '"I am invoking my Fifth Amendment right to remain silent and my Sixth Amendment right to an attorney."'
    },
    language: 'en',
    category: 'traffic'
  };

  useEffect(() => {
    // Get user's location on component mount
    detectUserLocation()
      .then(position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        
        // Get state from coordinates
        getStateFromCoordinates(latitude, longitude)
          .then(state => setCurrentState(state))
          .catch(console.error);
      })
      .catch(error => {
        console.error('Location detection failed:', error);
        // Fallback to default state
      });
  }, []);

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setCurrentScript(mockScript);
    setShowScriptViewer(true);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, this would start actual recording
    console.log('Starting recording...');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop recording and save to cloud
    console.log('Stopping recording...');
  };

  const handleSendEmergencyAlert = async (contactIds: string[], message: string) => {
    // In a real app, this would send actual alerts
    console.log('Sending emergency alert to:', contactIds, message);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowEmergencyAlert(false);
    
    // Show success message (in a real app, you'd use a toast or notification)
    alert('Emergency alert sent successfully!');
  };

  const stateData = STATES_DATA[currentState];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-gradient">LexiGuard</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your rights, simplified. Know what to say, instantly.
            </p>
          </div>

          {/* Location Status */}
          {currentLocation && stateData && (
            <div className="glass-card p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">{stateData.stateName}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-300">Rights Updated</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">19.93%</div>
            <div className="text-sm text-gray-300">Rights Awareness</div>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-400">+2.1%</span>
            </div>
          </div>
          
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">$1.2M</div>
            <div className="text-sm text-gray-300">Legal Costs Saved</div>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-blue-400">5.2k users</span>
            </div>
          </div>
          
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">30%</div>
            <div className="text-sm text-gray-300">Incident Success Rate</div>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-yellow-400">4.8 rating</span>
            </div>
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">Choose Your Scenario</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioSelect(scenario.id)}
                className="glass-card p-6 text-center hover:bg-opacity-15 transition-all duration-200 group"
              >
                <div className="text-4xl mb-3">{scenario.icon}</div>
                <h3 className="text-white font-medium mb-2 group-hover:text-blue-300 transition-colors duration-200">
                  {scenario.title}
                </h3>
                <p className="text-xs text-gray-400">{scenario.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Legal Guides */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">State Legal Guides</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <BookOpen className="h-4 w-4" />
              <span>{stateData?.stateName || 'California'}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockLegalGuides.map((guide) => (
              <LegalCard
                key={guide.guideId}
                guide={guide}
                onClick={() => console.log('Open guide:', guide.guideId)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recording */}
          <div className="glass-card p-6 text-center space-y-4">
            <Mic className="h-8 w-8 text-blue-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">One-Tap Recording</h3>
            <p className="text-sm text-gray-300">
              Discreetly record interactions with automatic cloud backup
            </p>
            <RecordButton
              isRecording={isRecording}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              variant="discreet"
            />
          </div>

          {/* Emergency Alert */}
          <div className="glass-card p-6 text-center space-y-4">
            <AlertTriangle className="h-8 w-8 text-red-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Emergency Alert</h3>
            <p className="text-sm text-gray-300">
              Instantly notify trusted contacts with your location
            </p>
            <button
              onClick={() => setShowEmergencyAlert(true)}
              className="btn-danger w-full"
            >
              Send Alert
            </button>
          </div>

          {/* Share Rights Card */}
          <div className="glass-card p-6 text-center space-y-4">
            <Share2 className="h-8 w-8 text-green-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Share Rights Card</h3>
            <p className="text-sm text-gray-300">
              Generate and share key rights information
            </p>
            <button className="btn-secondary w-full">
              Generate Card
            </button>
          </div>
        </div>
      </div>

      {/* Script Viewer Modal */}
      <ActionSheet
        isOpen={showScriptViewer}
        onClose={() => setShowScriptViewer(false)}
        title="Scenario Script"
        variant="center"
      >
        {currentScript && (
          <ScriptViewer
            script={currentScript}
            variant="bilingual"
          />
        )}
      </ActionSheet>

      {/* Emergency Alert Modal */}
      <ActionSheet
        isOpen={showEmergencyAlert}
        onClose={() => setShowEmergencyAlert(false)}
        title="Emergency Alert"
        variant="center"
      >
        <EmergencyAlert
          contacts={mockEmergencyContacts}
          currentLocation={currentLocation || undefined}
          onSendAlert={handleSendEmergencyAlert}
        />
      </ActionSheet>
    </AppShell>
  );
}
