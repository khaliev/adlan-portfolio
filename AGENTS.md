Portfolio Développeur Web — Adaptation du template Moonlight
Transformation du template Moonlight (portfolio photographe basé sur jQuery/Bootstrap avec navigation horizontale par slides) en un portfolio développeur web statique, minimaliste et performant mais sans JQuery et bootstrap, il faut juste garder la meme structure et les memes sections mais en utilisant du HTML/CSS/JS et tailwindcss.


Analyse du template d'origine
Le template Moonlight utilise :

"Navigation horizontale par slides (5 "pages" dans un conteneur 500vw, translation via jQuery)
Sidebar fixe à gauche (20% de largeur) avec navigation
Bootstrap + jQuery pour la grille et les interactions
FontAwesome pour les icônes 
Lightbox jQuery pour la galerie photo 
Galerie photo en grille 3 colonnes avec hover overlay noir translucide" à la place tu utiliseras html css js et tailwind css, pas de bootstrap, pas de jquery.


POUR QUE LE SITE SOIT UN PORTFOLIO DÉVELOPPEUR WEB IL FAUT AJOUTER DEUX SECTIONS

1. La section "About" : doit contenir les informations suivantes :

Nom complet
Titre : "Développeur Web Junior — À la recherche d'une alternance CDA  / Ingénierie du Web (Reims)"
Phrase d'accroche courte
2 boutons CTA : "Voir mes projets" (#projects) et "Me contacter" (#contact)
2. La section "Projets" : doit contenir les informations suivantes :

Grille CSS responsive (auto-fill, minmax(300px, 1fr))
Chaque carte projet doit contenir les informations suivantes :

Image en couverture
Overlay au hover avec titre + stack + description courte
Hover effect identique au template : overlay sombre qui apparaît en fondu avec contenu centré
3. La section "Skills" : doit contenir les informations suivantes :

4 colonnes (responsive) :

Frontend
Backend
Base de données
Outils
4. La section "Contact" : doit contenir les informations suivantes :

Liens : mailto, LinkedIn, GitHub
Localisation : "Reims, Grand-Est, France"

A la place de bootstrap et jquery tu va utiliser du HTML/CSS/JS et tailwindcss tout en gardant la meme structure "Navigation horizontale par slides (5 "pages" dans un conteneur 500vw) mais en utilisant du JS vanilla, Sidebar fixe à gauche (20% de largeur) avec navigation" et le site doit être responsive.


IMPORTANT

Choix architectural majeur : Le cahier des charges demande Astro dans les composants (Header, Footer, etc.) mais impose aussi "HTML sémantique + CSS moderne + JavaScript vanilla — PAS de framework lourd côté client : le site est statique" et "Aucune dépendance inutile".

Je propose de construire le site en HTML/CSS/JS pur (pas Astro) pour les raisons suivantes :

Le site est une single-page — HTML/CSS/JS
Zéro dépendance = zéro build chain, déployable directement sur GitHub Pages/Netlify/Vercel

Les "composants" sont structurés via des sections HTML sémantiques avec des IDs clairs
Les données projets restent dans un fichier JSON chargé dynamiquement


Concept visuel : l'esprit Moonlight adapté
L'esprit Moonlight que je conserve :

Sidebar fixe à gauche pour la navigation (devenant une barre top sur mobile)
Conteneur de contenu à droite sur fond semi-transparent avec défilement vertical (au lieu de l'horizontal)
Galerie visuelle comme cœur du site : les projets remplacent les photos avec le même hover overlay élégant
Typographie sobre, beaucoup d'espace, focus sur les visuels
Palette "Sable/Safari" au lieu du noir translucide du template original
Changements par rapport au template :

Navigation horizontale → défilement vertical classique (plus accessible, plus naturel)
Fond photo plein écran → fond sobre uni avec palette Sable/Safari
jQuery + Bootstrap → Vanilla JS + CSS custom properties
Lightbox jQuery → <dialog> natif (accessible, focus trap intégré, fermeture Escape native)
Architecture des fichiers

coffee-portfolio/
├── index.html                    # Page unique (SPA)
├── robots.txt                    # SEO
├── sitemap.xml                   # SEO
├── css/
│   ├── theme.css                 # Palette couleurs (custom properties light/dark)
│   ├── base.css                  # Reset, typographie, fondations
│   ├── layout.css                # Sidebar, grille, sections
│   └── components.css            # Cards, lightbox, skills, buttons, toggle
├── js/
│   ├── theme-toggle.js           # Toggle jour/nuit + persistance localStorage
│   └── lightbox.js               # Dialog natif pour screenshots projets
├── data/
│   └── projects.json             # Données projets (schéma imposé)
├── images/
│   └── projects/                 # Captures d'écran des projets (.webp)
│       ├── la-belle-assiette.webp
│       ├── asso-reims-basket.webp
│       └── refonte-fleuriste.webp
└── README.md                     # Documentation
Palette de couleurs "Sable / Safari"
css

/* Mode jour */
--color-bg:          #F5F0E8;   /* fond beige sablé */
--color-bg-surface:  #FAF7F2;   /* cartes — plus clair que fond */
--color-text:        #2B2620;   /* brun foncé */
--color-text-muted:  #6B6055;   /* texte secondaire */
--color-accent:      #C4713B;   /* terracotta / ocre */
--color-accent-hover:#A85D2F;   /* accent au survol */
--color-border:      #DDD5C8;   /* bordures subtiles */
/* Mode nuit */
--color-bg:          #1A1713;   /* brun très sombre */
--color-bg-surface:  #252119;   /* cartes — légèrement plus clair */
--color-text:        #E8E0D4;   /* sable clair */
--color-text-muted:  #9E9386;   /* texte secondaire */
--color-accent:      #D4844C;   /* ocre éclairci */
--color-accent-hover:#E0955D;   /* accent au survol */
--color-border:      #3A342B;   /* bordures subtiles */
NOTE

Tous les contrastes vérifiés : #2B2620 sur #F5F0E8 = ratio ~11:1, #E8E0D4 sur #1A1713 = ratio ~12:1, #C4713B sur #F5F0E8 = ratio ~4.6:1 (WCAG AA ✓). L'accent en mode nuit (#D4844C sur #1A1713) = ratio ~5.3:1 (AA ✓).

Sections / composants HTML
Section	Élément HTML	ID	Contenu
Nav sidebar	<nav>	main-nav	Logo/initiales, liens vers sections, toggle thème
Hero	<section>	hero	h1 + titre, accroche, 2 CTA
Projets	<section>	projects	Grille visuelle (cœur du site)
À propos	<section>	about	Parcours, méthode, stack
Compétences	<section>	skills	Listes groupées Front/Back/BDD/Outils
Contact	<section>	contact	Email, LinkedIn, GitHub, disponibilité
Footer	<footer>	site-footer	Copyright, mention template
Lightbox	<dialog>	project-lightbox	Image agrandie + détails projet
Plan de composants détaillé
Sidebar / Nav
Logo ou initiales en haut
Liste de liens avec icônes SVG inline (pas de FontAwesome)
Bouton toggle thème en bas de la sidebar
Sur mobile : barre horizontale en haut avec menu hamburger
Hero
<h1> avec nom du développeur
Sous-titre : "Développeur Web — À la recherche d'une alternance CDA / Ingénierie du Web (Reims)"
Phrase d'accroche courte
2 boutons CTA : "Voir mes projets" (#projects) et "Me contacter" (#contact)
Grille Projets (cœur — esprit galerie Moonlight)
Grille CSS responsive (auto-fill, minmax(300px, 1fr))
Chaque carte projet : image en couverture, overlay au hover avec titre + stack + description courte
Hover effect identique au template : overlay sombre qui apparaît en fondu avec contenu centré
Projets featured: true en premier (tri côté JS)
Clic → ouvre <dialog> lightbox OU lien direct si liveUrl existe
Lightbox (<dialog> natif)
Image en plein écran (ou quasi)
Titre, description longue, stack, type, client, année
Boutons conditionnels : "Voir le site" (si liveUrl), "Code source" (si repoUrl)
Badge "Démo visuelle" si status === "screenshot-only"
Fermeture : bouton X, touche Escape (natif <dialog>), clic sur ::backdrop
Focus piégé automatiquement par <dialog>.showModal()
Compétences
4 colonnes (responsive) : Frontend, Backend, Base de données, Outils
Listes simples avec icônes subtiles
Contact
Liens : mailto, LinkedIn, GitHub
Localisation : "Reims, Grand-Est, France"
Mention : "Disponible pour une alternance CDA / Ingénierie du Web — mobile 30 km autour de Reims"
Thème jour/nuit — Implémentation
<meta name="color-scheme" content="light dark"> dans le <head>
Script inline dans <head> (avant le CSS) pour appliquer le choix sauvegardé en localStorage → zéro flash
CSS utilise prefers-color-scheme comme défaut + classe .dark / .light sur <html> pour l'override
Toggle accessible : <button> avec aria-label, icône SVG soleil/lune
Persistance dans localStorage("color-scheme")
SEO / JSON-LD
<title> : "Développeur Web Junior à Reims — Alternance Concepteur Développeur d'Applications / Ingénierie du Web"
<meta description> orientée local + CDA + Ingénierie du Web
Open Graph + Twitter Card
JSON-LD : Person + WebSite
sitemap.xml et robots.txt statiques
Données projets d'exemple (3 projets)
La Belle Assiette — Site vitrine restaurant (déployé, featured: true, stack : HTML/CSS/JS)
Reims Basket Club — Application de gestion pour association (screenshot-only, featured: true, stack : React/Node.js/Express/SQL)
Refonte Fleuriste Martin — Refonte site fleuriste (déployé, featured: false, stack : Astro/CSS)
Ordre d'exécution
Étape	Description	Vérification
1	Architecture fichiers + index.html squelette sémantique + layout CSS	HTML valide, structure visible
2	theme.css + base.css + toggle jour/nuit	Toggle fonctionne, pas de flash, localStorage
3	layout.css + sidebar + sections	Navigation entre sections
4	components.css + hero + à propos + compétences + contact	Sections stylées
5	projects.json + grille projets + hover effect Moonlight	Projets chargés depuis JSON, tri featured
6	Lightbox <dialog> natif	Ouvre/ferme au clavier, focus piégé
7	SEO (meta, JSON-LD, sitemap, robots)	Balises présentes
8	Images projets générées + README.md	Images en .webp, README complet
9	Test Lighthouse + corrections	95+ mobile sur 4 catégories
Vérification
Tests automatisés
bash

# Validation HTML
npx -y html-validate index.html
# Lighthouse CI (si disponible)
npx -y lighthouse-ci http://localhost:3000 --output=json
Vérifications manuelles
Navigation clavier complète (Tab, Shift+Tab, Escape)
Toggle thème : test prefers-color-scheme, localStorage, pas de flash
Lightbox : focus piégé, fermeture Escape, fermeture backdrop
Responsive : mobile, tablette, desktop
Contrastes WCAG AA via DevTools
Open Questions
IMPORTANT

HTML/CSS/JS pur.

IMPORTANT

Polices web : Le template Moonlight utilise Open Sans. Je propose d'utiliser Inter (Bunny Fonts) comme police principale + la pile système en fallback. Convient-il ?

IMPORTANT

Nom du développeur : Quel nom/prénom afficher dans le Hero et les métas ? Je mets un placeholder "Adlan" pour l'instant.

NOTE

Images projets : Je vais générer 3 captures d'écran fictives en .webp avec l'outil de génération d'images pour les projets d'exemple.