import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

export function getChapter(id: string) {
    const fullPath = path.join(chaptersDir, `${id}.md`)
    const content = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(content)

    return {
        id,
        ...matterResult.data
    }
}

export interface SortableChapter {
    id: string
    title: string
    date: string
}