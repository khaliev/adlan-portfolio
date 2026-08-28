# Portfolio Développeur Web — adaptation du template Moonlight

Portfolio single-page de **Adlan**, développeur web junior à Reims (alternance CDA), adapté du template [Moonlight](https://templatemo.com/tm-512-moonlight).

## Stack

- **HTML sémantique** + **Tailwind CSS** (via CDN)
- **JavaScript vanilla** (navigation horizontale par slides, thème, projets, lightbox)
- **Aucune dépendance de build** — déployable directement sur GitHub Pages / Netlify / Vercel

## Structure

```
coffee-portfolio/
├── index.html              # Page unique
├── robots.txt
├── sitemap.xml
├── css/
│   └── custom.css          # Palette, slides, sidebar, lightbox
├── js/
│   ├── main.js             # Navigation horizontale (translateX)
│   ├── theme-toggle.js     # Jour/nuit + localStorage
│   ├── projects.js         # Chargement des projets (JSON)
│   └── lightbox.js         # Lightbox <dialog> natif
├── data/
│   └── projects.json       # Données des projets
└── images/
    ├── projects/           # Visuels des projets (.svg)
    └── Adlan.webp          # Portrait (rond) dans la sidebar
```

## Fonctionnalités

- Navigation horizontale façon Moonlight (5 slides, `translateX` vanilla JS, swipe tactile, flèches clavier)
- Sidebar fixe à gauche (20 %), barre supérieure + menu hamburger sur mobile
- Thème jour/nuit (palette Sable/Safari) avec persistance `localStorage` et zéro flash
- Grille projets responsive (`auto-fill, minmax(300px, 1fr)`) avec overlay sombre au survol
- Lightbox `<dialog>` natif (fermeture Escape, clic backdrop, focus piégé)

## Lancer en local

Aucune étape de build nécessaire. Servez simplement le dossier :

```bash
npx serve .
# ou
python3 -m http.server 3000
```

Puis ouvrez `http://localhost:3000`.

## Personnalisation

- **Nom / métas** : modifiez `index.html` (title, meta, JSON-LD).
- **Portrait (sidebar)** : remplacez `images/Adlan.webp` par votre photo (rond automatique). Le hero affiche un monogramme "A".
- **Projets** : éditez `data/projects.json`.
- **Visuels** : remplacez les `.svg` de `images/projects/` par vos captures.
- **Liens** : mettez à jour `mailto`, LinkedIn et GitHub dans la section Contact.
