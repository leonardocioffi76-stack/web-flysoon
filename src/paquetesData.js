import { db } from './firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export const obtenerPaquetes = async () => {
  try {
    const q = query(collection(db, "paquetes_web"));
    const querySnapshot = await getDocs(q);
    
    const listaPaquetes = [];
    querySnapshot.forEach((doc) => {
      listaPaquetes.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return listaPaquetes;
  } catch (error) {
    console.error("Error al obtener los paquetes desde Firebase:", error);
    return [];
  }
};