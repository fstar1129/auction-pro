export default function parseName(name: string, targetLength: number) {
  if (!name || !targetLength) {
    return;
  }

  return name.length >= targetLength ? name.replace(/#[0-9]+/, '')?.replace(/'(.*?)'/, '') : name.replace(/#[0-9]+/, '');
}
