document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quizForm');
  const result = document.getElementById('quizResult');
  const resultSummary = document.getElementById('resultSummary');
  const resultCards = document.getElementById('resultCards');
  const waLink = document.getElementById('waLink');

  const WHATSAPP_NUMBER = '6285221282482';
  const PRODUCTS = {
    futsal: {
      title: 'Jersey Futsal (Custom)',
      desc: 'Nyaman untuk indoor, layout sponsor rapi, bisa nama/nomor full custom.',
      badge: 'Custom',
    },
    football: {
      title: 'Jersey Sepak Bola (Custom)',
      desc: 'Cocok latihan/pertandingan, pilihan model kerah/lengan, identitas tim konsisten.',
      badge: 'Custom',
    },
    cycling: {
      title: 'Jersey Sepeda (Cycling)',
      desc: 'Motif standout untuk komunitas gowes/event, tetap nyaman dipakai.',
      badge: 'Custom',
    },
    esports: {
      title: 'Jersey Esports',
      desc: 'Look pro untuk tim esports, warna tajam dan layout sponsor jelas.',
      badge: 'Custom',
    },
    training: {
      title: 'Training Set',
      desc: 'Set latihan matching untuk kegiatan rutin tim/komunitas.',
      badge: 'Tim',
    },
    outer: {
      title: 'Jaket Tim / Polo Komunitas',
      desc: 'Official look untuk seragam panitia, sekolah, komunitas, dan event.',
      badge: 'Tim',
    },
  };

  function cardHTML({ title, desc, badge }) {
    return `
      <article class="product-card">
        <div class="product-top">
          <div class="product-badge">${badge}</div>
          <h3 class="product-title">${title}</h3>
        </div>
        <p class="product-desc">${desc}</p>
      </article>
    `;
  }

  function buildWhatsAppMessage(answers, recommendedTitles) {
    const { need, sport, qty, deadline, design } = answers;

    const qtyText =
      qty === 'small' ? '1–10 pcs' : qty === 'mid' ? '11–25 pcs' : '26+ pcs';
    const deadlineText =
      deadline === 'rush' ? 'Cepat (urgent)' : deadline === 'normal' ? 'Normal' : 'Fleksibel';
    const designText = design === 'yes' ? 'Sudah ada desain/logo' : 'Belum ada, minta dibantu desain';
    const sportText =
      sport === 'futsal' ? 'Futsal' : sport === 'football' ? 'Sepak bola' : sport === 'cycling' ? 'Cycling' : 'Lainnya';
    const needText =
      need === 'match' ? 'Pertandingan' : need === 'training' ? 'Latihan rutin' : need === 'event' ? 'Event/komunitas' : 'Esports';

    const lines = [
      'Halo Cobra Sport Apparel, saya mau konsultasi/pesan.',
      '',
      `Kebutuhan: ${needText}`,
      `Kategori: ${sportText}`,
      `Jumlah: ${qtyText}`,
      `Deadline: ${deadlineText}`,
      `Desain/logo: ${designText}`,
      '',
      `Rekomendasi dari website: ${recommendedTitles.join(', ')}`,
      '',
      'Boleh minta info harga, bahan, dan estimasi produksi?',
    ];

    return lines.join('\n');
  }

  function recommend(answers) {
    const rec = [];

    if (answers.need === 'esports') rec.push(PRODUCTS.esports);
    if (answers.need === 'training') rec.push(PRODUCTS.training);
    if (answers.need === 'event') rec.push(PRODUCTS.outer);

    if (answers.sport === 'futsal') rec.push(PRODUCTS.futsal);
    if (answers.sport === 'football') rec.push(PRODUCTS.football);
    if (answers.sport === 'cycling') rec.push(PRODUCTS.cycling);

    // fallback
    if (rec.length === 0) rec.push(PRODUCTS.futsal, PRODUCTS.training);

    // dedupe by title
    const seen = new Set();
    return rec.filter((p) => {
      if (seen.has(p.title)) return false;
      seen.add(p.title);
      return true;
    }).slice(0, 3);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const answers = {
      need: data.get('need'),
      sport: data.get('sport'),
      qty: data.get('qty'),
      deadline: data.get('deadline'),
      design: data.get('design'),
    };

    const rec = recommend(answers);
    const recommendedTitles = rec.map((r) => r.title);

    resultCards.innerHTML = rec.map(cardHTML).join('');
    resultSummary.textContent =
      'Berikut rekomendasi produk berdasarkan jawaban kamu. Klik WhatsApp untuk lanjut konsultasi dan kami bantu hitung estimasi.';

    const msg = buildWhatsAppMessage(answers, recommendedTitles);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    waLink.href = waUrl;

    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

