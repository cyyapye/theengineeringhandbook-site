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
        const chapter: unknown = {
            id,
            frontmatter: matterResult.data,
            markdownBody: matterResult.content,
        }

        return chapter as SortableChapter
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

export function getPrevNextChapters(id: string) {
    const chapters = getSortedChapters()
    const chapterIndex = chapters.findIndex(chapter => chapter.id === id)
    return {
        previous: chapterIndex > 0 ? chapters[chapterIndex - 1] : null,
        next: chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null
    }
}

export async function getChapter(id: string) {
    const fullPath = path.join(chaptersDir, `${id}.md`)
    const content = fs.readFileSync(fullPath, 'utf8')
    return await parseChapter(id, content)
}

export function getChapterParser(id: string) {
    return async (content: string) => {
        return await parseChapter(id, content)
    }
}

export async function parseChapter(id: string, content: string) {
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
        frontmatter: matterResult.data,
        markdownBody: matterResult.content,
    }
}

export interface SortableChapter {
    id: string
    frontmatter: {
        title: string
        date: string
    }
    htmlContent?: string
}