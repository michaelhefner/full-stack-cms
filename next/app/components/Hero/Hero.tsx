import React from 'react'
import styles from './Hero.module.scss'

type HeroProps = {
  heading: string
  subheading: string
  content: string
  imageSrc: string
  imageAlt: string
  altText: string
}

export function Hero ({ heading, subheading, content, imageSrc,imageAlt, altText = 'Image' }: HeroProps) {

  return (
    <div className={styles.heroContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.h1}>{heading}</h1>
        <h2 className={styles.h2}>{subheading}</h2>
        <p className={styles.genericContent}>{content}</p>
      </div>
    <div className={styles.mediaContainer}>
      <div className={styles.iframePosition}>
        <img
          className={styles.image}
          width="100%"
          height="480"
          src={imageSrc}
          alt={imageAlt}
        />
      </div>
    </div>
    </div>
  )
}
