'use client';

import { useState } from 'react';
import { AlertTriangle, Phone, MessageSquare, MapPin, Clock } from 'lucide-react';
import { EmergencyContact } from '@/lib/types';

interface EmergencyAlertProps {
  contacts: EmergencyContact[];
  currentLocation?: { latitude: number; longitude: number; address?: string };
  onSendAlert: (contactIds: string[], message: string) => Promise<void>;
}

export function EmergencyAlert({ contacts, currentLocation, onSendAlert }: EmergencyAlertProps) {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const defaultMessage = `🚨 EMERGENCY ALERT 🚨

I am currently in a situation that requires immediate attention. My location is: ${currentLocation?.address || 'Location unavailable'}

Please contact me immediately or call 911 if you cannot reach me.

Sent from LexiGuard - ${new Date().toLocaleString()}`;

  const handleContactToggle = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSendAlert = async () => {
    if (selectedContacts.length === 0) return;

    setIsSending(true);
    try {
      const message = customMessage.trim() || defaultMessage;
      await onSendAlert(selectedContacts, message);
    } catch (error) {
      console.error('Failed to send alert:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">Emergency Alert</h3>
        <p className="text-sm text-gray-300">
          Send your location and status to trusted contacts
        </p>
      </div>

      {/* Current Location */}
      {currentLocation && (
        <div className="glass-surface p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Current Location</h4>
              <p className="text-xs text-gray-300">
                {currentLocation.address || `${currentLocation.latitude}, ${currentLocation.longitude}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Selection */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Select Contacts to Alert</h4>
        <div className="space-y-2">
          {contacts.map((contact) => (
            <label
              key={contact.id}
              className="flex items-center space-x-3 glass-surface p-3 rounded-lg cursor-pointer hover:bg-opacity-15 transition-all duration-200"
            >
              <input
                type="checkbox"
                checked={selectedContacts.includes(contact.id)}
                onChange={() => handleContactToggle(contact.id)}
                className="w-4 h-4 text-blue-500 bg-transparent border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-white">{contact.name}</span>
                  <span className="text-xs text-gray-400">({contact.relationship})</span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{contact.phone}</span>
                  </div>
                  {contact.email && (
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{contact.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Custom Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          Custom Message (Optional)
        </label>
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Add additional details about your situation..."
          className="w-full p-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
        <p className="text-xs text-gray-400">
          Leave blank to use the default emergency message
        </p>
      </div>

      {/* Send Button */}
      <button
        onClick={handleSendAlert}
        disabled={selectedContacts.length === 0 || isSending}
        className={`w-full py-4 rounded-lg font-medium transition-all duration-200 ${
          selectedContacts.length === 0 || isSending
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'btn-danger'
        }`}
      >
        {isSending ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Sending Alert...</span>
          </div>
        ) : (
          `Send Alert to ${selectedContacts.length} Contact${selectedContacts.length !== 1 ? 's' : ''}`
        )}
      </button>

      {/* Timestamp */}
      <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
        <Clock className="h-3 w-3" />
        <span>Alert will include current timestamp</span>
      </div>
    </div>
  );
}
