import React, { useCallback, useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';

interface IProps {
  images: string[];
  classname?: string;
}
export const CustomImageViewer: React.FC<IProps> = ({ images, classname = '' }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className={classname}>
      {images.map((src, index) => (
        <img
          src={src}
          onClick={() => openImageViewer(index)}
          width="300"
          key={src}
          style={{ margin: '2px' }}
          alt=""
        />
      ))}
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}
          closeOnClickOutside
        />
      )}
    </div>
  );
};
