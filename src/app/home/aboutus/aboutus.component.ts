import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;

  videoUrl: string = 'assets/Videos/demo.mp4'; // Replace with your video file path

  playVideo(): void {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.play();
    video.controls = true;
    this.removeOverlay();
  }

  togglePlay(event: Event): void {
    event.stopPropagation();
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  onVideoEnd(): void {
    this.addOverlay();
  }

  removeOverlay(): void {
    const overlay = document.querySelector('.video-overlay') as HTMLElement;
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  addOverlay(): void {
    const overlay = document.querySelector('.video-overlay') as HTMLElement;
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }
}
