import React from 'react'
import styles from './Media.module.css'
import Image from 'next/image'

type MediaProps = {
  imageSrc: string
  imageAlt: string
  altText: string
}

export function Media ({ imageSrc,imageAlt }: MediaProps) {

  return (
    <div className={styles.mediaContainer}>
      <div className={styles.iframePosition}>
        <Image
          width={100}
          height="480"
          src={imageSrc}
          alt={imageAlt}
        />
      </div>
    </div>
  )
}
