function formatSize(size: any) {
  if (size < 1024) {
    return size + "B";
  } else if (size > 1024 && size < 1048576) {
    return (size / 1024).toFixed(1) + "KB";
  } else if (size > 1048576 && size < 1073741824) {
    return (size / 1048576).toFixed(1) + "MB";
  } else {
    return (size / 1073741824).toFixed(1) + "GB";
  }
}

export default formatSize;

// function formatSize(size: any) {
//   if (size > 1024 * 1024 * 1024) {
//     return (size / (1024 * 1024 * 1024)).toFixed(1) + "GB";
//   }
//   if (size > 1024 * 1024) {
//     return (size / (1024 * 1024)).toFixed(1) + "MB";
//   }
//   if (size > 1024) {
//     return (size / 1024).toFixed(1) + "KB";
//   }

//   return size + "B";
// }
