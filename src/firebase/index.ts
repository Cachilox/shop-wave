import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
  authDomain: "ecommerce-shop-wave.firebaseapp.com",
  projectId: "ecommerce-shop-wave",
  storageBucket: "ecommerce-shop-wave.appspot.com",
  messagingSenderId: "975470675981",
  appId: "1:975470675981:web:03e52ef361147bad8e6d44",
};

const firebaseStorageURL = "gs://ecommerce-shop-wave.appspot.com";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (getFile: File) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile?.name}-${timeStamp}-${randomStringValue}`;
};

export const helperForUploadingImageToFirebase = async (file: File) => {
  const getFileName = createUniqueFileName(file);
  const storageRefence = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageRefence, file);

  return new Promise<string>((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
};
