/**
 * Centres content in either the standard narrow or wide layout container.
 * Uses the project-wide `container-narrow` / `container-wide` Tailwind tokens
 * so that any future token rename only needs updating here.
 *
 * @param wide    Use the wide container (default: false → narrow)
 * @param children Content to wrap
 */
export default function Container({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "container-wide" : "container-narrow"}>
      {children}
    </div>
  );
}