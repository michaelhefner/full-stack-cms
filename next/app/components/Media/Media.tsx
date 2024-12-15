import React from 'react'
import styles from './Media.module.css'

type MediaProps = {
  imageSrc: string
  imageAlt: string
  altText: string
}

export function Media ({ imageSrc,imageAlt, altText = 'Image' }: MediaProps) {

  return (
    <div className={styles.mediaContainer}>
      <div className={styles.iframePosition}>
        <img
          width="100%"
          height="480"
          src={imageSrc}
          alt={imageAlt}
        />
      </div>
    </div>
  )
}
