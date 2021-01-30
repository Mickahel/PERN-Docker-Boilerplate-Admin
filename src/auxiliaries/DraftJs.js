import { EditorState, ContentState, convertToRaw } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'

export function convertToDraft(html){
    if(html){
        const  { contentBlocks, entityMap }  = htmlToDraft(html)
        let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState)
    }else{
        return EditorState.createEmpty()
    }
}

export function convertFromDraft(content){
    return draftToHtml(convertToRaw(content.getCurrentContent()))
}