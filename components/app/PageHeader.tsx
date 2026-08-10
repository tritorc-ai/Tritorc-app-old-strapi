export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="sticky top-0 z-10 bg-brand-surface px-5 pb-4 pt-[54px]">
      <div className="relative pl-3.5">
        <div className="absolute left-0 top-0.5 h-[26px] w-1 rounded-sm bg-linear-to-b from-brand-red to-brand-red-bright" />
        <div className="text-2xl font-bold leading-tight text-brand-dark">{title}</div>
        {subtitle && (
          <div className="mt-1 text-[13px] leading-snug text-brand-text-secondary">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
