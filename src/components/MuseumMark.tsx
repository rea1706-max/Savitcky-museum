import Image from 'next/image';

type MuseumMarkProps = {
  onDark?: boolean;
  size?: number;
  className?: string;
  priority?: boolean;
};

export default function MuseumMark({
  onDark = false,
  size = 44,
  className = '',
  priority = false,
}: MuseumMarkProps) {
  return (
    <Image
      src={onDark ? '/brand/savitsky-logo-mark-dark.svg' : '/brand/savitsky-logo-mark.svg'}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
      priority={priority}
    />
  );
}
