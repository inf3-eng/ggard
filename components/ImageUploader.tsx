
import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
  onImageSelect: (base64: string, mimeType: string) => void;
  isLoading: boolean;
  uploadedImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, isLoading, uploadedImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const [meta, base64] = result.split(',');
        const mimeType = meta.split(':')[1].split(';')[0];
        onImageSelect(base64, mimeType);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            const [meta, base64] = result.split(',');
            const mimeType = meta.split(':')[1].split(';')[0];
            onImageSelect(base64, mimeType);
        };
        reader.readAsDataURL(file);
    }
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="file" id="input-file-upload" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isLoading} />
        <label
          htmlFor="input-file-upload"
          className={`relative flex flex-col items-center justify-center w-full h-64 border-4 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${dragActive ? 'border-green-500 bg-green-100' : 'border-green-200 bg-green-50 hover:bg-green-100'}`}
        >
          {uploadedImage ? (
            <img src={uploadedImage} alt="Uploaded plant" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h2a4 4 0 014 4v1m-2 8h2a4 4 0 004-4V7a4 4 0 00-4-4h-2m-4 7l.01.01M12 16l-2-2-4 4h12l-4-4-2 2z" />
              </svg>
              <p className="mb-2 text-sm text-green-700"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-green-600">SVG, PNG, JPG or WEBP</p>
            </div>
          )}
          {dragActive && <div className="absolute inset-0 w-full h-full rounded-lg" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </label>
      </form>
      <button 
        type="button" 
        onClick={openFilePicker} 
        disabled={isLoading}
        className="mt-4 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? 'Analyzing...' : uploadedImage ? 'Choose a Different Photo' : 'Select a Photo'}
      </button>
    </div>
  );
};

export default ImageUploader;
