import { ImageResponse } from 'next/og';

export const alt = 'Savitsky Museum — Nukus, Karakalpakstan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: '#191816',
        color: '#F2EBDD',
        padding: '72px 78px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          opacity: 0.28,
          background:
            'linear-gradient(118deg, #191816 0%, #191816 44%, #654236 44.2%, #8A7258 71%, #E8DFCF 71.2%, #E8DFCF 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <svg width="78" height="78" viewBox="0 0 64 64" fill="none">
            <path d="M32 7 57 32 32 57 7 32 32 7Z" stroke="#F2EBDD" strokeWidth="1.6" />
            <path d="m32 18 14 14-14 14-14-14 14-14Z" stroke="#F2EBDD" strokeWidth="1.6" />
            <path d="M32 7v11M32 46v11" stroke="#F2EBDD" strokeWidth="1.6" />
            <circle cx="32" cy="32" r="3.2" fill="#9D3028" />
          </svg>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ fontSize: 33, letterSpacing: 9 }}>Savitsky</span>
            <span style={{ marginTop: 5, color: '#C4B59F', fontSize: 18, letterSpacing: 11 }}>
              Museum
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: 790 }}>
          <span
            style={{ color: '#C4B59F', fontSize: 20, letterSpacing: 6, textTransform: 'uppercase' }}
          >
            Nukus · Karakalpakstan
          </span>
          <span
            style={{
              marginTop: 20,
              fontFamily: 'Georgia, serif',
              fontSize: 72,
              lineHeight: 0.98,
              letterSpacing: -2.4,
            }}
          >
            Avant-garde and living heritage in the desert
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ width: 94, height: 1, background: '#9D3028' }} />
          <span
            style={{ color: '#C4B59F', fontSize: 17, letterSpacing: 4, textTransform: 'uppercase' }}
          >
            savitsky.87-192-248-137.sslip.io
          </span>
        </div>
      </div>
    </div>,
    size
  );
}
