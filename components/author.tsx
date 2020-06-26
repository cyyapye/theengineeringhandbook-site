import classnames from 'classnames'
import styles from './author.module.scss'

function withAvatar(children: JSX.Element) {
  return (
    <div className={classnames('media', styles.authorContainer)}>
      <div className="media-left">
        <figure className="image is-64x64">
          <img 
            className="is-rounded" 
            src="/images/headshot-square-64.jpg" 
            srcSet={[
              '/images/headshot-256x256.jpg 4x',
              '/images/headshot-192x192.jpg 3x',
              '/images/headshot-128x128.jpg 2x',
              '/images/headshot-64x64.jpg 1x',
            ].join(', ')}
            alt="Ye Cheng" />
        </figure>
      </div>
      <div className="media-content">
        {children}
      </div>
    </div>
  )
}

export default function Author({ avatar = false, bio = false }: AuthorProps) {
  const author = (
    <>
      <a
        href="https://twitter.com/cyyapye"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ye Cheng
      </a>
      {bio && (
        <p className="is-size-7 is-family-secondary">
          VP of Engineering at Paciolan, ex-BlackBerry Cylance.
        </p>
      )}
    </>
  )

  return avatar ? withAvatar(author) : author
}

interface AuthorProps {
  avatar?: boolean
  bio?: boolean
}