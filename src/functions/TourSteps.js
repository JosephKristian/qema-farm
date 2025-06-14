const tourSteps = {
    '/': [
        {
            selector: '.tour-navbar',
            content: 'Mulai Tur Panduan.',
        },
        {
            selector: '.tour-dashboard',
            content: 'Ini adalah panel utama yang akan menampilkan informasi penting di dashboard Anda.',
        },
        {
            selector: '.tour-goat',
            content: 'Klik di sini untuk melihat berbagai jenis ternak.',
        },
        {
            selector: '.tour-food',
            content: 'Klik di sini untuk melihat jenis pakan ternak.',
        },
        {
            selector: '.tour-maintenance',
            content: 'Klik di sini untuk melihat daftar perawatan ternak.',
        },
        {
            selector: '.tour-chart',
            content: 'Bagian ini menampilkan grafik harga jual ternak terkini.',
        },
        {
            selector: '.tour-article',
            content: 'Bagian artikel yang mengedukasi tentang pengelolaan limbah ternak.',
        },
        {
            selector: '.tour-login-button',
            content: 'Masuk dengan tombol ini untuk mulai berinvestasi dengan pengalaman yang dipersonalisasi.',
        },
    ],

    '/breeding': [
        {
            selector: '.tour-breeding-header',
            content: 'Selamat datang di halaman Breeding QEMA FARM! Di sini Anda dapat memilih paket breeding terbaik untuk kambing Anda.',
        },
        {
            selector: '.tour-breeding-description',
            content: 'Inilah penjelasan singkat tentang layanan breeding QEMA FARM. Kami memberikan jasa breeding bersama perawatan, monitoring, dan edukasi langsung di peternakan.',
        },
        {
            selector: '.tour-breeding-chosen',
            content: 'Di sini akan muncul detail paket breeding yang Anda pilih. Jika belum ada, silakan pilih salah satu opsi di bawah.',
        },
        {
            selector: '.tour-breeding-benefit',
            content: 'Berikut adalah manfaat utama menggunakan layanan breeding kami: jasa breeding, perawatan berkala, akses CCTV, dan pengalaman langsung dari ahli.',
        },
        {
            selector: '.tour-breeding-options',
            content: 'Silakan pilih salah satu paket breeding yang tersedia. Setiap paket memiliki fitur dan harga yang berbeda.',
        },
        {
            selector: '.tour-breeding-chosen-2',
            content: 'Pilihan akan masuk ke tabel ini dan nanti akan muncul tombol transaksi dibawah tabel.',
        },
    ],

    '/investasi': [
        {
            selector: '.tour-goat-header',
            content: 'Ini adalah halaman investasi untuk memilih ternak, makanan, dan perawatan.',
        },
        {
            selector: '.tour-goat-filter',
            content: 'Gunakan filter ini untuk mencari ternak berdasarkan nama atau jenis kelamin.',
        },
        {
            selector: '.tour-goat-card',
            content: 'Klik kartu ternak untuk memilih ternak yang ingin diinvestasikan.',
        },
        {
            selector: '.tour-invest-card',
            content: 'Setelah itu pilihanmu akan masuk ke tabel ini.',
        },
        {
            selector: '.tour-invest-button',
            content: 'Setelah memihlih ternak, pilih makanan dan perawatan yang sesuai. maka tombol investasi dapat digunakan',
        },
    ],


    '/kambing': [
        {
            selector: '.tour-goat-header',
            content: 'Ini adalah halaman daftar kambing yang tersedia.',
        },
        {
            selector: '.tour-goat-filter',
            content: 'Gunakan filter untuk mencari ternak berdasarkan jenis atau usia.',
        },
        {
            selector: '.tour-goat-card',
            content: 'Klik pada kartu kambing untuk melihat detail lebih lanjut.',
        },
    ],

    '/pakan': [
        {
            selector: '.tour-food-header',
            content: 'Daftar berbagai jenis pakan ternak.',
        },
        {
            selector: '.tour-food-chart',
            content: 'Grafik ini menunjukkan konsumsi pakan harian.',
        },
        {
            selector: '.tour-food-form',
            content: 'Gunakan form ini untuk menambahkan jenis pakan baru.',
        },
    ],

    '/perawatan': [
        {
            selector: '.tour-maintenance-header',
            content: 'Halaman ini menampilkan daftar kegiatan perawatan ternak.',
        },
        {
            selector: '.tour-maintenance-schedule',
            content: 'Lihat dan kelola jadwal perawatan di sini.',
        },
    ],

    '/artikel': [
        {
            selector: '.tour-article-header',
            content: 'Kumpulan artikel edukatif seputar peternakan dan limbah.',
        },
        {
            selector: '.tour-article-read',
            content: 'Klik artikel untuk membaca lebih lanjut.',
        },
        {
            selector: '.tour-article-create',
            content: 'Tambahkan artikel baru yang bermanfaat untuk peternak.',
        },
    ],

    '/statistik': [
        {
            selector: '.tour-statistic-header',
            content: 'Laporan statistik performa peternakan kamu.',
        },
        {
            selector: '.tour-statistic-chart',
            content: 'Visualisasi data: populasi ternak, produksi, dll.',
        },
        {
            selector: '.tour-statistic-export',
            content: 'Ekspor data statistik ke format Excel atau PDF.',
        },
    ],
    '/portofolio': [
        {
            selector: '.tour-portofolio-cards',
            content: 'Panel sebelah kiri berisi berbagai informasi dan fitur yang tersedia dalam bentuk kartu.',
        },
        {
            selector: '.tour-portofolio-simulation-title',
            content: 'Bagian simulasi kalkulasi harga ternak untuk per 3 bulan, baik di hari biasa maupun Idul Adha.',
        },
        {
            selector: '.tour-portofolio-table-ternak',
            content: 'Tabel detail kepemilikan ternak milikmu, termasuk berat awal dan terkini.',
        },
        {
            selector: '.tour-portofolio-table-paket',
            content: 'Tabel transaksi paket yang telah kamu lakukan, termasuk informasi harga dan waktu.',
        },
    ],

    '/profil': [
        {
            selector: '.tour-profile-info',
            content: 'Informasi pribadi dan kredensial akun kamu.',
        },
        {
            selector: '.tour-profile-edit',
            content: 'Klik untuk mengedit profil pengguna.',
        },
    ],

    '/pengaturan': [
        {
            selector: '.tour-settings-general',
            content: 'Pengaturan umum aplikasi Qema Farm.',
        },
        {
            selector: '.tour-settings-theme',
            content: 'Sesuaikan tema dan tampilan antarmuka.',
        },
        {
            selector: '.tour-settings-notif',
            content: 'Atur preferensi notifikasi dan pemberitahuan.',
        },
    ],
};

export default tourSteps;
