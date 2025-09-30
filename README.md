# Viljankuivauslaskuri

Selainpohjainen laskuri viljankuivauksen keston arvioimiseen. Tukee eri viljoja (ohra, vehnä, kaura) ja dynaamista kalibrointia ilman koodin muokkausta. Kalibrointitiedot ja historia tallennetaan selaimen localStorage-muistiin.

## Ominaisuudet
- Kalibroi kuivurin haihdutusnopeus ensimmäisen erän tiedoilla.
- Ennusta seuraavan erän kuivausaika eri viljoille.
- Näyttää ennustetun kuivausajan erillisessä kentässä.
- Tallenna kalibroinnit ja ennusteet historiaan.
- Responsiivinen käyttöliittymä (toimii mobiililaitteilla ja tietokoneilla).
- Mahdollistaa kalibrointien poistamisen.

## Käyttö
1. Avaa laskuri: [https://kayttajatunnus.github.io/viljankuivauslaskuri/](https://kayttajatunnus.github.io/viljankuivauslaskuri/)
2. Syötä ensimmäisen erän tiedot kalibroidaksesi kuivurin.
3. Syötä seuraavan erän tiedot ennustaaksesi kuivausajan.
4. Tarkastele kalibrointi- ja ennustehistoriaa taulukosta.

## Asennus
1. Kloonaa repositorio:
   ```bash
   git clone https://github.com/kayttajatunnus/viljankuivauslaskuri.git
