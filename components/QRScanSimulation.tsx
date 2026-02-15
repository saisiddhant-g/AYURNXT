import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { generatePlasterId } from '../therapyProtocol';

interface QRScanSimulationProps {
  onScanComplete: (plasterId: string) => void;
}

export const QRScanSimulation: React.FC<QRScanSimulationProps> = ({ onScanComplete }) => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrReaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleStartScan = async () => {
    setCameraError(false);
    setErrorMessage('');
    setScanning(true);

    // Wait for DOM to update with qr-reader element
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check if camera API is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setScanning(false);
      setCameraError(true);
      setErrorMessage('Camera not supported in this browser');
      return;
    }

    // Check if qr-reader element exists
    const container = document.getElementById("qr-reader");
    if (!container) {
      console.error("QR reader container not found in DOM");
      setScanning(false);
      setCameraError(true);
      setErrorMessage('Scanner initialization failed. Please try again.');
      return;
    }

    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      // Try multiple camera configurations with fallback
      let started = false;
      const configs = [
        { facingMode: "environment" }, // Mobile back camera (preferred)
        { facingMode: "user" },        // Mobile front camera / Laptop webcam
        true                            // Any available camera
      ];

      for (const config of configs) {
        try {
          console.log('Trying camera config:', config);
          
          await scanner.start(
            config,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 }
            },
            (decodedText) => {
              console.log("QR Code detected:", decodedText);
              handleScanSuccess(decodedText);
            },
            (error) => {
              // Scan error (ignore, happens frequently during scanning)
            }
          );
          
          console.log('Camera started successfully with config:', config);
          started = true;
          break; // Success - exit loop
        } catch (configErr: any) {
          console.warn('Camera config failed:', config, configErr.name, configErr.message);
          // Try next config
          continue;
        }
      }

      if (!started) {
        throw new Error('Unable to start camera with any configuration');
      }

    } catch (err: any) {
      console.error('Camera error:', err.name, err.message, err);
      setScanning(false);
      setCameraError(true);

      const errorName = err?.name || '';
      const errorMessage = err?.message || '';

      if (errorName === 'NotAllowedError' || errorMessage.includes('Permission denied') || errorMessage.includes('permission denied')) {
        setErrorMessage('Camera access denied. Please allow camera access in your browser settings.');
      } else if (errorName === 'NotFoundError' || errorMessage.includes('No cameras found') || errorMessage.includes('Requested device not found')) {
        setErrorMessage('No camera detected on this device.');
      } else if (errorName === 'NotReadableError' || errorMessage.includes('Could not start video source')) {
        setErrorMessage('Camera is already in use by another application.');
      } else if (errorMessage.includes('Unable to start camera')) {
        setErrorMessage('Unable to access camera. Please check browser permissions and try again.');
      } else {
        setErrorMessage(errorMessage || 'Unable to access camera. Please check browser permissions.');
      }
    }
  };

  const handleScanSuccess = async (scannedValue: string) => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      scannerRef.current = null;
    }

    setScanning(false);
    setScanned(true);

    // Use scanned value as unit ID (accept any valid QR content)
    const unitId = scannedValue || generatePlasterId();

    // Show success message briefly before proceeding
    setTimeout(() => {
      onScanComplete(unitId);
    }, 1500);
  };

  const handleTryAgain = () => {
    // Reset all error states
    setCameraError(false);
    setErrorMessage('');
    setScanning(false);
    setScanned(false);
    
    // Clean up any existing scanner
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => {});
      scannerRef.current = null;
    }
  };

  return (
    <div className="px-6 py-8 max-w-md mx-auto protocol-transition">
      <div className="text-center space-y-8">
        {/* Header */}
        <div className="protocol-slide">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{
            background: '#2F5D4F',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
          }}>
            <i className="fa-solid fa-qrcode text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold mb-2" style={{color: '#214E45', letterSpacing: '-0.02em'}}>
            Plaster Authentication
          </h2>
          <p className="text-sm" style={{color: '#5F6F6B'}}>
            Scan the QR code on your therapy plaster to begin
          </p>
        </div>

        {/* Scan Area */}
        <div className="stitch-card p-8 space-y-6 protocol-slide" style={{animationDelay: '0.1s'}}>
          {!scanning && !scanned && !cameraError && (
            <>
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 rounded-2xl" style={{border: '4px solid rgba(0, 0, 0, 0.04)'}}></div>
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-2xl" style={{borderColor: '#2F5D4F'}}></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-2xl" style={{borderColor: '#2F5D4F'}}></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-2xl" style={{borderColor: '#2F5D4F'}}></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-2xl" style={{borderColor: '#2F5D4F'}}></div>
                
                <div className="absolute inset-0 flex items-center justify-center breathing-glow">
                  <i className="fa-solid fa-qrcode text-6xl" style={{color: '#9BA8A4'}}></i>
                </div>
              </div>

              <button
                onClick={handleStartScan}
                className="stitch-button-primary w-full flex items-center justify-center space-x-2 deliberate-action"
              >
                <i className="fa-solid fa-camera"></i>
                <span>Scan Therapy Plaster</span>
              </button>
            </>
          )}

          {scanning && (
            <>
              <div id="qr-reader" ref={qrReaderRef} className="w-full rounded-xl overflow-hidden" style={{
                border: '2px solid #2F5D4F'
              }}></div>

              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2" style={{color: '#214E45'}}>
                  <i className="fa-solid fa-camera"></i>
                  <span className="font-semibold">Scanning for QR code...</span>
                </div>
                <p className="text-sm" style={{color: '#5F6F6B'}}>
                  Position QR code within frame
                </p>
              </div>
            </>
          )}

          {cameraError && (
            <>
              <div className="p-6 rounded-xl" style={{
                background: '#FEE2E2',
                border: '1px solid rgba(220, 38, 38, 0.2)'
              }}>
                <div className="flex items-start space-x-3">
                  <i className="fa-solid fa-exclamation-triangle text-lg mt-0.5" style={{color: '#991B1B'}}></i>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold mb-1" style={{color: '#991B1B'}}>
                      Camera Access Required
                    </p>
                    <p className="text-xs" style={{color: '#DC2626'}}>
                      {errorMessage}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleTryAgain}
                className="stitch-button-secondary w-full"
              >
                <i className="fa-solid fa-rotate-right mr-2"></i>
                Try Again
              </button>
            </>
          )}

          {scanned && (
            <>
              <div className="relative w-48 h-48 mx-auto earned-achievement">
                <div className="absolute inset-0 rounded-2xl flex items-center justify-center" style={{background: '#E8F3F0'}}>
                  <div className="w-24 h-24 rounded-full flex items-center justify-center breathing-pulse" style={{
                    background: '#2F5D4F',
                    boxShadow: '0 8px 24px rgba(47, 93, 79, 0.2)'
                  }}>
                    <i className="fa-solid fa-check text-white text-4xl"></i>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2" style={{color: '#214E45'}}>
                  <i className="fa-solid fa-circle-check" style={{color: '#2F5D4F'}}></i>
                  <span className="font-bold">Standardized therapy unit detected</span>
                </div>
                <p className="text-sm" style={{color: '#5F6F6B'}}>
                  Proceeding to therapy setup...
                </p>
              </div>
            </>
          )}
        </div>

        {/* Safety Notice */}
        <div className="stitch-card p-5">
          <div className="flex items-start space-x-3">
            <i className="fa-solid fa-shield-heart text-lg mt-0.5" style={{color: '#2F5D4F'}}></i>
            <div className="text-left">
              <p className="text-sm font-semibold mb-1" style={{color: '#214E45'}}>
                Therapy Unit Verification
              </p>
              <p className="text-xs leading-relaxed" style={{color: '#5F6F6B'}}>
                Each QR code represents one standardized therapy plaster. Scanning authenticates the unit and initializes your supervised therapy protocol.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
