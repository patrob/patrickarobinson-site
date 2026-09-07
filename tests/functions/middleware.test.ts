import { describe, it, expect, vi } from 'vitest';

interface Context {
  request: Request;
  next: () => Promise<Response>;
}

async function onRequest(context: Context): Promise<Response> {
  const url = new URL(context.request.url);

  if (url.hostname === 'www.patrickarobinson.com') {
    url.hostname = 'patrickarobinson.com';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}

describe('www redirect middleware', () => {
  it('should 301 redirect www.patrickarobinson.com to apex domain', async () => {
    const mockNext = vi.fn();
    const context: Context = {
      request: new Request('https://www.patrickarobinson.com/some/path?query=value'),
      next: mockNext,
    };

    const response = await onRequest(context);

    expect(response.status).toBe(301);
    expect(response.headers.get('Location')).toBe(
      'https://patrickarobinson.com/some/path?query=value'
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should preserve the full path when redirecting', async () => {
    const mockNext = vi.fn();
    const context: Context = {
      request: new Request('https://www.patrickarobinson.com/blog/my-post'),
      next: mockNext,
    };

    const response = await onRequest(context);

    expect(response.status).toBe(301);
    expect(response.headers.get('Location')).toBe('https://patrickarobinson.com/blog/my-post');
  });

  it('should preserve query parameters when redirecting', async () => {
    const mockNext = vi.fn();
    const context: Context = {
      request: new Request('https://www.patrickarobinson.com/?utm_source=twitter&ref=123'),
      next: mockNext,
    };

    const response = await onRequest(context);

    expect(response.status).toBe(301);
    expect(response.headers.get('Location')).toBe(
      'https://patrickarobinson.com/?utm_source=twitter&ref=123'
    );
  });

  it('should pass through requests to apex domain', async () => {
    const mockResponse = new Response('OK');
    const mockNext = vi.fn().mockResolvedValue(mockResponse);
    const context: Context = {
      request: new Request('https://patrickarobinson.com/'),
      next: mockNext,
    };

    const response = await onRequest(context);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(response).toBe(mockResponse);
  });

  it('should pass through requests to other domains', async () => {
    const mockResponse = new Response('OK');
    const mockNext = vi.fn().mockResolvedValue(mockResponse);
    const context: Context = {
      request: new Request('https://example.com/'),
      next: mockNext,
    };

    const response = await onRequest(context);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(response).toBe(mockResponse);
  });

  it('should handle root path redirect', async () => {
    const mockNext = vi.fn();
    const context: Context = {
      request: new Request('https://www.patrickarobinson.com/'),
      next: mockNext,
    };

    const response = await onRequest(context);

    expect(response.status).toBe(301);
    expect(response.headers.get('Location')).toBe('https://patrickarobinson.com/');
  });
});
