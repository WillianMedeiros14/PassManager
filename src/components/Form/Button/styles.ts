import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.background_Button};

  padding: 15px 0;

  align-items: center;
  justify-content: center;

  border-radius: 10px;
`;
export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color:  ${({ theme }) => theme.colors.title};
`;