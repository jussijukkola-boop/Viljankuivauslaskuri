// Viljakohtaiset korjauskertoimet
const viljakertoimet = {
    ohra: 1.0,
    vehnä: 0.95,
    kaura: 0.9
};

// Lataa kalibrointitiedot ja historia localStoragesta
let kalibrointi = JSON.parse(localStorage.getItem('kalibrointi')) || {};
let historia = JSON.parse(localStorage.getItem('historia')) || [];

// Näytä tulos
function naytaTulos(viesti, luokka) {
    const tulos = document.getElementById('tulos');
    tulos.innerText = viesti;
    tulos.className = `alert ${luokka}`;
    tulos.style.display = 'block';
}

// Päivitä historiataulukko
function paivitaHistoria() {
    const taulukko = document.getElementById('historiaTaulukko');
    taulukko.innerHTML = '';
    historia.forEach((tapahtuma, index) => {
        const rivi = `
            <tr>
                <td>${tapahtuma.tyyppi}</td>
                <td>${tapahtuma.viljalaji.charAt(0).toUpperCase() + tapahtuma.viljalaji.slice(1)}</td>
                <td>${tapahtuma.alkukosteus}</td>
                <td>${tapahtuma.loppukosteus}</td>
                <td>${tapahtuma.paino}</td>
                <td>${tapahtuma.kuivausaika ? tapahtuma.kuivausaika.toFixed(2) : '-'}</td>
                <td>${tapahtuma.lampotila}</td>
                <td>${tapahtuma.ilmankosteus}</td>
                <td>${tapahtuma.haihdutusnopeus ? tapahtuma.haihdutusnopeus.toFixed(2) : '-'}</td>
                <td>
                    ${tapahtuma.tyyppi === 'Kalibrointi' ? `<button class="btn btn-sm btn-danger" onclick="poistaKalibrointi('${tapahtuma.viljalaji}', ${index})">Poista</button>` : ''}
                </td>
            </tr>`;
        taulukko.innerHTML += rivi;
    });
}

// Poista kalibrointi
function poistaKalibrointi(viljalaji, index) {
    delete kalibrointi[viljalaji];
    historia.splice(index, 1);
    localStorage.setItem('kalibrointi', JSON.stringify(kalibrointi));
    localStorage.setItem('historia', JSON.stringify(historia));
    paivitaHistoria();
    naytaTulos(`Kalibrointi poistettu viljalle ${viljalaji}.`, 'alert-warning');
}

function kalibroi() {
    const viljalaji = document.getElementById('viljalaji_kalibrointi').value;
    const alkukosteus_1 = parseFloat(document.getElementById('alkukosteus_1').value);
    const loppukosteus_1 = parseFloat(document.getElementById('loppukosteus_1').value);
    const paino_1 = parseFloat(document.getElementById('paino_1').value);
    const kuivausaika_1 = parseFloat(document.getElementById('kuivausaika_1').value);
    const lampotila_1 = parseFloat(document.getElementById('lampotila_1').value);
    const ilmankosteus_1 = parseFloat(document.getElementById('ilmankosteus_1').value);

    // Validointi
    if (isNaN(alkukosteus_1) || isNaN(loppukosteus_1) || isNaN(paino_1) || isNaN(kuivausaika_1) || isNaN(lampotila_1) || isNaN(ilmankosteus_1)) {
        naytaTulos('Virhe: Syötä kaikki tiedot oikein.', 'alert-danger');
        return;
    }
    if (alkukosteus_1 <= loppukosteus_1 || alkukosteus_1 < 0 || loppukosteus_1 < 0 || alkukosteus_1 > 100 || loppukosteus_1 >= 100) {
        naytaTulos('Virhe: Alkukosteuden tulee olla suurempi kuin loppukosteus ja välillä 0–100%.', 'alert-danger');
        return;
    }
    if (paino_1 <= 0 || kuivausaika_1 <= 0 || lampotila_1 <= 0) {
        naytaTulos('Virhe: Painon, kuivausajan ja lämpötilan tulee olla suurempia kuin 0.', 'alert-danger');
        return;
    }
    if (ilmankosteus_1 < 0 || ilmankosteus_1 >= 100) {
        naytaTulos('Virhe: Ilmankosteuden tulee olla välillä 0–99%.', 'alert-danger');
        return;
    }

    // Laske haihdutettu vesimäärä
    const haihdutettava_vesi_1 = (paino_1 * (alkukosteus_1 - loppukosteus_1)) / (100 - loppukosteus_1);
    const haihdutusnopeus = haihdutettava_vesi_1 / kuivausaika_1;

    // Tallenna kalibrointitiedot
    kalibrointi[viljalaji] = {
        E: haihdutusnopeus,
        T_ref: lampotila_1,
        RH_ref: ilmankosteus_1
    };

    // Tallenna historia
    historia.push({
        tyyppi: 'Kalibrointi',
        viljalaji,
        alkukosteus: alkukosteus_1,
        loppukosteus: loppukosteus_1,
        paino: paino_1,
        kuivausaika: kuivausaika_1,
        lampotila: lampotila_1,
        ilmankosteus: ilmankosteus_1,
        haihdutusnopeus
    });

    localStorage.setItem('kalibrointi', JSON.stringify(kalibrointi));
    localStorage.setItem('historia', JSON.stringify(historia));
    paivitaHistoria();
    naytaTulos(`Kalibrointi suoritettu viljalle ${viljalaji}. Haihdutusnopeus: ${haihdutusnopeus.toFixed(2)} kg/h`, 'alert-success');
}

