import { StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          inputSection: {
            flex: 1,
            flexDirection: 'row',
            borderColor: themeStyles.colors.borderSearch,
            borderWidth: 1,
            borderRadius: 12,
            alignItems: 'center',
            marginRight: 10,
            paddingHorizontal: 10,
            backgroundColor: themeStyles.colors.background, 
            height: 48,
            left: 10,
          },
          searchIcon: {
            marginRight: 10,
            color: themeStyles.colors.borderSearch,
            marginLeft: 5,
            fontSize: 20,
          },
          input: {
            flex: 1,
            color: themeStyles.colors.textPrimary,
            backgroundColor: 'transparent',
            fontSize: 14,
          },
          filterButton: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            left: 7,
          },
        });

    return styles;
};
