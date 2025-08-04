Color Palette:


#4C5FD5 (button color)

#dadbf1 (hero-background)

#000000 (black-background)

#FFFF (main-background)

Font-Family = Inter via Google Fonts

🧷 Exemple de structure HTML (logique)
<header>
  - Logo (svg)
  - Header navigation: Help Center / Submit / Sign in
</header>

<main>
  <section hero>
    <h1>How can we help?</h1>
    <input type="search" />
  </section>

  <section cards-grid>
    - Card « Branches » avec icône + titre + description
    - Card « Manage your account »
    - Card « Billing »
    - …
  </section>
</main>

<footer>
  - Liens de ressource
  - Pale background + texte clair
</footer>

📦 Quand utiliser Flexbox :
🔹 Header : pour aligner le logo à gauche et les boutons à droite

🔹 Hero (titre + input) : centrer verticalement et horizontalement

🔹 Footer : organiser les 4 colonnes horizontales (responsive en colonne sur mobile)

🎯 Mais attention :
🔹La section centrale avec les 6 cartes (icône + titre + desc) ➤ là CSS Grid serait 🔥 car tu veux un layout en 2 ou 3 colonnes bien réparties avec des gaps sympas.
