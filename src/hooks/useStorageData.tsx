import React, {createContext, useCallback, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

interface StorageProviderProps {
    children: ReactNode;
}

interface LoginDataProps {
    id: string;
    title: string;
    email: string;
    password: string;
};

interface StorageContextData {
    storageData: LoginListDataProps;
    loadDataGetStorage(): Promise<void>;
    loadDataSetStorage(): (dataLogin: LoginListDataProps) => Promise<void>;
    //handleFilterLoginData(): (search: string) => void;
}

type LoginListDataProps = LoginDataProps[];
  

const StorageContext = createContext({} as StorageContextData);

function StorageProvider({ children }: StorageProviderProps ){
    //const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
    const [storageData, setStorageData] = useState<LoginListDataProps>([]);

    const key = `@passmanager:logins`

    async function loadDataGetStorage() {        
        try {
            const data = await AsyncStorage.getItem(key);
            const storageData = data ? JSON.parse(data) : [];
            
            setStorageData(storageData);

        } catch (error) {
            throw new Error(error);
        }

    }

    async function loadDataSetStorage(dataLogin: LoginListDataProps) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(dataLogin));

        } catch (error) {
            throw new Error(error);
        }

    }

   

    return(
        <StorageContext.Provider value={{ storageData, loadDataGetStorage, loadDataSetStorage }}>
            { children }
        </StorageContext.Provider>
    );

}

function useStorageData(){
    const context = useContext(StorageContext);

    return context;
}

export { StorageProvider, useStorageData }