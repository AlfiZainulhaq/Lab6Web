// =========================================================================
// script.js — Praktikum 6: JavaScript DOM dan Event Handling (Lab6Web)
// =========================================================================

// -------------------------------------------------------------------------
// Latihan 1 — Mengubah teks dengan DOM
// -------------------------------------------------------------------------
const judul = document.getElementById("judul");
const pesan = document.getElementById("pesan");

judul.textContent = "Belajar JavaScript DOM";
pesan.textContent = "Konten berhasil diubah oleh JavaScript.";
console.log("Latihan 1: Judul dan pesan berhasil diperbarui melalui DOM.");

// Tombol tambahan untuk mengamati perubahan kalimat lain pada Latihan 1
const tombolUbahKalimat = document.getElementById("tombolUbahKalimat");
tombolUbahKalimat.addEventListener("click", function () {
    pesan.textContent = "Kalimat pesan berhasil diganti menjadi variasi teks baru!";
    console.log("Latihan 1: Pesan diubah menjadi kalimat lain.");
});

// -------------------------------------------------------------------------
// Latihan 2 — Event click
// -------------------------------------------------------------------------
const tombol = document.getElementById("tombolAksi");

tombol.addEventListener("click", function () {
    const waktuSekarang = new Date().toLocaleTimeString("id-ID");
    pesan.textContent = "Tombol diklik pada " + waktuSekarang;
    console.log("Latihan 2: Tombol diklik pada " + waktuSekarang);
});

// -------------------------------------------------------------------------
// Latihan 3 — Mengubah kelas dan gaya CSS
// -------------------------------------------------------------------------
const tombolGaya = document.getElementById("tombolGaya");
const teksGaya = document.getElementById("teksGaya");

tombolGaya.addEventListener("click", function () {
    teksGaya.classList.toggle("highlight");
    teksGaya.classList.toggle("teks-besar");
    console.log(
        "Latihan 3: classList saat ini ->",
        teksGaya.className || "(tidak ada class aktif)"
    );
});

// -------------------------------------------------------------------------
// Latihan 4 — Event input dan penghitung karakter
// -------------------------------------------------------------------------
const namaInput = document.getElementById("namaInput");
const jumlahKarakter = document.getElementById("jumlahKarakter");

namaInput.addEventListener("input", function () {
    jumlahKarakter.textContent = namaInput.value.length;
});

// -------------------------------------------------------------------------
// Latihan 5 & Eksperimen Mandiri No. 2 — Validasi form pendaftaran
// -------------------------------------------------------------------------
const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const usiaInput = document.getElementById("usia").value.trim();
    const usia = Number(usiaInput);
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset class status
    pesanForm.className = "status-box pesan-error";

    if (nama === "") {
        pesanForm.textContent = "Nama wajib diisi.";
        console.warn("Validasi Form Gagal: Nama kosong.");
    } else if (nama.length < 3) {
        // Eksperimen Mandiri No. 2: Nama minimal 3 karakter
        pesanForm.textContent = "Nama minimal harus terdiri dari 3 karakter.";
        console.warn("Validasi Form Gagal: Nama kurang dari 3 karakter.");
    } else if (!polaEmail.test(email)) {
        pesanForm.textContent = "Masukkan email yang valid.";
        console.warn("Validasi Form Gagal: Format email tidak valid.");
    } else if (usiaInput === "" || !Number.isInteger(usia) || usia < 17 || usia > 100) {
        pesanForm.textContent = "Usia harus berupa bilangan bulat 17–100.";
        console.warn("Validasi Form Gagal: Usia di luar rentang 17-100.");
    } else {
        pesanForm.className = "status-box pesan-sukses";
        pesanForm.textContent = "Validasi berhasil. Form siap diproses.";
        console.log("Validasi Form Berhasil:", { nama, email, usia });
        form.reset();
    }
});

