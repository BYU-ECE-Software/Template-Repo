import Image from 'next/image';
import Tag from '@/components/general/data-display/Tag';
import type { TagVariant } from '@/components/general/data-display/Tag';
import Button from '@/components/general/actions/Button';
import type { ButtonVariant } from '@/components/general/actions/Button';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardImagePosition = 'top' | 'background';

export type CardAction = {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
};

export type CardTag = {
  label: string;
  variant?: TagVariant;
};

export type CardProps = {
  // Content
  title?: string;
  subtitle?: string;
  description?: string;

  // Image
  image?: string;
  imageAlt?: string;
  imagePosition?: CardImagePosition; // 'top' = image above content, 'background' = image fills card with text overlay

  // Tag chip
  tag?: CardTag;

  // Actions
  action?: CardAction;
  secondaryAction?: CardAction;

  // Left accent stripe — good for list-style cards
  accent?: boolean;
  accentColor?: string; // tailwind bg class e.g. 'bg-byu-royal'

  className?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Card({
  title,
  subtitle,
  description,
  image,
  imageAlt = '',
  imagePosition = 'top',
  tag,
  action,
  secondaryAction,
  accent = false,
  accentColor = 'bg-byu-royal',
  className = '',
}: CardProps) {
  // ── Background image layout ──────────────────────────────────────────────
  if (image && imagePosition === 'background') {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl shadow-md ${className}`}
        style={{ minHeight: 320 }}
      >
        {/* Full bleed image */}
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content pinned to bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          {tag && (
            <div className="mb-2">
              <Tag label={tag.label} variant={tag.variant ?? 'gray'} size="sm" />
            </div>
          )}
          {title && <h3 className="pr-28 text-xl leading-tight font-bold">{title}</h3>}
          {subtitle && <p className="mt-0.5 text-sm text-white/70">{subtitle}</p>}
          {description && (
            <p className="mt-2 text-sm leading-relaxed text-white/80">{description}</p>
          )}

          {(action || secondaryAction) && (
            <div className="mt-4 flex gap-2">
              {secondaryAction && (
                <Button
                  label={secondaryAction.label}
                  variant="ghost"
                  size="sm"
                  onClick={secondaryAction.onClick}
                  className="border border-white/50 text-white hover:bg-white/20"
                />
              )}
              {action && (
                <Button
                  label={action.label}
                  variant={action.variant ?? 'primary'}
                  size="sm"
                  onClick={action.onClick}
                  fullWidth={!secondaryAction}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Top image + content layout (default) ────────────────────────────────
  return (
    <div
      className={`flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      {/* Left accent stripe */}
      {accent && <div className={`w-1 shrink-0 ${accentColor}`} />}

      <div className="flex flex-1 flex-col">
        {/* Top image */}
        {image && imagePosition === 'top' && (
          <div className="relative h-44 w-full shrink-0 overflow-hidden">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Card body */}
        <div className="relative flex flex-1 flex-col gap-2 p-5">
          {tag && (
            <Tag
              label={tag.label}
              variant={tag.variant ?? 'gray'}
              size="sm"
              className="absolute top-4 right-4"
            />
          )}

          {title && (
            <h3 className="text-byu-navy pr-28 text-base leading-snug font-bold">{title}</h3>
          )}

          {subtitle && <p className="text-sm font-medium text-gray-500">{subtitle}</p>}

          {description && <p className="text-sm leading-relaxed text-gray-600">{description}</p>}

          {(action || secondaryAction) && (
            <div className="mt-auto flex gap-2 pt-3">
              {secondaryAction && (
                <Button
                  label={secondaryAction.label}
                  variant={secondaryAction.variant ?? 'secondary'}
                  size="sm"
                  onClick={secondaryAction.onClick}
                />
              )}
              {action && (
                <Button
                  label={action.label}
                  variant={action.variant ?? 'primary'}
                  size="sm"
                  onClick={action.onClick}
                  fullWidth={!secondaryAction}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
