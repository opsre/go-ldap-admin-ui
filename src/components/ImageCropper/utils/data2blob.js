/**
 * Convert database64 file format to binary
 *
 * @param  {[String]} data The dataURL format is data:image/png;base64,****. The text before the comma is descriptive; only the content after the comma is needed.
 * @param  {[String]} mime [description]
 * @return {[blob]}      [description]
 */
export default function(data, mime) {
  data = data.split(',')[1]
  data = window.atob(data)
  var ia = new Uint8Array(data.length)
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  // canvas.toDataURL returns image/png as the default format
  return new Blob([ia], {
    type: mime
  })
}
