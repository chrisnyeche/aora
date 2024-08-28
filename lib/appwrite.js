// import { Account, Client } from "react-native-appwrite";

import { Account, ID } from "react-native-appwrite";

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

// Register User
export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
