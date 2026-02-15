// QR Scanner Service - Camera-based scanning
// Uses browser camera API with controlled fallback

export interface ScanResult {
  success: boolean;
  value?: string;
  error?: string;
}

export interface CameraPermission {
  status: 'granted' | 'denied' | 'prompt' | 'unknown';
  canRequest: boolean;
}

export class QRScannerService {
  private static stream: MediaStream | null = null;
  private static videoElement: HTMLVideoElement | null = null;

  // Check camera permission status
  static async checkPermission(): Promise<CameraPermission> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return { status: 'unknown', canRequest: false };
    }

    try {
      // Try to query permission (not all browsers support this)
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
        return {
          status: result.state as 'granted' | 'denied' | 'prompt',
          canRequest: result.state !== 'denied'
        };
      }
    } catch (error) {
      // Permission API not supported, assume we can request
      return { status: 'prompt', canRequest: true };
    }

    return { status: 'prompt', canRequest: true };
  }

  // Request camera access
  static async requestCamera(): Promise<{ success: boolean; error?: string }> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Prefer back camera on mobile
      });

      this.stream = stream;
      return { success: true };
    } catch (error: any) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        return { success: false, error: 'Camera permission denied' };
      } else if (error.name === 'NotFoundError') {
        return { success: false, error: 'No camera found' };
      } else {
        return { success: false, error: 'Camera access failed' };
      }
    }
  }

  // Start camera preview
  static async startPreview(videoElement: HTMLVideoElement): Promise<{ success: boolean; error?: string }> {
    if (!this.stream) {
      const result = await this.requestCamera();
      if (!result.success) {
        return result;
      }
    }

    try {
      videoElement.srcObject = this.stream;
      this.videoElement = videoElement;
      await videoElement.play();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to start camera preview' };
    }
  }

  // Stop camera
  static stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
      this.videoElement = null;
    }
  }

  // Simulate QR scan (demo-safe fallback)
  static simulateScan(): ScanResult {
    // Generate a demo QR value
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const value = `AYURNXT-UNIT-${randomId}-${timestamp}`;

    return {
      success: true,
      value
    };
  }

  // Check if camera is available
  static isCameraAvailable(): boolean {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  // Get camera status for settings
  static async getCameraStatus(): Promise<{
    available: boolean;
    permission: CameraPermission;
    active: boolean;
  }> {
    const available = this.isCameraAvailable();
    const permission = await this.checkPermission();
    const active = this.stream !== null;

    return { available, permission, active };
  }
}

// Note: For actual QR code scanning, you would integrate a library like:
// - jsQR (lightweight, good for web)
// - @zxing/library (comprehensive)
// - html5-qrcode (easy to use)
//
// This service provides the camera infrastructure.
// The actual QR decoding would be added in the component using this service.
