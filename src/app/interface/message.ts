export interface Message {
  id: number;
  userid: string;
  time: string;
  chatid: number;
  text: string;
  photoid: string;
  usernick: string;
  userhash: string;
  position?: {
    coords?: {
      latitude: number;
      longitude: number;
      altitude?: number;
      accuracy?: number;
      altitudeAccuracy?: number;
      heading?: number | null;
      speed?: number | null;
    };
    timestamp?: number;
  };
}
