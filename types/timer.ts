export type TimeStyle = 'MM:SS' | 'MM:SS:SSS'
export const TIME_STYLES: TimeStyle[] = ['MM:SS', 'MM:SS:SSS']


export type FontColor = 'default' | 'blue' | 'green' | 'purple' | 'rose' | 'amber' | 'teal'
export const FONT_COLORS: FontColor[] = ['default', 'blue', 'green', 'purple', 'rose', 'amber', 'teal']

export type AlertSound = 'classic' | 'arcade' | 'rhythm' | 'retro'
export const ALERT_SOUNDS: AlertSound[] = ['classic', 'arcade', 'rhythm', 'retro']

export interface TimerStyleSettings {
  timeStyle: TimeStyle
  fontColor: FontColor
  alertSound: AlertSound
  backgroundStyle: BackgroundStyle
}

export const DEFAULT_SETTINGS: TimerStyleSettings = {
  timeStyle: 'MM:SS',
  fontColor: 'default',
  alertSound: 'classic',
  backgroundStyle: 'none'
}

export type BackgroundStyle = 'none' | 'beams' | 'beams-collision' | 'lines'; 

export const STORAGE_KEYS = {
  SOUND_ENABLED: 'timer-sound-enabled',
  TIMER_SETTINGS: 'timer-settings'
} as const;

export const storage = {

  canUseStorage: () => {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  },

  saveSettings: (settings: TimerStyleSettings) => {
    if (!storage.canUseStorage()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TIMER_SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },
  getSettings: (): TimerStyleSettings => {
    if (!storage.canUseStorage()) return DEFAULT_SETTINGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TIMER_SETTINGS);
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Error reading settings:', error);
      return DEFAULT_SETTINGS;
    }
  },

  saveSoundEnabled: (enabled: boolean) => {
    if (!storage.canUseStorage()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(enabled));
    } catch (error) {
      console.error('Error saving sound state:', error);
    }
  },

  getSoundEnabled: (): boolean => {
    if (!storage.canUseStorage()) return true;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
      return saved === null ? true : saved === 'true';
    } catch (error) {
      console.error('Error reading sound state:', error);
      return true;
    }
  }
}; 