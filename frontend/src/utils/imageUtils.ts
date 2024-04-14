function dataURLtoBlob(dataURL: string) {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

export function getBlobFromFile(file: File, callBack: (arg: Blob) => void) {
  const reader = new FileReader();

  // Add an event listener to the FileReader to handle when the file is loaded
  reader.onload = function (loadEvent) {
    // The result property contains the file data as a data URL
    const fileDataUrl = loadEvent?.target?.result;

    // Convert the data URL to a Blob
    if (fileDataUrl) {
      const blob = dataURLtoBlob(fileDataUrl as string);
      callBack(blob);
    }

    // Now, you have the image data as a Blob

    // You can use the Blob for various purposes, like uploading it to a server or displaying it in an HTML canvas.
  };

  // Read the selected file as a data URL
  reader.readAsDataURL(file);
}
