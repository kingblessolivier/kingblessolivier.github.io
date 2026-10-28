import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiXMark } from 'react-icons/hi2'
import SectionReveal from '../components/SectionReveal'
import SectionHeader from '../components/SectionHeader'
import { galleryImages } from '../assets/data'

export default function GallerySection({ navLabels, sectionText, language }) {
  const [activeImage, setActiveImage] = useState(null)

  const categoryLabels = sectionText.gallery.categories

  /* Escape closes the viewer */
  useEffect(() => {
    if (!activeImage) return
    const onKey = (event) => { if (event.key === 'Escape') setActiveImage(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeImage])

  return (
    <SectionReveal id="gallery" className="section-gap">
      <div className="container-shell">
        <SectionHeader
          tag={sectionText.gallery.sectionTag}
          title={navLabels.gallery}
          subtitle="Hackathons, build sessions, and moments along the journey."
          number="06"
        />

        {/* One row of photos; a swipeable strip on narrow screens */}
        <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 @xl:mx-0 @xl:grid @xl:grid-cols-3 @xl:overflow-visible @xl:px-0 @xl:pb-0">
          {galleryImages.map((item, index) => (
            <motion.figure
              key={`${item.title.EN}-${item.image}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl border border-[var(--border)] @xl:w-auto"
            >
              <button
                type="button"
                onClick={() => setActiveImage(item)}
                aria-label={`Open photo: ${item.title[language] ?? item.title.EN}`}
                className="block w-full cursor-zoom-in"
              >
                <img
                  src={item.image}
                  alt={item.title[language] ?? item.title.EN}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </button>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-12">
                <span className="block font-mono text-xs uppercase tracking-wider text-white/70">
                  {categoryLabels[item.category]}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-white">{item.title[language] ?? item.title.EN}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/80 p-4 backdrop-blur-sm"
              onClick={() => setActiveImage(null)}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="card-surface absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full text-xl"
                aria-label="Close image preview"
              >
                <HiXMark />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                className="mx-auto flex h-full max-w-5xl items-center justify-center"
              >
                <img
                  src={activeImage.image}
                  alt={activeImage.title[language] ?? activeImage.title.EN}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  sizes="100vw"
                  className="max-h-[86vh] w-full rounded-2xl object-contain"
                  onClick={(event) => event.stopPropagation()}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  )
}
