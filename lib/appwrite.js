// import { Account, Client } from "react-native-appwrite";

import { Account, ID, Client, Avatars, Databases } from "react-native-appwrite";

// Replace these values with your own Appwrite configuration
export const appwriteConfig = {
  platform: "com.cdesignx.aora", // default is com.appwrite.app
  endpoint: "https://cloud.appwrite.io/v1", // Replace with your Appwrite API endpoint
  projectId: "66a517fe000a3af19576", // Replace with your Appwrite project ID
  usercollectionId: "66a52266002b34fb389b", // Replace with your Appwrite user collection ID
  videocollectionId: "66a522b2001f550b6e71", // Replace with your Appwrite video collection ID
  databaseId: "66a52231000dd0d7d75c", // Replace with your Appwrite database ID
  storageId: "66a5277b0039aa5bba9a", // Replace with your Appwrite storage ID
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
  try{
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    ); 

    if(!newAccount){throw Error}

    const avatarUrl = avatars.getInitials(username);

    await signIn()
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }   
    ); 
    return newUser;
  }catch(error){
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn() {
try{
const session = await account.createEmailSession(email, password)
return session;
}catch(error){
  console.log(error);
  throw new Error(error);
}
}
