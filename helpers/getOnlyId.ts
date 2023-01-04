export default function getOnlyId(value: string) {
  if (!value) return;

  return value.replace(/[^0-9]+/, "");
}
