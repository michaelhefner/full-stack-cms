import React from 'react'
import styles from './Hero.module.scss'
import Image from 'next/image'

type HeroProps = {
  heading: string
  subheading: string
  content: string
  imageSrc: string
  imageAlt: string
  altText: string
}

export function Hero ({ heading, subheading, content, imageSrc,imageAlt }: HeroProps) {

  return (
    <div className={styles.heroContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.h1}>{heading}</h1>
        <h2 className={styles.h2}>{subheading}</h2>
        <p className={styles.genericContent}>{content}</p>
      </div>
    <div className={styles.mediaContainer}>
      <div className={styles.iframePosition}>
        <Image
          className={styles.image}
          width={1000}
          loading='eager'
          height={1000}
          src={imageSrc}
          alt={imageAlt}
        />
      </div>
    </div>
    </div>
  )
}
