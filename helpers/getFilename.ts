export default function getFilename(filename, extension) {
  const baseURL =
    "https://arrland-media.s3-eu-central-1.amazonaws.com/cache/0xe804f5A2b14ae03345fffB89bded13A2EF5ceFA7/";
  let extractedFilename = filename
    .toString()
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");
  return baseURL + extractedFilename + extension;
}
