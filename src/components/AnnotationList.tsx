import React from 'react';
import { Trash2 } from 'lucide-react';

interface Annotation {
  id: string;
  time: number;
  box: { x: number; y: number; width: number; height: number };
  label: string;
}

interface AnnotationListProps {
  annotations: Annotation[];
  onDelete: (id: string) => void;
}

export default function AnnotationList({ annotations, onDelete }: AnnotationListProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-h-[600px] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Annotations</h3>
      {annotations.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No annotations yet</p>
      ) : (
        <div className="space-y-3">
          {annotations.map((annotation) => (
            <div
              key={annotation.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{annotation.label}</p>
                <p className="text-sm text-gray-500">
                  Time: {annotation.time.toFixed(2)}s
                </p>
              </div>
              <button
                onClick={() => onDelete(annotation.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}