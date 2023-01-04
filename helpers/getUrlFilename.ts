export default function getUrlFilename(filename, size, extension) {
  return (
    filename.substring(0, filename.lastIndexOf(".")) + size + extension ||
    filename
  );
}
