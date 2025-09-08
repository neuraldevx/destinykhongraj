# Showcase Images

Drop your gallery images for each Showcase modal into the folders below. The galleries are pre-wired to use filenames `image-1.png` through `image-7.png` (add fewer if you like, or extend the list in `src/data/services.ts`).

- `public/images/showcase/publications/` — for the "Publications" showcase
- `public/images/showcase/fashion-styling/` — for the "Fashion Styling" showcase

How to wire images to the modal
- Open `src/data/services.ts` and find the matching service by `title`.
- Update the `gallery` array if you add more than 7 images or prefer different file extensions.

Tips
- Prefer `.webp` for performance when available, otherwise `.png`/`.jpg` are fine.
- Aim for 1400–2000px width; <600 KB each if you can.
- Stick to names `image-1.png`, `image-2.png`, etc., unless you also update `services.ts`.
