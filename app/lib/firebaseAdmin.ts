import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";

import { Firestore, getFirestore } from "firebase-admin/firestore";
import { getStorage, Storage as AdminStorage } from "firebase-admin/storage";
import { getAuth } from "firebase-admin/auth";

const app =
    getApps().length === 0
        ? initializeApp({
              credential: cert({
                  projectId: process.env.FIREBASE_PROJECT_ID,
                  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g,"\n"),
              }),
              projectId: process.env.FIREBASE_PROJECT_ID,
              storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          })
        : getApps()[0];
        
export const adminAuth = getAuth(app);
export const adminDb: Firestore = getFirestore();
export const adminStorage: AdminStorage = getStorage();
