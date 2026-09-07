interface Context {
  request: Request;
  next: () => Promise<Response>;
}

export async function onRequest(context: Context): Promise<Response> {
  const url = new URL(context.request.url);

  if (url.hostname === 'www.patrickarobinson.com') {
    url.hostname = 'patrickarobinson.com';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
