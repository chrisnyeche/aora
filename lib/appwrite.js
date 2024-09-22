import { Account, ID, Client, Avatars, Databases, Query, Storage } from "react-native-appwrite";

// Replace these values with your own Appwrite configuration
export const config = {
  platform: "com.cdesignx.aora", // default is com.appwrite.app
  endpoint: "https://cloud.appwrite.io/v1", // Replace with your Appwrite API endpoint
  projectId: "66a517fe000a3af19576", // Replace with your Appwrite project ID
  userCollectionId: "66a52266002b34fb389b", // Replace with your Appwrite user collection ID
  videoCollectionId: "66a522b2001f550b6e71", // Replace with your Appwrite video collection ID
  databaseId: "66a52231000dd0d7d75c", // Replace with your Appwrite database ID
  storageId: "66a5277b0039aa5bba9a", // Replace with your Appwrite storage ID
};

// destructure all the api parameters
const {
  platform,
  endpoint,
  projectId,
  userCollectionId,
  videoCollectionId,
  databaseId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const storage = new Storage(client);
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Authenticate

// Register User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) {
      throw Error;
    }

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);
    const newUser = await databases.createDocument(databaseId, userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email: email,
      username: username,
      avatar: avatarUrl,
    });
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    // Create a new session without checking for existing sessions
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message || "Failed to sign in");
  }
}

// Sign Out
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(databaseId, userCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Posts API
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);

    return posts;
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    throw new Error(error.message);
  }
}

// Get user posts
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Search Posts
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query), // Search by title
    ]);

    return posts.documents; // Return the found documents
  } catch (error) {
    console.error("Error searching posts:", error);
    throw new Error(error.message);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(storageId, ID.unique(), asset);

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, "top", 100);
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideo(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(databaseId, videoCollectionId, ID.unique(), {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      creator: form.userId,
    });

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteVideo(documentId) {
  try {
    const posts = await databases.deleteDocument(databaseId, videoCollectionId, documentId);
    return posts;
  } catch (error) {
    console.error("Error searching posts:", error);
    throw new Error(error.message);
  }
}