function ennusta() {
    const viljalaji = document.getElementById('viljalaji_ennuste').value;
    const alkukosteus_2 = parseFloat(document.getElementById('alkukosteus_2').value);
    const loppukosteus_2 = parseFloat(document.getElementById('loppukosteus_2').value);
    const paino_2 = parseFloat(document.getElementById('paino_2').value);
    const lampotila_2 = parseFloat(document.getElementById('lampotila_2').value);
    const ilmankosteus_2 = parseFloat(document.getElementById('ilmankosteus_2').value);

    // Validointi
    if (isNaN(alkukosteus_2) || isNaN(loppukosteus_2) || isNaN(paino_2) || isNaN(lampotila_2) || isNaN(ilmankosteus_2)) {
        naytaTulos('Virhe: Syötä kaikki tiedot oikein.', 'alert-danger');
        return;
    }
    if (alkukosteus_2 <= loppukosteus_2 || alkukosteus_2 < 0 || loppukosteus_2 < 0 || alkukosteus_2 > 100 || loppukosteus_2 >= 100) {
        naytaTulos('Virhe: Alkukosteuden tulee olla suurempi kuin loppukosteus ja välillä 0–100%.', 'alert-danger');
        return;
    }
    if (paino_2 <= 0 || lampotila_2 <= 0) {
        naytaTulos('Virhe: Painon ja lämpötilan tulee olla suurempia kuin 0.', 'alert-danger');
        return;
    }
    if (ilmankosteus_2 < 0 || ilmankosteus_2 >= 100) {
        naytaTulos('Virhe: Ilmankosteuden tulee olla välillä 0–99%.', 'alert-danger');
        return;
    }
    if (!kalibrointi[viljalaji]) {
        naytaTulos(`Virhe: Kalibrointitietoja ei löydy viljalle ${viljalaji}. Suorita kalibrointi ensin.`, 'alert-danger');
        return;
    }

    const { E, T_ref, RH_ref } = kalibrointi[viljalaji];

    // Korjaa haihdutusnopeus
    const korjauskerroin = (lampotila_2 / T_ref) * ((100 - ilmankosteus_2) / (100 - RH_ref)) * viljakertoimet[viljalaji];
    const E_korjattu = E * korjauskerroin;

    // Laske seuraavan erän haihdutettava vesimäärä
    const haihdutettava_vesi_2 = (paino_2 * (alkukosteus_2 - loppukosteus_2)) / (100 - loppukosteus_2);

    // Laske kuivausaika
    const kuivausaika_2 = haihdutettava_vesi_2 / E_korjattu;

    // Näytä ennustettu kuivausaika
    document.getElementById('ennustettu_kuivausaika').value = kuivausaika_2.toFixed(2);

    // Tallenna ennuste historiaan
    historia.push({
        tyyppi: 'Ennuste',
        viljalaji,
        alkukosteus: alkukosteus_2,
        loppukosteus: loppukosteus_2,
        paino: paino_2,
        kuivausaika: kuivausaika_2,
        lampotila: lampotila_2,
        ilmankosteus: ilmankosteus_2,
        haihdutusnopeus: E_korjattu
    });

    localStorage.setItem('historia', JSON.stringify(historia));
    paivitaHistoria();
    naytaTulos(`Ennuste suoritettu viljalle ${viljalaji}. Kuivausaika: ${kuivausaika_2.toFixed(2)} tuntia`, 'alert-success');
}

// Päivitä historiataulukko sivun latautuessa
paivitaHistoria();
