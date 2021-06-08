import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { TextInput } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 12px 16px;
  margin-top: ${RFValue(54)}px;
  border-radius: 10px;

  align-items: center;
  justify-content: space-between;
`;

export const Input = styled(TextInput) `
  font-size: ${(RFValue(12))}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
`;

