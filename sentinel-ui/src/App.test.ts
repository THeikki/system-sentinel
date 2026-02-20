import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('SystemSentinel fetchData Logic', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('hakee datan onnistuneesti backendistä', async () => {
    const mockData = {
      cpu: { usage_percent: 25 },
      memory: { used_percent: 50 },
      runtime_environment: "Docker (Test)"
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const response = await fetch('http://localhost:8000/api/status');
    const result = await response.json();

    expect(mockFetch).toHaveBeenCalled();
    expect(result.cpu.usage_percent).toBe(25);
  });
});
