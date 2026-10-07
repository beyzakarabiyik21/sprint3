import { events } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('event-detail-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  // ID'ye karşılık gelen etkinliği bul (Bulunamazsa listedeki ilk etkinliği göster)
  const selectedEvent = events.find(event => String(event.id) === String(eventId)) || events[0];

  if (!selectedEvent) return;

  // Üst yeşil alandaki başlığı tıklanan etkinliğin adı yap
  const headerTitle = document.getElementById('header-title');
  if (headerTitle) {
    headerTitle.textContent = selectedEvent.title;
  }

  // Detay Düzeni (Sol Afiş + Sağ Künye)
  container.innerHTML = `
    <div style="display: flex; gap: 40px; flex-wrap: wrap; margin-top: 10px; align-items: flex-start;">
      
      <!-- Sol Taraf: Afiş Görseli -->
      <div style="flex: 1; min-width: 280px; max-width: 420px;">
        <div style="background-color: #1b263b; border: 3px solid #e07a5f; padding: 50px 20px; text-align: center; color: white; border-radius: 4px;">
          <h2 style="font-size: 2rem; margin-bottom: 12px; font-weight: normal; color: #ffffff;">${selectedEvent.title}</h2>
          <p style="font-size: 1.4rem; color: #e07a5f; margin-bottom: 25px; font-weight: bold;">2026</p>
          <p style="font-size: 0.95rem; opacity: 0.9; color: #ffffff;">${selectedEvent.date} · ${selectedEvent.location}</p>
        </div>
        <p style="font-style: italic; color: #666; font-size: 0.85rem; margin-top: 8px;">${selectedEvent.title} afişi</p>
      </div>

      <!-- Sağ Taraf: Etkinlik Künyesi Kutusu -->
      <div style="width: 340px; background: #ffffff; border: 1px solid #e2e8e0; padding: 22px; border-radius: 8px;">
        <h3 style="margin-bottom: 18px; font-size: 1.25rem; color: #1a1a1a;">Etkinlik Künyesi</h3>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <tr style="height: 32px;">
            <td style="font-weight: bold; width: 100px; color: #222;">Tarih</td>
            <td style="color: #444;">${selectedEvent.date}, ${selectedEvent.time || '14:00'}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="font-weight: bold; color: #222;">Yer</td>
            <td style="color: #444;">${selectedEvent.location}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="font-weight: bold; color: #222;">Kategori</td>
            <td style="color: #444;">${selectedEvent.category}</td>
          </tr>
          <tr style="height: 32px;">
            <td style="font-weight: bold; color: #222;">Kontenjan</td>
            <td style="color: #444;">${selectedEvent.capacity} kişi</td>
          </tr>
        </table>
      </div>

    </div>

    <!-- Alt Taraf: Açıklama ve Butonlar -->
    <div style="margin-top: 30px;">
      <h3 style="font-size: 1.25rem; margin-bottom: 10px; color: #1a1a1a;">Açıklama</h3>
      <p style="color: #444; margin-bottom: 25px; font-size: 0.95rem;">${selectedEvent.description}</p>

      <div style="display: flex; gap: 12px; align-items: center;">
        <a href="etkinlikler.html" class="btn" style="background-color: #248a3d; padding: 10px 20px;">← Listeye dön</a>
        <a href="etkinlik-guncelle.html?id=${selectedEvent.id}" class="btn" style="background-color: #248a3d; padding: 10px 20px;">Bu etkinliği güncelle</a>
      </div>
    </div>
  `;
});