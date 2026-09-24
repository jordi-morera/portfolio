// CloudFront Function (viewer request), runtime cloudfront-js-2.0
// Con S3 privado + OAC, CloudFront no resuelve /projects/calma/ -> /projects/calma/index.html.
// Esta función lo hace.
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    // /projects/calma -> redirige a /projects/calma/ (coherente con trailingSlash: 'always')
    return { statusCode: 301, statusDescription: 'Moved Permanently', headers: { location: { value: uri + '/' } } };
  }
  return request;
}
