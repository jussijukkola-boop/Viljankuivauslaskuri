# Viljankuivauslaskuri

Selainpohjainen laskuri viljankuivauksen keston arvioimiseen. Tukee eri viljoja (ohra, vehnä, kaura) ja dynaamista kalibrointia ilman koodin muokkausta. Kalibrointitiedot tallennetaan selaimen localStorage-muistiin.

## Ominaisuudet
- Kalibroi kuivurin haihdutusnopeus ensimmäisen erän tiedoilla.
- Ennusta seuraavan erän kuivausaika eri viljoille.
- Responsiivinen käyttöliittymä (toimii mobiililaitteilla ja tietokoneilla).
- Näyttää kalibrointihistorian ja mahdollistaa kalibrointien poistamisen.

## Käyttö
1. Avaa laskuri: [https://kayttajatunnus.github.io/viljankuivauslaskuri/](https://kayttajatunnus.github.io/viljankuivauslaskuri/)
2. Syötä ensimmäisen erän tiedot (viljalaji, alkukosteus, loppukosteus, paino, kuivausaika, lämpötila, ilmankosteus) kalibroidaksesi kuivurin.
3. Syötä seuraavan erän tiedot ennustaaksesi kuivausajan.
4. Tarkastele kalibrointihistoriaa ja poista kalibrointeja tarpeen mukaan.

## Asennus
1. Kloonaa repositorio:
   ```bash
   git clone https://github.com/kayttajatunnus/viljankuivauslaskuri.git
