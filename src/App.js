import React from "react";
import "./App.css";
// firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// init firebase
firebase.initializeApp({
  apiKey: "AIzaSyAPwGQIzXAcl2zE1U9lyEwWryVrXMDt3l4",
  authDomain: "firechat-e7b2e.firebaseapp.com",
  databaseURL: "https://firechat-e7b2e.firebaseio.com",
  projectId: "firechat-e7b2e",
  storageBucket: "firechat-e7b2e.appspot.com",
  messagingSenderId: "602227103276",
  appId: "1:602227103276:web:2241c9a60d14d69c8b2389",
});

const auth = firebase.auth();
const firestore = firebase.firestore();


// APP

function App() {
  // user auth
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header><h2>-----HEADER-------</h2></header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

// sign in with Google auth:
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign In with Google</button>;
}
// sign out if current user exists:

// function SignOut() {
//   return auth.currentUser && (
//     <button onClick={() => auth.signOut()}>Sign Out</button>
//   );
// }

function ChatRoom() {
  // connect to a firebase db collection:
  const messagesRef = firestore.collection('messages');
  // query items in collection:
  const query = messagesRef.orderBy('createdAt').limit(25);
  console.log('query sent:', query);
  // check collection for new data:
  const [messages] = useCollectionData(query, { idField: 'id' });
  
  console.log('messages in db:', messages);

  // Verkar som att jag inte har kontakt med databasen?
  

  return (
    
    <>
    hey hey ChatRoom here
  
    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

    </>

)

}

function ChatMessage(props) {
  const { text, uid } = props.message;
  return (
    <>
    
      <div>
        ChatMessage here
        <p>{text}</p>
      </div>
    </>
  )
}



export default App;
