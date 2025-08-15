# destiny khongraj's portfolio

a personal portfolio website built with next.js 15, featuring interactive animations and a modern design. this project showcases destiny's work and services as a creative professional.

## quick start

### prerequisites
- node.js 18.17 or later
- npm, yarn, pnpm, or bun

### installation

1. clone the repository:
```bash
git clone <repository-url>
cd destiny-portfolio
```

2. install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. open [http://localhost:3000](http://localhost:3000) in your browser

## project structure

```
src/
├── app/
│   ├── layout.tsx    # root layout with metadata
│   ├── page.tsx      # homepage
│   └── globals.css   # global styles
├── components/
│   ├── layout/       # layout components
│   └── sections/     # page sections (hero, about, services, footer)
├── data/            # static data files
└── fonts/           # font configurations
```

## technology stack

- **framework**: next.js 15.4.2 with app router
- **language**: typescript 5
- **styling**: tailwind css 4
- **animations**: gsap with scrolltrigger
- **fonts**: geist font family
- **runtime**: react 19.1.0

## development commands

```bash
npm run dev      # start development server
npm run build    # build for production
npm run start    # start production server
npm run lint     # run eslint
```

## customization

### updating content
- personal information: edit `src/app/page.tsx`
- services: modify `src/data/services.ts`
- styling: update component files in `src/components/`

### adding images and media
- **photos/images**: upload to `public/images/` folder
- **videos**: upload to `public/videos/` folder
- **placeholder photos**: currently using placeholder urls in `src/data/services.ts` - replace these with your actual images
- **supported formats**: jpg, png, gif, webp, svg
- **recommended sizes**: 
  - hero images: 1920x1080px or larger
  - service images: 1200x800px minimum
  - profile photos: 400x400px or larger

### updating placeholder images
1. add your images to `public/images/`
2. update image paths in `src/data/services.ts`
3. example: change `"https://picsum.photos/1200/800"` to `"/images/your-photo.jpg"`

### adding new sections
1. create component in `src/components/sections/`
2. import and add to `src/app/page.tsx`
3. follow existing patterns for animations

## deployment

### option 1: vercel (recommended)
1. push your code to github
2. visit [vercel.com](https://vercel.com)
3. connect your github repository
4. vercel will automatically deploy on every push to main branch

### option 2: netlify
1. build the project: `npm run build`
2. upload the `out` folder to netlify
3. or connect your github repository for automatic deployments

### option 3: github pages
1. add to `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
module.exports = nextConfig
```
2. run `npm run build`
3. deploy the `out` folder to github pages

## getting a custom domain

### option 1: namecheap
1. visit [namecheap.com](https://namecheap.com)
2. search for your desired domain
3. purchase and configure dns settings
4. point to your hosting provider

### option 2: godaddy
1. visit [godaddy.com](https://godaddy.com)
2. search and purchase domain
3. configure dns in domain settings

### option 3: cloudflare (cheap option)
1. buy domain through cloudflare
2. automatic dns management
3. built-in cdn and security

### connecting domain to vercel
1. in vercel dashboard, go to your project
2. click "domains" tab
3. add your custom domain
4. follow verification instructions
5. update dns records at your domain provider

## environment setup for contributors

1. install recommended vscode extensions:
   - es7+ react/redux/react-native snippets
   - tailwind css intellisense
   - typescript importer

2. configure editor settings (add to `.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## common issues

### port already in use
```bash
# kill process on port 3000
npx kill-port 3000
# or use different port
npm run dev -- -p 3001
```

### build errors
```bash
# clear next.js cache
rm -rf .next
npm run build
```

### dependency issues
```bash
# clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## features to implement

- [ ] contact form with email integration
- [ ] project gallery with case studies
- [ ] blog section
- [ ] dark mode toggle
- [ ] performance optimizations
- [ ] seo improvements

## license

this project is for destiny khongraj's personal portfolio. please respect the original design and branding.

## support

for questions or issues:
1. check the troubleshooting section above
2. review next.js documentation
3. check gsap documentation for animation issues
4. create an issue in the repository

---

made with ❤️ for destiny khongraj