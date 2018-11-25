/// <reference types="react-scripts" />
/// <reference path="./model/user" />

interface AppState {
  auth: AuthState;
  imageState: ImagesState;
}

interface AuthState {
  currentUser: User | null;
}

interface ImagesState {
  images: Image[];
}

interface Image {
  id: string;
  downloadURL: string;
  created_at: number;
}
