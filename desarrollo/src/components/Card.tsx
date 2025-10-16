import type { ReactNode } from 'react';

interface CardProps {
  image: string;
  title: string;
  alt?: string;
  imgHeight?: string;
  imgWidth?: string;
  style?: string;
  children?: ReactNode;
}

export const Card = ({
  image,
  title,
  alt,
  imgHeight = 'h-48',
  imgWidth = 'w-full',
  style = '',
  children,
}: CardProps) => {
  return (
    <div className={`bg-white flex flex-col justify-end rounded-lg shadow-md ${style}`}>
      <img
        src={image}
        alt={alt || title}
        className={`${imgHeight} ${imgWidth} mx-auto`}
      />
      <div className="p-4">
        <h3 className="text-lg text-center font-semibold text-gray-800">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};
