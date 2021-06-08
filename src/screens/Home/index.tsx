import React, { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage
} from './styles';

import { useStorageData } from '../../hooks/useStorageData';

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);
  const [loading, setLoading] = useState(true);

  const {loadDataGetStorage, storageData} = useStorageData();

  async function loadData() {
    // Get asyncStorage data, use setSearchListData and setData
   
    try {
      
      await loadDataGetStorage();
      
      setSearchListData(storageData);
      setData(storageData);

      setLoading(false);
      

    } catch (error) {
        Alert.alert('Error no carregamento dos dados')
    } 
    
  }

  useEffect(() => {
    loadData();
  }, [loading]);

  useFocusEffect(useCallback(() => {
    setLoading(true);
    loadData();
  }, []));

  function handleFilterLoginData(search: string) {
    // Filter results inside data, save with setSearchListData
    
    if (search.length === 0){
      return setSearchListData(data)
    }

    const loginSearch = data
    .filter((busca: LoginDataProps) => 
      busca.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchListData(loginSearch)

  }

  return (
    <Container>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={(value) => handleFilterLoginData(value)}
      />

      <LoginList
        keyExtractor={(item) => item.id}
        data={searchListData}
        ListEmptyComponent={(
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        )}
        renderItem={({ item: loginData }) => {
          return <LoginDataItem
            title={loginData.title}
            email={loginData.email}
            password={loginData.password}
          />
        }}
      />
    </Container>
  )
}