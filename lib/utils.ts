import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function generateIncidentId(): string {
  return `incident_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function detectUserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

export function getStateFromCoordinates(lat: number, lng: number): Promise<string> {
  // In a real app, this would use a geocoding service
  // For demo purposes, return a mock state based on rough coordinates
  if (lat >= 32.5 && lat <= 42 && lng >= -124 && lng <= -114) return Promise.resolve('CA');
  if (lat >= 40.5 && lat <= 45 && lng >= -79.8 && lng <= -71.8) return Promise.resolve('NY');
  if (lat >= 25.8 && lat <= 36.5 && lng >= -106.6 && lng <= -93.5) return Promise.resolve('TX');
  return Promise.resolve('CA'); // Default fallback
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function shareContent(title: string, text: string, url?: string) {
  if (navigator.share) {
    return navigator.share({
      title,
      text,
      url
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    const shareText = `${title}\n\n${text}${url ? `\n\n${url}` : ''}`;
    navigator.clipboard.writeText(shareText);
    return Promise.resolve();
  }
}

export function downloadFile(content: string, filename: string, contentType: string = 'text/plain') {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
