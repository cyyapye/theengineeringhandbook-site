import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import externalLinks from 'remark-external-links'
import highlight from 'remark-highlight.js'
import footnotes from 'remark-footnotes'
import emoji from 'remark-emoji'
import subSuper from 'remark-sub-super'

const chaptersDir = path.join(process.cwd(), 'chapters')

export function getSortedChapters() {
    const filenames = fs.readdirSync(chaptersDir)
    const chapters = filenames.map(filename => {
        const id = filename.replace(/\.md$/, '')
        const fullPath = path.join(chaptersDir, filename)
        const content = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(content)

        return {
            id,
            ...matterResult.data
        } as SortableChapter
    })

    return chapters.sort((a: SortableChapter, b: SortableChapter) => {
        if (a.id > b.id) {
            return 1
        }
        return -1
    })
}

export function getChapterIds() {
    const chapters = getSortedChapters()

    return chapters.map(chapter => {
        return {
            params: {
                id: chapter.id,
            },
        }
    })
}

export async function getChapter(id: string) {
    const fullPath = path.join(chaptersDir, `${id}.md`)
    const content = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(content)

    const processedContent = await remark()
        .use(externalLinks)
        .use(highlight)
        .use(emoji)
        .use(footnotes, { inlineNotes: true })
        .use(subSuper)
        .use(html)
        .process(matterResult.content)

    const htmlContent = processedContent.toString()

    return {
        id,
        htmlContent,
        ...matterResult.data
    }
}

export interface SortableChapter {
    id: string
    title: string
    date: string
    htmlContent: string
}