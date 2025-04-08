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

  constructor(private cameraService: CameraService) {}

  ngAfterViewInit(): void {
    this.cameraService.startCamera(this.videoElement.nativeElement);
  }

  capturePhoto(): void {
    const photo = this.cameraService.capturePhoto(this.videoElement.nativeElement);
    this.photoCaptured.emit(photo);
    this.closeOverlay();
  }

  closeOverlay(): void {
    this.cameraService.stopCamera();
    this.overlayClosed.emit();
  }
}
