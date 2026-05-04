interface SourceLinkProps {
  href: string;
  label?: string;
}

export default function SourceLink({ href, label = 'source' }: SourceLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary hover:text-accent text-xs font-medium transition-colors duration-200 align-super"
      aria-label={`Source: ${label}`}
    >
      [{label}]
    </a>
  );
}
