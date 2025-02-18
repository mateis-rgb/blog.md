# 📖 Mon Blog avec Next.js, Markdown & TypeScript

Un blog simple et rapide construit avec **Next.js 13+ (App Router)**, **TypeScript** et **Markdown**.

---

## 🚀 Fonctionnalités

✅ **Articles en Markdown** 📄
✅ **Rendu statique ultra-rapide** ⚡
✅ **Compatible avec React et TypeScript** 🛠️
✅ **Facile à héberger sur Vercel, Netlify, etc.** 🌍

---

## 📂 Structure du projet

```
/app
  /posts
    [slug]/page.tsx  <-- Page d'un article
  page.tsx  <-- Page d'accueil (liste des articles)
/content/posts  <-- Contient les fichiers Markdown
/lib/posts.ts  <-- Fonction pour lire les articles
```

---

## 🛠️ Installation

1. **Cloner le repo**
   ```sh
   git clone https://github.com/ton-github/mon-blog.git
   cd mon-blog
   ```
2.a **Installer `pnpm` si ce n'est pas déjà fait (Windows)**
```sh
npm install -g pnpm
```
2.a **Installer `pnpm` si ce n'est pas déjà fait (Linux / MacOS)**
```sh
sudo npm install -g pnpm
```
3. **Installer les dépendances**
   ```sh
   pnpm install
   ```
4. **Lancer le serveur en local**
   ```sh
   pnpm run dev
   ```
5. **Ouvrir le navigateur** et aller sur `http://localhost:3000`

---

## ✍️ Ajouter un article

1. Créer un fichier `.md` dans `content/posts/` :
   ```md
   ---
   title: "Titre de l'article"
   date: "2025-02-18"
   description: "Description rapide"
   ---
   
   Contenu de l'article en **Markdown** ! 🚀
   ```
2. Le fichier sera automatiquement détecté et affiché sur le site 🎉

---

## 🚀 Déploiement

Déploie facilement sur **Vercel** :
```sh
npx vercel
```
Ou sur **Netlify** en connectant le repo.

---

## 📜 Licence

MIT License - Copyright (c) 2025 Mateis

