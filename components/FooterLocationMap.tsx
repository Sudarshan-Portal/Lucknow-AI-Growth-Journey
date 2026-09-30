const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=26.828958895486075%2C80.94354596953123";

export function FooterLocationMap() {
  return (
    <section className="footer-location" aria-labelledby="footer-location-title">
      <div className="location-copy">
        <span className="location-status"><i aria-hidden="true" /> LUCKNOW · INDIA</span>
        <small>VISIT THE LAB</small>
        <h2 id="footer-location-title">FIND US<br /><em>ON THE MAP.</em></h2>
        <p>Nava Netra Neural Sudarshan AI Labs Private Limited</p>
        <a href={directionsUrl} target="_blank" rel="noreferrer">OPEN DIRECTIONS <b>↗</b></a>
      </div>
      <div className="location-map-shell">
        <span className="map-sticker">YOU ARE HERE ✦</span>
        <div className="location-map-frame">
          <a className="map-preview" href={directionsUrl} target="_blank" rel="noreferrer" aria-label="Open Sudarshan AI Labs in Google Maps">
            <span className="map-pin" aria-hidden="true">●</span>
            <strong>SUDARSHAN AI LABS</strong>
            <small>Lucknow, Uttar Pradesh · Open in Google Maps ↗</small>
          </a>
        </div>
        <div className="map-ticker" aria-hidden="true"><span>LUCKNOW • AI • GROWTH • AUTOMATION • DIGITAL INDIA • LUCKNOW • AI • GROWTH •</span></div>
      </div>
    </section>
  );
}
