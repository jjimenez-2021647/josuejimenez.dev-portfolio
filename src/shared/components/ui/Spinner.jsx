/** Spinner de carga simple. */
export default function Spinner({ size = 24 }) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-[--color-border] border-t-[--color-accent]"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Cargando"
    />
  )
}
