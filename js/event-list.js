import { events } from './data.js';

// Kart üreten fonksiyon (Sadece Detayları gör linki yer alıyor)
function createEventCard(event) {
  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <span class="kategori">${event.category}</span>
      <p><strong>Tarih:</strong> ${event.date}, ${event.time}</p>
      <p><strong>Yer:</strong> ${event.location}</p>
      <p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>
      <p style="margin-top: 8px;">${event.description}</p>
      
      <a href="etkinlik-detay.html?id=${event.id}" class="btn-link">Detayları gör</a>
    </article>
  `;
}

function renderEvents(eventsToRender, container) {
  if (!container) return;

  if (eventsToRender.length === 0) {
    container.innerHTML = '<p class="no-result">Aradığınız kriterlere uygun etkinlik bulunamadı.</p>';
    return;
  }

  container.innerHTML = eventsToRender.map(event => createEventCard(event)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Ana Sayfa (index.html) - Yaklaşan 2 Etkinlik
  const upcomingContainer = document.getElementById('upcoming-events');
  if (upcomingContainer) {
    renderEvents(events.slice(0, 2), upcomingContainer);
  }

  // 2. Etkinlikler Sayfası (etkinlikler.html) - Tüm Etkinlikler ve Arama
  const eventsContainer = document.getElementById('events-list');
  const searchInput = document.getElementById('search-input');
  const categorySelect = document.getElementById('category-select');
  const countText = document.getElementById('result-count-text');

  if (eventsContainer) {
    const updateEvents = () => {
      const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const selectedCategory = categorySelect ? categorySelect.value : 'Tümü';

      const filtered = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                              event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'Tümü' || event.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      renderEvents(filtered, eventsContainer);

      if (countText) {
        countText.textContent = `${filtered.length} etkinlik listeleniyor.`;
      }
    };

    updateEvents();

    if (searchInput) searchInput.addEventListener('input', updateEvents);
    if (categorySelect) categorySelect.addEventListener('change', updateEvents);
  }
});