// -------------------------------------------------------------------------
// Latihan 6 & Eksperimen Mandiri No. 1 — Daftar tugas sederhana (To-do List)
// -------------------------------------------------------------------------
const inputTugas = document.getElementById("inputTugas");
const tambahTugas = document.getElementById("tambahTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanTugas = document.getElementById("pesanTugas");

tambahTugas.addEventListener("click", function () {
    const teks = inputTugas.value.trim();

    if (teks === "") {
        pesanTugas.className = "status-box pesan-error";
        pesanTugas.textContent = "Tulis tugas terlebih dahulu.";
        return;
    }

    const item = document.createElement("li");
    const label = document.createElement("span");
    const grupTombol = document.createElement("div");
    const selesai = document.createElement("button");
    const hapus = document.createElement("button");

    // Menggunakan textContent agar aman dari injeksi markup HTML (XSS)
    label.textContent = teks + " ";

    selesai.type = "button";
    selesai.className = "small-btn";
    selesai.textContent = "Tandai selesai";

    selesai.addEventListener("click", function () {
        item.classList.toggle("selesai");
        selesai.textContent = item.classList.contains("selesai")
            ? "Batalkan selesai"
            : "Tandai selesai";
    });

    // Eksperimen Mandiri No. 1: Tombol untuk menghapus satu item dari To-do List
    hapus.type = "button";
    hapus.className = "danger";
    hapus.textContent = "Hapus";

    hapus.addEventListener("click", function () {
        item.remove();
        pesanTugas.className = "status-box";
        pesanTugas.textContent = 'Tugas "' + teks + '" telah dihapus.';
        console.log("Latihan 6: Item tugas dihapus ->", teks);
    });

    grupTombol.append(selesai, hapus);
    item.append(label, grupTombol);
    daftarTugas.appendChild(item);

    inputTugas.value = "";
    pesanTugas.className = "status-box pesan-sukses";
    pesanTugas.textContent = "Tugas ditambahkan.";
    inputTugas.focus();
});

// -------------------------------------------------------------------------
// Bagian F. Mini Project — Form Pendaftaran Workshop (+ Eksperimen No. 3)
// -------------------------------------------------------------------------
const formWorkshop = document.getElementById("formWorkshop");
const wsNama = document.getElementById("wsNama");
const wsEmail = document.getElementById("wsEmail");
const wsSesi = document.getElementById("wsSesi");
const wsCatatan = document.getElementById("wsCatatan");
const wsHitungKarakter = document.getElementById("wsHitungKarakter");
const wsResetBtn = document.getElementById("wsResetBtn");

const previewNama = document.getElementById("previewNama");
const previewEmail = document.getElementById("previewEmail");
const previewSesi = document.getElementById("previewSesi");
const previewCatatan = document.getElementById("previewCatatan");
const infoSesiChange = document.getElementById("infoSesiChange");
const pesanWorkshop = document.getElementById("pesanWorkshop");

// Fungsi Interaktif 1: Ringkasan input langsung (live preview) & penghitung karakter
function perbaruiRingkasanWorkshop() {
    previewNama.textContent = wsNama.value.trim() || "-";
    previewEmail.textContent = wsEmail.value.trim() || "-";
    previewCatatan.textContent = wsCatatan.value.trim() || "-";
    wsHitungKarakter.textContent = wsCatatan.value.length;
}

wsNama.addEventListener("input", perbaruiRingkasanWorkshop);
wsEmail.addEventListener("input", perbaruiRingkasanWorkshop);
wsCatatan.addEventListener("input", perbaruiRingkasanWorkshop);

// Fungsi Interaktif 2 & Eksperimen Mandiri No. 3: Event change pada dropdown sesi workshop
wsSesi.addEventListener("change", function () {
    const sesiTerpilih = wsSesi.value;
    if (sesiTerpilih === "") {
        previewSesi.textContent = "Belum memilih sesi";
        infoSesiChange.className = "status-box";
        infoSesiChange.textContent = "Info Sesi: Belum ada sesi workshop yang dipilih.";
    } else {
        previewSesi.textContent = sesiTerpilih;
        infoSesiChange.className = "status-box pesan-sukses";
        infoSesiChange.textContent = "Sesi dipilih: " + sesiTerpilih;
        console.log("Eksperimen 3 (Event change):", sesiTerpilih);
    }
});

// Fungsi Interaktif 3: Validasi saat form workshop di-submit
formWorkshop.addEventListener("submit", function (event) {
    event.preventDefault();

    const namaVal = wsNama.value.trim();
    const emailVal = wsEmail.value.trim();
    const sesiVal = wsSesi.value;
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    pesanWorkshop.className = "status-box pesan-error";

    if (namaVal.length < 3) {
        pesanWorkshop.textContent = "Kesalahan: Nama peserta wajib diisi minimal 3 karakter.";
        return;
    }

    if (!polaEmail.test(emailVal)) {
        pesanWorkshop.textContent = "Kesalahan: Format email peserta tidak valid.";
        return;
    }

    if (sesiVal === "") {
        pesanWorkshop.textContent = "Kesalahan: Silakan pilih salah satu sesi workshop.";
        return;
    }

    pesanWorkshop.className = "status-box pesan-sukses";
    pesanWorkshop.textContent =
        "Pendaftaran Berhasil! " + namaVal + " terdaftar pada " + sesiVal + ".";
    console.log("Mini Project Workshop Valid:", {
        nama: namaVal,
        email: emailVal,
        sesi: sesiVal,
        motivasi: wsCatatan.value.trim()
    });
});

// Fungsi Interaktif 4: Tombol Reset / Hapus Input
wsResetBtn.addEventListener("click", function () {
    formWorkshop.reset();
    previewNama.textContent = "-";
    previewEmail.textContent = "-";
    previewSesi.textContent = "Belum memilih sesi";
    previewCatatan.textContent = "-";
    wsHitungKarakter.textContent = "0";
    infoSesiChange.className = "status-box";
    infoSesiChange.textContent = "Info Sesi: Pilihan telah direset.";
    pesanWorkshop.className = "status-box";
    pesanWorkshop.textContent = "Form telah direset. Silakan isi kembali.";
    console.log("Mini Project: Form workshop direset.");
});

// -------------------------------------------------------------------------
// Eksperimen Mandiri No. 4 — Menyembunyikan / menampilkan paragraf via class CSS
// -------------------------------------------------------------------------
const tombolToggleParagraf = document.getElementById("tombolToggleParagraf");
const paragrafEksperimen = document.getElementById("paragrafEksperimen");

tombolToggleParagraf.addEventListener("click", function () {
    paragrafEksperimen.classList.toggle("tersembunyi");
    const statusTersembunyi = paragrafEksperimen.classList.contains("tersembunyi");
    console.log("Eksperimen 4: Paragraf tersembunyi =", statusTersembunyi);
});
