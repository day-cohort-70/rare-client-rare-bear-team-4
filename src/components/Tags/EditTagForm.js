import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTagByID, updateTag } from '../../managers/TagService.js';


export const EditTagForm = () => {
    const { id } = useParams(); // Get the tag ID from the URL
    const [tag, setTag] = useState({}); // State to hold the tag data
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the tag data when the component mounts
        fetchTagByID(id).then(fetchedTag => {
            setTag(fetchedTag);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault();
        const copy = tag
        copy.label = e.target[0].value
        // Update the tag with the new data
        await updateTag(id, copy).then(() => {
        navigate(`/tag-manager`);
        })
        };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" defaultValue={tag.label} required />
            <button type="submit">Update Tag</button>
        </form>
    );
};

export default EditTagForm;


// Saving below code as an Alternative 
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchTagByID, updateTag } from '../../managers/TagService.js';

// export const EditTagForm = () => {
//     const { id } = useParams(); // Get the tag ID from the URL
//     const [tag, setTag] = useState({}); // State to hold the tag data
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch the tag data when the component mounts
//         fetchTagByID(id).then(fetchedTag => {
//             if (fetchedTag) {
//                 setTag(fetchedTag);
//             } else {
//                 console.error('No tag found with ID:', id);
//             }
//         }).catch(error => {
//             console.error('Failed to fetch tag:', error);
//         });
//     }, [id]);
    

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTag(prevState => ({
//            ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Update the tag with the new data
//             await updateTag(id, tag);
//             navigate(`/tag-manager`); // Navigate back to the tag manager
//         } catch (error) {
//             console.error("Failed to update tag:", error);
//             // Optionally, show an error message to the user
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 name="label"
//                 value={tag.label || ''}
//                 onChange={handleChange}
//                 required
//             />
//             <button type="submit">Update Tag</button>
//         </form>
//     );
// };

// export default EditTagForm;