import React from 'react'
import {
    InlineWysiwyg,
} from 'react-tinacms-editor'
import {
    SortableChapter,
} from '../lib/chapter'


export default function Content({ chapter }: { chapter: SortableChapter }) {
    return (
        <div className="content">
            <InlineWysiwyg name="markdownBody" format="markdown">
                <div className="content"
                    dangerouslySetInnerHTML={{ __html: chapter.htmlContent || '' }} />
            </InlineWysiwyg>
        </div>
    )
}