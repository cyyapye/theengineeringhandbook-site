import React from 'react'
import {
    InlineWysiwyg,
} from 'react-tinacms-editor'
import {
    SortableChapter,
} from '../lib/chapter'
import classnames from 'classnames'
import styles from './content.module.scss'


export default function Content({ chapter }: { chapter: SortableChapter }) {
    return (
        <div className={classnames('content', styles.content)}>
            <InlineWysiwyg name="markdownBody" format="markdown">
                <div className="content"
                    dangerouslySetInnerHTML={{ __html: chapter.htmlContent || '' }} />
            </InlineWysiwyg>
        </div>
    )
}