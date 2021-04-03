
import React, {useState} from 'react';
import firebase from '../../firebase';





export default function EditProfile(){
   
  
    const [fields, setFields] = useState({})

    const handleChange = (event) => {
        event.persist();
        setFields(values => ({
        ...values,
        [event.target.name]: event.target.value
        }));
    }   

    async function sennd(){
        const db = firebase.firestore();
        const Ref = await db.collection("Users")
                             .doc(firebase.auth().currentUser?.uid).get();

        const data = await Ref.data();
        const displayName = data.displayName;
        await db.collection("Profiles").doc(displayName).set({
            ...fields
        })
    }

    const handleSubmit = (event) => {
        sennd()
    }

    
    return(
        <div style={{textAlign: 'center'}}>
        <h1>Profile</h1>
        <form onSubmit={handleSubmit}>
        <input type="file" name="picture"></input>
        <input type="text" name="PreferredName" placeholder="PreferredName" onChange={handleChange}/><br /><br />
        <textarea type="text" name="ProfileText" placeholder="Bio" value={fields.ProfileText} onChange={handleChange}/><br /><br />
        <button type="submit">Save</button>
      </form>
     </div>
    )
}