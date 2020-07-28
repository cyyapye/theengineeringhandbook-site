import {
    CMS,
    Field,
    AddContentPlugin,
} from 'tinacms'
import {
    
} from 'react-tinacms-github'
import {
    toMarkdownString,
} from 'next-tinacms-markdown'

type MaybePromise<T> = Promise<T> | T

interface AnyField extends Field {
    [key: string]: any
}

interface CreateMarkdownButtonOptions<FormShape, FrontmatterShape> {
    label: string
    fields: AnyField[]
    getFileRelativePath(form: FormShape): MaybePromise<string>
    getFrontmatter?(form: FormShape): MaybePromise<FrontmatterShape>
    getMarkdownBody?(form: FormShape): MaybePromise<string>
}

const ERR_MISSING_FILE_PATH = 'MarkdownCreatorPlugin must be given `fileRelativePath(form): string'
const ERR_MISSING_FIELDS = 'MarkdownCreatorPlugin must be given `fields: Field[]` with at least 1 item`'

export class MarkdownCreatorPlugin<FormShape = any, FrontmatterShape = any>
    implements AddContentPlugin<FormShape> {
    __type: 'content-creator' = 'content-creator'
    name: AddContentPlugin<FormShape>['name']
    fields: AddContentPlugin<FormShape>['fields']

    // Markdown
    getFileRelativePath: (form: FormShape) => MaybePromise<string>
    getFrontmatter: (form: FormShape) => MaybePromise<FrontmatterShape>
    getMarkdownBody: (form: FormShape) => MaybePromise<string>

    constructor(options: CreateMarkdownButtonOptions<FormShape, FrontmatterShape>) {
        if (!options.getFileRelativePath) {
            console.error(ERR_MISSING_FILE_PATH)
            throw new Error(ERR_MISSING_FILE_PATH)
        }

        if (!options.fields || options.fields.length === 0) {
            console.error(ERR_MISSING_FIELDS)
            throw new Error(ERR_MISSING_FIELDS)
        }

        this.name = options.label
        this.fields = options.fields
        this.getFileRelativePath = options.getFileRelativePath
        this.getFrontmatter = options.getFrontmatter || (() => ({} as FrontmatterShape))
        this.getMarkdownBody = options.getMarkdownBody || (() => '')
    }

    async onSubmit(form: FormShape, cms: CMS) {
        const fileRelativePath = await this.getFileRelativePath(form)
        const frontmatter = await this.getFrontmatter(form)
        const markdownBody = await this.getMarkdownBody(form)

        cms.api.github.upload(
            fileRelativePath,
            toMarkdownString({
                fileRelativePath,
                frontmatter,
                markdownBody,
            })
        )
    }
}