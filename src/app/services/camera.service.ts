import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private videoStream: MediaStream | null = null;

  async startCamera(videoElement: HTMLVideoElement): Promise<void> {
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.srcObject = this.videoStream;
      await videoElement.play();
    } catch (err) {
      console.error('Kamera konnte nicht gestartet werden:', err);
    }
  }

  stopCamera(): void {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
  }

  capturePhoto(videoElement: HTMLVideoElement): string {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    }
    return canvas.toDataURL('image/png'); // Rückgabe des Bildes als Base64-String
  }
}
