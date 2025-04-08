import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CameraService } from '../../services/camera.service';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-camera-overlay',
  templateUrl: './camera-overlay.component.html',
  imports: [
    MatIcon,
    MatIconButton
  ],
  styleUrls: ['./camera-overlay.component.css']
})
export class CameraOverlayComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @Output() photoCaptured = new EventEmitter<string>();
  @Output() overlayClosed = new EventEmitter<void>();

  photoPreview: string | null = null;

  constructor(private cameraService: CameraService) {}

  ngAfterViewInit(): void {
    this.cameraService.startCamera(this.videoElement.nativeElement);
  }

  capturePhoto(): void {
    this.photoPreview = this.cameraService.capturePhoto(this.videoElement.nativeElement);
  }

  confirmPhoto(): void {
    if (this.photoPreview) {
      this.photoCaptured.emit(this.photoPreview);
      this.closeOverlay();
    }
  }

  closeOverlay(): void {
    this.cameraService.stopCamera();
    this.overlayClosed.emit();
  }
}
