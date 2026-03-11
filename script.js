document.addEventListener('DOMContentLoaded', function() {
    const footerAddress = document.querySelector('.footer-address');
    const mapsUrl = 'https://maps.app.goo.gl/J5EyChM5PrXbYTMq8';
    
    // Hitung waktu animasi
    setTimeout(() => {
        if (footerAddress) footerAddress.classList.add('finished');
    }, 4000);

    // Klik alamat footer membuka Google Maps
    if (footerAddress) {
        footerAddress.addEventListener('click', () => {
            window.open(mapsUrl, '_blank', 'noreferrer');
        });
    }
});
