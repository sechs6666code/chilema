import { useState } from 'react';
import { Utensils } from 'lucide-react';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export function FoodImage({ src, alt, className = '' }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={`${alt}图片暂不可用`}>
        <Utensils size={34} strokeWidth={1.5} />
        <span>{alt}</span>
      </div>
    );
  }

  return <img className={className} src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}
