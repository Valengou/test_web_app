import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import VideoPlayer from './components/VideoPlayer';
import BoundingBox from './components/BoundingBox';
import AnnotationList from './components/AnnotationList';

interface Annotation {
  id: string;
  time: number;
  box: { x: number; y: number; width: number; height: number };
  label: string;
}

function App() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(0);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleBoxDrawn = (box: { x: number; y: number; width: number; height: number }) => {
    const label = prompt('Enter label for this annotation:');
    if (label) {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        time: currentTime,
        box,
        label
      };
      setAnnotations([...annotations, newAnnotation]);
    }
  };

  const handleDeleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Video Annotation Platform</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!videoUrl ? (
          <div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dashed border-gray-300 rounded-lg bg-white">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <label className="cursor-pointer">
              <span className="mt-2 text-base leading-normal px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Upload Video
              </span>
              <input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="relative" ref={containerRef}>
                <VideoPlayer
                  videoUrl={videoUrl}
                  onFrameChange={setCurrentTime}
                />
                <BoundingBox
                  containerRef={containerRef}
                  onBoxDrawn={handleBoxDrawn}
                />
              </div>
              <p className="mt-4 text-center text-gray-600">
                Click and drag on the video to create bounding boxes
              </p>
            </div>
            <div className="col-span-1">
              <AnnotationList
                annotations={annotations}
                onDelete={handleDeleteAnnotation}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;