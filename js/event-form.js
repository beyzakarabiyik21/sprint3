import { events } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. ETKİNLİK GÜNCELLE SAYFASI (etkinlik-guncelle.html)
  // -------------------------------------------------------------
  const updateContainer = document.getElementById('update-form-container');
  const warningContainer = document.getElementById('no-id-warning');
  const updateForm = document.getElementById('update-event-form');
  const updateMessageDiv = document.getElementById('update-message');

  if (updateContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    let eventId = urlParams.get('id');

    let selectedEvent = events.find(event => String(event.id) === String(eventId));
    
    if (!selectedEvent) {
      selectedEvent = events[0]; // Boş kalmasını önleme
    }

    if (warningContainer) warningContainer.style.display = 'none';
    updateContainer.style.display = 'block';

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('title', selectedEvent.title);
    setVal('category', selectedEvent.category || 'Seminer');
    setVal('date', selectedEvent.date);
    setVal('time', selectedEvent.time || '14:00');
    setVal('location', selectedEvent.location);
    setVal('capacity', selectedEvent.capacity);
    setVal('description', selectedEvent.description);

    // GÜNCELLE BUTONUNA BASILINCA YEŞİL KUTUYU OLUŞTURMA
    if (updateForm) {
      updateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (updateMessageDiv) updateMessageDiv.innerHTML = '';

        const formData = new FormData(updateForm);

        const updatedEvent = {
          id: selectedEvent.id,
          title: formData.get('title') ? formData.get('title').trim() : selectedEvent.title,
          category: formData.get('category') || selectedEvent.category,
          date: formData.get('date') || selectedEvent.date,
          time: formData.get('time') || selectedEvent.time,
          location: formData.get('location') ? formData.get('location').trim() : selectedEvent.location,
          capacity: formData.get('capacity') ? Number(formData.get('capacity')) : selectedEvent.capacity,
          description: formData.get('description') ? formData.get('description').trim() : selectedEvent.description
        };

        if (updateMessageDiv) {
          updateMessageDiv.innerHTML = `
            <div class="success-box">
              <p style="font-weight: bold; margin-bottom: 8px; color: #1e7e34;">Etkinlik güncellendi (bu sprintte kaydedilmez):</p>
              <pre style="background: #ffffff; padding: 12px; border-radius: 4px; border: 1px solid #c3e6cb; font-family: monospace; font-size: 0.85rem; overflow-x: auto; color: #222;">${JSON.stringify(updatedEvent, null, 2)}</pre>
            </div>
          `;
        }
      });
    }
  }

  // -------------------------------------------------------------
  // 2. ETKİNLİK EKLE SAYFASI DOĞRULAMASI (etkinlik-ekle.html)
  // -------------------------------------------------------------
  const addForm = document.getElementById('event-form');
  const messageDiv = document.getElementById('form-message');

  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();

      document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
      document.querySelectorAll('.custom-form input, .custom-form select, .custom-form textarea').forEach(el => {
        el.classList.remove('is-invalid');
      });
      if (messageDiv) messageDiv.innerHTML = '';

      const formData = new FormData(addForm);

      const title = formData.get('title') ? formData.get('title').trim() : '';
      const category = formData.get('category');
      const date = formData.get('date');
      const time = formData.get('time');
      const location = formData.get('location') ? formData.get('location').trim() : '';
      const capacity = formData.get('capacity') ? Number(formData.get('capacity')) : null;
      const description = formData.get('description') ? formData.get('description').trim() : '';

      let hasError = false;

      if (!title || title.length < 3) {
        showError('title', 'Etkinlik adı en az 3 karakter olmalıdır.');
        hasError = true;
      }
      if (!category) {
        showError('category', 'Bir kategori seçiniz.');
        hasError = true;
      }
      if (!date) {
        showError('date', 'Tarih seçiniz.');
        hasError = true;
      }
      if (!time) {
        showError('time', 'Saat seçiniz.');
        hasError = true;
      }
      if (!location) {
        showError('location', 'Yer bilgisi giriniz.');
        hasError = true;
      }

      if (hasError) return;

      const newEvent = {
        id: `event-${Date.now().toString().slice(-3)}`,
        title,
        category,
        date,
        time,
        location,
        capacity: capacity || 0,
        description
      };

      events.push(newEvent);

      if (messageDiv) {
        messageDiv.innerHTML = `
          <div class="success-box">
            <p style="font-weight: bold; margin-bottom: 8px; color: #1e7e34;">Etkinlik oluşturuldu (bu sprintte kaydedilmez):</p>
            <pre style="background: #ffffff; padding: 12px; border-radius: 4px; border: 1px solid #c3e6cb; font-family: monospace; font-size: 0.85rem; overflow-x: auto; color: #222;">${JSON.stringify(newEvent, null, 2)}</pre>
          </div>
        `;
      }
    });
  }

  function showError(fieldId, message) {
    const inputElement = document.getElementById(fieldId);
    const errorElement = document.getElementById(`error-${fieldId}`);

    if (inputElement) inputElement.classList.add('is-invalid');
    if (errorElement) errorElement.textContent = message;
  }
});