import React, {  useRef } from 'react';
import useLocalStorage from './localstorage';
import Editable from './Editable';



export const InlineInfo = () => {
    const inputRef = useRef();
    const [title, setTitle] = useLocalStorage("title", ""); 
    return(
        <div id="info" >
            <Editable
            text={title}
            placeholder="Write a project title"
            childRef={inputRef}
            type="input"
            >
            <input
              ref={inputRef}
              type="text"
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Write a project title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            </Editable>
            </div>
    )
}
export const InlineStats = () => {
    const textareaRef = useRef();
    const [description, setDescription] = useLocalStorage("description", "");
    return(
            <div id="stats">
                <Editable
                text={description}
                placeholder="Description"
                childRef={textareaRef}
                type="textarea">
                    <textarea
              ref={textareaRef}
              name="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Description for the project"
              rows="5"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
                </Editable>
            </div>
    )
}
export const InlineProfile = () => {
    const inputRef = useRef();
    const [artistname, setArtistName] = useLocalStorage("artist", '');
    return(
        <div id="artistname">
            <Editable
            text={artistname}
            placeholder="Artist name"
            childRef={inputRef}
            type="input"
            >
                <input
                ref={inputRef}
                type="text"
                name="artistname"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                placeholder="Write artist name. For collaborations, separate names with commas"
                value={artistname}
                onChange={e => setArtistName(e.target.value)}
                />
            </Editable>
        </div>
    )
}
 